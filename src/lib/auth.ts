// Authentication service using Firebase
import { auth, storage, db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile as fbUpdateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  city?: string;
  avatarUrl?: string;
  subscription_type: 'free' | 'growth' | 'enterprise';
  role?: 'admin' | 'user';
}

export interface User extends AuthUser {}

export async function getUserRoleFromFirestore(userId: string): Promise<'admin' | 'user'> {
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    if (snap.exists()) {
      const data = snap.data() as any;
      const role = (data.role as 'admin' | 'user') || 'user';
      // keep a lightweight cache to avoid stale UI
      try {
        const cachedRaw = localStorage.getItem('currentUser');
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (cached && cached.id === userId && cached.role !== role) {
            localStorage.setItem('currentUser', JSON.stringify({ ...cached, role }));
          }
        }
      } catch {}
      return role;
    }
  } catch {}
  return 'user';
}

function mapFirebaseErrorMessage(error: any): string {
  const code: string | undefined = error?.code || error?.message;
  if (!code) return 'حدث خطأ غير متوقع';
  if (typeof code === 'string') {
    if (code.includes('auth/network-request-failed')) {
      return 'تعذّر الاتصال بالخادم. تحقّق من الاتصال وسياسة الأمان (CSP) ثم أعد المحاولة.';
    }
    if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password')) {
      return 'بيانات الدخول غير صحيحة.';
    }
    if (code.includes('auth/user-not-found')) {
      return 'الحساب غير موجود.';
    }
    if (code.includes('auth/email-already-in-use')) {
      return 'هذا البريد مستخدم بالفعل.';
    }
    if (code.includes('auth/too-many-requests')) {
      return 'محاولات كثيرة. يُرجى المحاولة لاحقاً.';
    }
    if (code.includes('auth/popup-blocked') || code.includes('auth/popup-closed-by-user')) {
      return 'نافذة تسجيل الدخول عبر Google تم حظرها أو إغلاقها.';
    }
  }
  return 'حدث خطأ غير متوقع';
}

export const signUp = async (
  email: string,
  _password: string,
  name: string,
  phone: string,
  city: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, _password);
    await fbUpdateProfile(cred.user, { displayName: name });
    const user: AuthUser = {
      id: cred.user.uid,
      email: cred.user.email || email,
      name: cred.user.displayName || name,
      phone,
      city,
      subscription_type: 'free',
      role: 'user'
    };
    // Persist profile in Firestore without overwriting existing role for pre-provisioned admins
    const userRef = doc(db, 'users', user.id);
    const existing = await getDoc(userRef);
    if (!existing.exists()) {
      await setDoc(userRef, {
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        city: user.city || '',
        subscription_type: user.subscription_type,
        role: user.role,
        createdAt: new Date().toISOString(),
      }, { merge: true });
    } else {
      // Do not touch role if doc exists
      await setDoc(userRef, {
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        city: user.city || '',
        subscription_type: user.subscription_type,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    return { success: true, user };
  } catch (error: any) {
    console.error('خطأ في التسجيل:', error);
    return {
      success: false,
      error: mapFirebaseErrorMessage(error)
    };
  }
};

export async function uploadUserAvatar(userId: string, file: File): Promise<string> {
  const fileRef = ref(storage, `avatars/${userId}`);
  const snap = await uploadBytes(fileRef, file, { contentType: file.type });
  const url = await getDownloadURL(snap.ref);
  // persist url in Firestore user doc
  try {
    await setDoc(doc(db, 'users', userId), { avatarUrl: url, updatedAt: new Date().toISOString() }, { merge: true });
  } catch {}
  return url;
}

export const signIn = async (email: string, _password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, _password);
    const role = await getUserRoleFromFirestore(cred.user.uid);

    const user: AuthUser = {
      id: cred.user.uid,
      email: cred.user.email || email,
      name: cred.user.displayName || 'مستخدم',
      phone: '',
      city: 'الرياض',
      subscription_type: 'free',
      role
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    return { success: true, user };
  } catch (error: any) {
    console.error('خطأ في تسجيل الدخول:', error);
    return {
      success: false,
      error: mapFirebaseErrorMessage(error)
    };
  }
};

