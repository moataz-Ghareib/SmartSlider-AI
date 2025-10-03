import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthUser } from '../lib/auth';
import { authService, getUserRoleFromFirestore } from '../lib/auth';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface AuthState {
  // State
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  unsubscribeRole?: () => void;
  
  // Actions
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, userData: any) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signInWithApple: () => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        loading: false,
        error: null,
        unsubscribeRole: undefined,

        // Sign in
        signIn: async (email: string, password: string) => {
          set({ loading: true, error: null });
          try {
            const result = await authService.signIn(email, password);
            if (result.success) {
              // تأكد من قراءة الدور الأحدث من Firestore بعد تسجيل الدخول
              try {
                const freshRole = await getUserRoleFromFirestore(result.user!.id);
                const user = { ...result.user!, role: freshRole } as any;
                localStorage.setItem('currentUser', JSON.stringify(user));
                set({ user, loading: false });
                // ابدأ مستمع الدور الفوري
                try {
                  get().unsubscribeRole?.();
                  const unsub = onSnapshot(doc(db, 'users', user.id), (snap) => {
                    if (!snap.exists()) return;
                    const nextRole = (snap.data() as any).role || 'user';
                    const current = get().user;
                    if (!current) return;
                    if (current.role !== nextRole) {
                      const updated = { ...current, role: nextRole } as any;
                      localStorage.setItem('currentUser', JSON.stringify(updated));
                      set({ user: updated });
                    }
                  });
                  set({ unsubscribeRole: unsub });
                } catch {}
              } catch {
                set({ user: result.user!, loading: false });
              }
              // تمت إزالة رسالة النجاح بناءً على طلبك
              return true;
            } else {
              set({ error: result.error, loading: false });
              toast.error(result.error || 'خطأ في تسجيل الدخول');
              return false;
            }
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error(error.message || 'خطأ في تسجيل الدخول');
            return false;
          }
        },

        // Sign up
        signUp: async (email: string, password: string, userData: any) => {
          set({ loading: true, error: null });
          try {
            const result = await authService.signUp(email, password, userData);
            if (result.success) {
              // قراءة الدور بعد التسجيل أيضاً (في حال تم منحه Admin يدوياً)
              try {
                const freshRole = await getUserRoleFromFirestore(result.user!.id);
                const user = { ...result.user!, role: freshRole } as any;
                localStorage.setItem('currentUser', JSON.stringify(user));
                set({ user, loading: false });
                // ابدأ مستمع الدور الفوري
                try {
                  get().unsubscribeRole?.();
                  const unsub = onSnapshot(doc(db, 'users', user.id), (snap) => {
                    if (!snap.exists()) return;
                    const nextRole = (snap.data() as any).role || 'user';
                    const current = get().user;
                    if (!current) return;
                    if (current.role !== nextRole) {
                      const updated = { ...current, role: nextRole } as any;
                      localStorage.setItem('currentUser', JSON.stringify(updated));
                      set({ user: updated });
                    }
                  });
                  set({ unsubscribeRole: unsub });
                } catch {}
              } catch {
                set({ user: result.user!, loading: false });
              }
              return true;
            } else {
              set({ error: result.error, loading: false });
              toast.error(result.error || 'خطأ في إنشاء الحساب');
              return false;
            }
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error(error.message || 'خطأ في إنشاء الحساب');
            return false;
          }
        },

        // Google sign in
        signInWithGoogle: async () => {
          set({ loading: true, error: null });
          try {
            const result = await authService.signInWithGoogle();
            if (result.success) {
              // احضر المستخدم المحدث من التخزين المحلي/الخدمة لكي يتضمن الدور
              const fresh = await authService.getCurrentUser();
              set({ user: fresh || null, loading: false });
              toast.success('جاري تسجيل الدخول عبر Google...');
              return true;
            } else {
              set({ error: result.error, loading: false });
              toast.error(result.error || 'خطأ في تسجيل الدخول عبر Google');
              return false;
            }
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error(error.message || 'خطأ في تسجيل الدخول عبر Google');
            return false;
          }
        },

        // Apple sign in
        signInWithApple: async () => {
          toast.error('تسجيل الدخول عبر Apple غير متاح حالياً');
          return false;
        },

        // Sign out
        signOut: async () => {
          try {
            await authService.signOut();
            try { get().unsubscribeRole?.(); } catch {}
            set({ user: null, error: null, unsubscribeRole: undefined });
          } catch (error: any) {
            set({ error: error.message });
            toast.error('خطأ في تسجيل الخروج');
          }
        },

        // Update profile
        updateProfile: async (data: Partial<AuthUser>) => {
          set({ loading: true, error: null });
          try {
            const result = await authService.updateProfile(data);
            if (result.success && result.user) {
              set({ user: result.user, loading: false });
              toast.success('تم تحديث الملف الشخصي');
              return true;
            } else {
              set({ error: result.error, loading: false });
              toast.error(result.error || 'خطأ في تحديث الملف الشخصي');
              return false;
            }
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error('خطأ في تحديث الملف الشخصي');
            return false;
          }
        },

        // Change password
        changePassword: async (currentPassword: string, newPassword: string) => {
          set({ loading: true, error: null });
          try {
            const result = await authService.changePassword(currentPassword, newPassword);
            if (result.success) {
              set({ loading: false });
              toast.success('تم تغيير كلمة المرور بنجاح');
              return true;
            } else {
              set({ error: result.error, loading: false });
              toast.error(result.error || 'خطأ في تغيير كلمة المرور');
              return false;
            }
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error('خطأ في تغيير كلمة المرور');
            return false;
          }
        },

        // Delete account
        deleteAccount: async () => {
          set({ loading: true, error: null });
          try {
            const result = await authService.deleteAccount();
            if (result.success) {
              set({ user: null, loading: false });
              toast.success('تم حذف الحساب بنجاح');
              return true;
            } else {
              set({ error: result.error, loading: false });
              toast.error(result.error || 'خطأ في حذف الحساب');
              return false;
            }
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error('خطأ في حذف الحساب');
            return false;
          }
        },

        // Refresh session
        refreshSession: async () => {
          try {
            const result = await authService.refreshSession();
            if (result.success && result.session) {
              set({ user: result.session.user });
            }
          } catch (error) {
            console.error('Session refresh error:', error);
            await get().signOut();
          }
        },

        // Clear error
        clearError: () => set({ error: null }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user }),
        onRehydrateStorage: () => (state) => {
          // عند تهيئة المتجر، إن لم يكن هناك مستخدم مُخزن عبر zustand
          // لكن لدينا currentUser في localStorage، قم باستخدامه لضمان وجود role
          if (!state?.user) {
            try {
              const raw = localStorage.getItem('currentUser');
              if (raw) {
                const parsed = JSON.parse(raw);
                // عين المستخدم فوراً لتجنب وميض عدم الصلاحية
                (state as any)?.user === undefined; // no-op to satisfy ts when reading state
                // استخدم set خارج هذه العودة
                // عيِّن الحالة مباشرة عبر setState الخاص بالمتجر
                (useAuthStore.setState as any)?.({ user: parsed });
              }
            } catch {}
          }
        },
      }
    ),
    {
      name: 'auth-store',
    }
  )
);
