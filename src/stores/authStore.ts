import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthUser } from '../lib/auth';
import { authService } from '../lib/auth';
import toast from 'react-hot-toast';

interface AuthState {
  // State
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  
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

        // Sign in
        signIn: async (email: string, password: string) => {
          set({ loading: true, error: null });
          try {
            const result = await authService.signIn(email, password);
            if (result.success) {
              set({ user: result.user, loading: false });
              toast.success('تم تسجيل الدخول بنجاح!');
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
              set({ user: result.user, loading: false });
              toast.success('تم إنشاء حسابك بنجاح!');
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
          set({ loading: true, error: null });
          try {
            const result = await authService.signInWithApple();
            if (result.success) {
              set({ loading: false });
              toast.success('جاري تسجيل الدخول عبر Apple...');
              return true;
            } else {
              set({ error: result.error, loading: false });
              toast.error(result.error || 'خطأ في تسجيل الدخول عبر Apple');
              return false;
            }
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error(error.message || 'خطأ في تسجيل الدخول عبر Apple');
            return false;
          }
        },

        // Sign out
        signOut: async () => {
          try {
            await authService.signOut();
            set({ user: null, error: null });
            toast.success('تم تسجيل الخروج بنجاح');
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
