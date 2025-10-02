import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type ViewType = 'home' | 'flow' | 'dashboard' | 'results' | 'pricing' | 'help' | 'profile' | 'admin' | 'sector' | 'location-analysis' | 'blog' | 'post' | 'academy';

interface UIState {
  // Navigation
  currentView: ViewType;
  selectedSector: string;
  selectedBlogPost: string;
  
  // UI State
  isMenuOpen: boolean;
  isAuthModalOpen: boolean;
  isNotificationOpen: boolean;
  isPrivacyModalOpen: boolean;
  isDarkMode: boolean;
  isLoading: boolean;
  loadingProgress: number;
  isOnline: boolean;
  voiceEnabled: boolean;
  
  // Actions
  setCurrentView: (view: ViewType) => void;
  setSelectedSector: (sector: string) => void;
  setSelectedBlogPost: (slug: string) => void;
  toggleMenu: () => void;
  setMenuOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
  setNotificationOpen: (open: boolean) => void;
  setPrivacyModalOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setOnline: (online: boolean) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  toggleVoiceEnabled: () => void;
  resetUI: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentView: 'home',
        selectedSector: '',
        selectedBlogPost: '',
        isMenuOpen: false,
        isAuthModalOpen: false,
        isNotificationOpen: false,
        isPrivacyModalOpen: false,
        isDarkMode: true, // Enable dark mode by default
        isLoading: false,
        loadingProgress: 0,
        isOnline: navigator.onLine,
        voiceEnabled: localStorage.getItem('ssai_voice_enabled') !== 'false',

        // Navigation actions
        setCurrentView: (view: ViewType) => {
          set({ currentView: view });
        },

        setSelectedSector: (sector: string) => {
          set({ selectedSector: sector });
        },

        setSelectedBlogPost: (slug: string) => {
          set({ selectedBlogPost: slug });
        },

        // Menu actions
        toggleMenu: () => {
          set((state) => ({ isMenuOpen: !state.isMenuOpen }));
        },

        setMenuOpen: (open: boolean) => {
          set({ isMenuOpen: open });
        },

        // Modal actions
        setAuthModalOpen: (open: boolean) => {
          set({ isAuthModalOpen: open });
        },

        setNotificationOpen: (open: boolean) => {
          set({ isNotificationOpen: open });
        },

        setPrivacyModalOpen: (open: boolean) => {
          set({ isPrivacyModalOpen: open });
        },

        // Theme actions
        toggleDarkMode: () => {
          set((state) => {
            const newDarkMode = !state.isDarkMode;
            // Apply dark mode class to document
            if (typeof document !== 'undefined') {
              if (newDarkMode) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
            return { isDarkMode: newDarkMode };
          });
        },

        setDarkMode: (dark: boolean) => {
          set({ isDarkMode: dark });
          // Apply dark mode class to document
          if (typeof document !== 'undefined') {
            if (dark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        },

        // Loading actions
        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },

        setLoadingProgress: (progress: number) => {
          set({ loadingProgress: Math.max(0, Math.min(100, progress)) });
        },

        // Network status
        setOnline: (online: boolean) => {
          set({ isOnline: online });
        },

        // Voice preference
        setVoiceEnabled: (enabled: boolean) => {
          set({ voiceEnabled: enabled });
          try {
            localStorage.setItem('ssai_voice_enabled', String(enabled));
            if (!enabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
          } catch {}
        },

        toggleVoiceEnabled: () => {
          const current = get().voiceEnabled;
          const next = !current;
          set({ voiceEnabled: next });
          try {
            localStorage.setItem('ssai_voice_enabled', String(next));
            if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
          } catch {}
        },

        // Reset UI
        resetUI: () => {
          set({
            currentView: 'home',
            selectedSector: '',
            selectedBlogPost: '',
            isMenuOpen: false,
            isAuthModalOpen: false,
            isNotificationOpen: false,
            isPrivacyModalOpen: false,
            isLoading: false,
            loadingProgress: 0,
          });
        },
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ 
          isDarkMode: state.isDarkMode,
          currentView: state.currentView,
          voiceEnabled: state.voiceEnabled
        }),
      }
    ),
    {
      name: 'ui-store',
    }
  )
);
