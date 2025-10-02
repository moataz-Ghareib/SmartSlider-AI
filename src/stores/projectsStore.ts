import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Project } from '../types';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

interface ProjectsState {
  // State
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchProjects: (userId: string) => Promise<void>;
  saveProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<Project | null>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  setCurrentProject: (project: Project | null) => void;
  clearError: () => void;
}

export const useProjectsStore = create<ProjectsState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        projects: [],
        currentProject: null,
        loading: false,
        error: null,

        // Fetch projects
        fetchProjects: async (userId: string) => {
          set({ loading: true, error: null });
          try {
            const projects = await apiService.getUserProjects(userId);
            set({ projects, loading: false });
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error('خطأ في جلب المشاريع');
          }
        },

        // Save project
        saveProject: async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
          set({ loading: true, error: null });
          try {
            const savedProject = await apiService.saveProject(projectData);
            if (savedProject) {
              const newProject: Project = {
                ...savedProject,
                id: savedProject.id,
                createdAt: new Date(savedProject.created_at || Date.now())
              };
              
              set((state) => ({
                projects: [...state.projects, newProject],
                currentProject: newProject,
                loading: false
              }));
              
              toast.success('تم حفظ المشروع بنجاح');
              return newProject;
            }
            return null;
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error('خطأ في حفظ المشروع');
            return null;
          }
        },

        // Update project
        updateProject: async (id: string, updates: Partial<Project>) => {
          set({ loading: true, error: null });
          try {
            const updatedProject = await apiService.updateProject(id, updates);
            if (updatedProject) {
              set((state) => ({
                projects: state.projects.map(p => 
                  p.id === id ? { ...p, ...updatedProject, updatedAt: new Date() } : p
                ),
                currentProject: state.currentProject?.id === id 
                  ? { ...state.currentProject, ...updatedProject, updatedAt: new Date() }
                  : state.currentProject,
                loading: false
              }));
              
              toast.success('تم تحديث المشروع بنجاح');
              return true;
            }
            return false;
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error('خطأ في تحديث المشروع');
            return false;
          }
        },

        // Delete project
        deleteProject: async (id: string) => {
          set({ loading: true, error: null });
          try {
            await apiService.deleteProject(id);
            set((state) => ({
              projects: state.projects.filter(p => p.id !== id),
              currentProject: state.currentProject?.id === id ? null : state.currentProject,
              loading: false
            }));
            
            toast.success('تم حذف المشروع بنجاح');
            return true;
          } catch (error: any) {
            set({ error: error.message, loading: false });
            toast.error('خطأ في حذف المشروع');
            return false;
          }
        },

        // Set current project
        setCurrentProject: (project: Project | null) => {
          set({ currentProject: project });
        },

        // Clear error
        clearError: () => set({ error: null }),
      }),
      {
        name: 'projects-storage',
        partialize: (state) => ({ 
          projects: state.projects,
          currentProject: state.currentProject 
        }),
      }
    ),
    {
      name: 'projects-store',
    }
  )
);