export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await fbSignOut(auth);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    return { success: true };
  } catch (error: any) {
    console.error('خطأ في تسجيل الخروج:', error);
    return {
      success: false,
      error: mapFirebaseErrorMessage(error)
    };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    return new Promise<User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        unsubscribe();
        if (!fbUser) return resolve(null);
        (async () => {
          const role = await getUserRoleFromFirestore(fbUser.uid);
          const user: User = {
            id: fbUser.uid,
            email: fbUser.email || '',
            name: fbUser.displayName || 'مستخدم',
            subscription_type: 'free',
            role
          } as any;
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        })();
      });
    });
  } catch (error) {
    console.error('خطأ في جلب المستخدم الحالي:', error);
    return null;
  }
};

export const updateUserProfile = async (
  _userId: string,
  updates: Partial<Pick<User, 'name' | 'phone' | 'city'>>
): Promise<{ success: boolean; error?: string }> => {
  try {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    return { success: true };
  } catch (error: any) {
    console.error('خطأ في تحديث الملف الشخصي:', error);
    return {
      success: false,
      error: mapFirebaseErrorMessage(error)
    };
  }
};

export const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    console.error('خطأ في إعادة تعيين كلمة المرور:', error);
    return {
      success: false,
      error: mapFirebaseErrorMessage(error)
    };
  }
};

export class AuthService {
  async signUp(email: string, password: string, userData: any): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    return signUp(email, password, userData.name, userData.phone, userData.city);
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    return signIn(email, password);
  }

  async signInWithGoogle(): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      // تحقق سريع من أن سياسة الأمان تسمح بتحميل سكربت Google APIs
      if (typeof document !== 'undefined') {
        const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement | null;
        const allowsGapi = csp?.content?.includes('https://apis.google.com');
        if (csp && !allowsGapi) {
          return { success: false, error: 'تسجيل الدخول عبر Google محظور بواسطة سياسة الأمان (CSP). حدّث الإعدادات ثم أعد المحاولة.' };
        }
      }
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      // Upsert profile and read role
      const existingRole = await getUserRoleFromFirestore(cred.user.uid);
      await setDoc(doc(db, 'users', cred.user.uid), {
        email: cred.user.email || 'user@gmail.com',
        name: cred.user.displayName || 'مستخدم Google',
        subscription_type: 'free',
        role: existingRole || 'user',
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      const role = await getUserRoleFromFirestore(cred.user.uid);
      const user: AuthUser = {
        id: cred.user.uid,
        email: cred.user.email || 'user@gmail.com',
        name: cred.user.displayName || 'مستخدم Google',
        phone: '',
        city: 'الرياض',
        subscription_type: 'free',
        role
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: mapFirebaseErrorMessage(error) };
    }
  }

  async signInWithApple(): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      // مبدئياً نُبقي Apple محاكاة حتى إضافة مزود Apple رسمي
      const user = {
        id: `user_${Date.now()}`,
        email: 'user@icloud.com',
        name: 'مستخدم Apple',
        phone: '',
        city: 'الرياض',
        subscription_type: 'free' as const
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async signOut(): Promise<void> {
    await signOut();
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    return getCurrentUser();
  }

  async updateProfile(data: Partial<AuthUser>): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = { ...user, ...data };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      }
      return { success: false, error: 'المستخدم غير موجود' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async changePassword(_currentPassword: string, _newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      // محاكاة تغيير كلمة المرور
      console.log('تم تغيير كلمة المرور');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deleteAccount(): Promise<{ success: boolean; error?: string }> {
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async refreshSession(): Promise<{ success: boolean; session?: { user: AuthUser }; error?: string }> {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        return { success: true, session: { user } };
      }
      return { success: false, error: 'لا توجد جلسة نشطة' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

export const authService = new AuthService();