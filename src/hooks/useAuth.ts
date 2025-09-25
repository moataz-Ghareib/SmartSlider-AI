import { useState, useEffect, createContext, useContext } from 'react';
// Removed Supabase dependency
import { AuthUser, authService } from '../lib/auth';
import { SecurityUtils, loginRateLimiter } from '../utils/security';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signInWithApple: () => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      // Using stored user data instead of Supabase profile
      const storedUser = localStorage.getItem('currentUser');
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      
      if (isAuthenticated === 'true' && storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    // Check active session
    const getSession = async () => {
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for localStorage changes instead of Supabase auth
    const handleStorageChange = () => {
      fetchUserProfile();
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const signUp = async (email: string, password: string, userData: any): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await authService.signUp(email, password, userData);
      
      if (result.success) {
        await fetchUserProfile(); // Refresh user data
        toast.success('تم إنشاء حسابك بنجاح!');
        return true;
      } else {
        toast.error(result.error || 'خطأ في إنشاء الحساب');
        return false;
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'حدث خطأ في إنشاء الحساب');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await authService.signIn(email, password);
      
      if (result.success) {
        await fetchUserProfile(); // Refresh user data
        toast.success('تم تسجيل الدخول بنجاح!');
        return true;
      } else {
        toast.error(result.error || 'خطأ في تسجيل الدخول');
        return false;
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'خطأ في تسجيل الدخول');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await authService.signInWithGoogle();
      
      if (result.success) {
        toast.success('جاري تسجيل الدخول عبر Google...');
        return true;
      } else {
        toast.error(result.error || 'خطأ في تسجيل الدخول عبر Google');
        return false;
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast.error(error.message || 'خطأ في تسجيل الدخول عبر Google');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInWithApple = async (): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await authService.signInWithApple();
      
      if (result.success) {
        toast.success('جاري تسجيل الدخول عبر Apple...');
        return true;
      } else {
        toast.error(result.error || 'خطأ في تسجيل الدخول عبر Apple');
        return false;
      }
    } catch (error: any) {
      console.error('Apple sign in error:', error);
      toast.error(error.message || 'خطأ في تسجيل الدخول عبر Apple');
      return false;
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      toast.success('تم تسجيل الخروج بنجاح');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error('خطأ في تسجيل الخروج');
    }
  };

  const updateProfile = async (data: Partial<AuthUser>): Promise<boolean> => {
    try {
      const result = await authService.updateProfile(data);
      
      if (result.success && result.user) {
        setUser(result.user);
        toast.success('تم تحديث الملف الشخصي');
        return true;
      } else {
        toast.error(result.error || 'خطأ في تحديث الملف الشخصي');
        return false;
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      toast.error('خطأ في تحديث الملف الشخصي');
      return false;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const result = await authService.changePassword(currentPassword, newPassword);
      
      if (result.success) {
        toast.success('تم تغيير كلمة المرور بنجاح');
        return true;
      } else {
        toast.error(result.error || 'خطأ في تغيير كلمة المرور');
        return false;
      }
    } catch (error: any) {
      console.error('Change password error:', error);
      toast.error('خطأ في تغيير كلمة المرور');
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      const result = await authService.deleteAccount();
      
      if (result.success) {
        setUser(null);
        toast.success('تم حذف الحساب بنجاح');
        return true;
      } else {
        toast.error(result.error || 'خطأ في حذف الحساب');
        return false;
      }
    } catch (error: any) {
      console.error('Delete account error:', error);
      toast.error('خطأ في حذف الحساب');
      return false;
    }
  };

  const refreshSession = async () => {
    try {
      const result = await authService.refreshSession();
      if (result.success && result.session) {
        setUser(result.session.user);
      }
    } catch (error) {
      console.error('Session refresh error:', error);
      await signOut();
    }
  };

  // تسجيل الأحداث الأمنية - محلياً فقط
  const logSecurityEvent = async (event: string, userId?: string) => {
    try {
      // Log security events to localStorage for demo purposes
      const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
      securityLogs.push({
        timestamp: new Date().toISOString(),
        event,
        userId: userId || user?.id,
        userAgent: navigator.userAgent,
        url: window.location.href
      });
      
      // Keep only last 100 logs
      if (securityLogs.length > 100) {
        securityLogs.splice(0, securityLogs.length - 100);
      }
      
      localStorage.setItem('security_logs', JSON.stringify(securityLogs));
    } catch (error) {
      console.warn('Failed to log security event:', error);
    }
  };

  // مراقبة انتهاء صلاحية الجلسة - تم إزالة Supabase
  useEffect(() => {
    // Since we're using localStorage instead of Supabase, we don't need session expiry checks
    // Sessions are managed locally and don't have automatic expiration
    const checkLocalSession = setInterval(() => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (isAuthenticated !== 'true' && user) {
        // If localStorage indicates user is not authenticated but we have a user, sign out
        signOut();
      }
    }, 60000); // فحص كل دقيقة

    return () => clearInterval(checkLocalSession);
  }, [user, signOut]);

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithApple,
    signOut,
    updateProfile,
    changePassword,
    deleteAccount,
    refreshSession,
  };
};

export { AuthContext };