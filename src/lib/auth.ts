// Authentication service without Supabase
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  city?: string;
  subscription_type: 'free' | 'growth' | 'enterprise';
}

export interface User extends AuthUser {}

export const signUp = async (
  email: string,
  _password: string,
  name: string,
  phone: string,
  city: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
  try {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const user = {
      id: userId,
      email,
      name,
      phone,
      city,
      subscription_type: 'free' as const
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

    return {
      success: true,
      user
    };
  } catch (error: any) {
    console.error('خطأ في التسجيل:', error);
    return {
      success: false,
      error: error.message || 'حدث خطأ غير متوقع'
    };
  }
};

export const signIn = async (email: string, _password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
  try {
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email) {
        localStorage.setItem('isAuthenticated', 'true');
        return {
          success: true,
          user
        };
      }
    }

    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user = {
      id: userId,
      email,
      name: 'مستخدم جديد',
      phone: '',
      city: 'الرياض',
      subscription_type: 'free' as const
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

    return {
      success: true,
      user
    };
  } catch (error: any) {
    console.error('خطأ في تسجيل الدخول:', error);
    return {
      success: false,
      error: error.message || 'حدث خطأ غير متوقع'
    };
  }
};

export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    return { success: true };
  } catch (error: any) {
    console.error('خطأ في تسجيل الخروج:', error);
    return {
      success: false,
      error: error.message || 'حدث خطأ غير متوقع'
    };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('currentUser');
    
    if (isAuthenticated === 'true' && storedUser) {
      return JSON.parse(storedUser);
    }
    
    return null;
  } catch (error) {
    console.error('خطأ في جلب المستخدم الحالي:', error);
    return null;
  }
};

export const updateUserProfile = async (
  userId: string,
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
      error: error.message || 'حدث خطأ غير متوقع'
    };
  }
};

export const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('تم إرسال رابط إعادة تعيين كلمة المرور إلى:', email);
    return { success: true };
  } catch (error: any) {
    console.error('خطأ في إعادة تعيين كلمة المرور:', error);
    return {
      success: false,
      error: error.message || 'حدث خطأ غير متوقع'
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

  async signOut(): Promise<void> {
    await signOut();
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    return getCurrentUser();
  }
}

export const authService = new AuthService();