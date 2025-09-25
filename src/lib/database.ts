// localStorage-based database service (Supabase removed)
import { SecurityUtils } from '../utils/security';
import { Project, Analysis } from '../types';

export interface DatabaseError {
  code: string;
  message: string;
  details?: any;
}

export class DatabaseService {
  private static instance: DatabaseService;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // ==================== Helper Methods ====================
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getStoredProjects(): Project[] {
    try {
      const stored = localStorage.getItem('projects');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private getStoredAnalyses(): Analysis[] {
    try {
      const stored = localStorage.getItem('analyses');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // ==================== Projects ====================
  async createProject(projectData: Omit<Project, 'id' | 'createdAt'>): Promise<{ success: boolean; data?: Project; error?: string }> {
    try {
      // تنظيف البيانات
      const sanitizedData = {
        ...projectData,
        title: SecurityUtils.sanitizeInput(projectData.title),
        description: SecurityUtils.sanitizeInput(projectData.description)
      };

      // Generate new project with localStorage
      const newProject: Project = {
        ...sanitizedData,
        id: this.generateId(),
        createdAt: new Date()
      };

      // Get existing projects
      const existingProjects = this.getStoredProjects();
      existingProjects.push(newProject);
      
      // Save to localStorage
      localStorage.setItem('projects', JSON.stringify(existingProjects));

      return { success: true, data: newProject };
    } catch (error: any) {
      console.error('Create project error:', error);
      return { success: false, error: 'خطأ في إنشاء المشروع' };
    }
  }

  async getUserProjects(userId?: string, filters?: {
    status?: string;
    type?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ success: boolean; data?: Project[]; error?: string; total?: number }> {
    try {
      // Since we're using localStorage, we get all projects (no user filtering for demo)
      let projects = this.getStoredProjects();
      
      // Apply filters
      if (filters?.status) {
        projects = projects.filter((p: Project) => p.status === filters.status);
      }

      if (filters?.type) {
        projects = projects.filter((p: Project) => p.type === filters.type);
      }

      // Sort by createdAt descending
      projects.sort((a: Project, b: Project) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      const total = projects.length;
      
      // Apply pagination
      if (filters?.offset || filters?.limit) {
        const start = filters?.offset || 0;
        const end = start + (filters?.limit || 10);
        projects = projects.slice(start, end);
      }

      return { success: true, data: projects, total };
    } catch (error: any) {
      console.error('Get projects error:', error);
      return { success: false, error: 'خطأ في جلب المشاريع' };
    }
  }

  async updateProject(projectId: string, updates: Partial<Project>): Promise<{ success: boolean; data?: Project; error?: string }> {
    try {
      const projects = this.getStoredProjects();
      const projectIndex = projects.findIndex((p: Project) => p.id === projectId);
      
      if (projectIndex === -1) {
        return { success: false, error: 'المشروع غير موجود' };
      }

      const sanitizedUpdates: Partial<Project> = {};
      if (updates.title) sanitizedUpdates.title = SecurityUtils.sanitizeInput(updates.title);
      if (updates.description) sanitizedUpdates.description = SecurityUtils.sanitizeInput(updates.description);
      if (updates.status) sanitizedUpdates.status = updates.status;
      if (updates.type) sanitizedUpdates.type = updates.type;
      if (updates.city) sanitizedUpdates.city = updates.city;
      if (updates.goal) sanitizedUpdates.goal = updates.goal;

      // Update the project
      projects[projectIndex] = { ...projects[projectIndex], ...sanitizedUpdates };
      
      // Save to localStorage
      localStorage.setItem('projects', JSON.stringify(projects));

      return { success: true, data: projects[projectIndex] };
    } catch (error: any) {
      console.error('Update project error:', error);
      return { success: false, error: 'خطأ في تحديث المشروع' };
    }
  }

  async deleteProject(projectId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const projects = this.getStoredProjects();
      const filteredProjects = projects.filter((p: Project) => p.id !== projectId);
      
      if (projects.length === filteredProjects.length) {
        return { success: false, error: 'المشروع غير موجود' };
      }
      
      localStorage.setItem('projects', JSON.stringify(filteredProjects));
      return { success: true };
    } catch (error: any) {
      console.error('Delete project error:', error);
      return { success: false, error: 'خطأ في حذف المشروع' };
    }
  }

  async bulkDeleteProjects(projectIds: string[]): Promise<{ success: boolean; error?: string }> {
    try {
      const projects = this.getStoredProjects();
      const filteredProjects = projects.filter((p: Project) => !projectIds.includes(p.id));
      
      localStorage.setItem('projects', JSON.stringify(filteredProjects));
      return { success: true };
    } catch (error: any) {
      console.error('Bulk delete projects error:', error);
      return { success: false, error: 'خطأ في حذف المشاريع' };
    }
  }

  // ==================== Analyses ====================
  async createAnalysis(analysisData: Analysis): Promise<{ success: boolean; data?: Analysis; error?: string }> {
    try {
      const sanitizedData = {
        ...analysisData,
        feasibility: this.sanitizeJsonData(analysisData.feasibility),
        marketing: this.sanitizeJsonData(analysisData.marketing),
        financial: this.sanitizeJsonData(analysisData.financial),
        esg: this.sanitizeJsonData(analysisData.esg),
        code: analysisData.code ? SecurityUtils.sanitizeInput(analysisData.code) : undefined
      };

      // Get existing analyses and add new one
      const existingAnalyses = this.getStoredAnalyses();
      existingAnalyses.push(sanitizedData);
      
      // Save to localStorage
      localStorage.setItem('analyses', JSON.stringify(existingAnalyses));

      return { success: true, data: sanitizedData };
    } catch (error: any) {
      console.error('Create analysis error:', error);
      return { success: false, error: 'خطأ في إنشاء التحليل' };
    }
  }

  async getProjectAnalyses(projectId: string): Promise<{ success: boolean; data?: Analysis[]; error?: string }> {
    try {
      // For demo purposes, return all analyses since we don't have project_id in Analysis type
      const analyses = this.getStoredAnalyses();
      return { success: true, data: analyses };
    } catch (error: any) {
      console.error('Get analyses error:', error);
      return { success: false, error: 'خطأ في جلب التحليلات' };
    }
  }

  // ==================== Search & Analytics ====================
  async searchProjects(userId?: string, query?: string, filters?: {
    type?: string;
    status?: string;
    city?: string;
  }): Promise<{ success: boolean; data?: Project[]; error?: string }> {
    try {
      let projects = this.getStoredProjects();
      
      // Apply search query
      if (query) {
        const sanitizedQuery = SecurityUtils.sanitizeInput(query).toLowerCase();
        projects = projects.filter((p: Project) => 
          p.title.toLowerCase().includes(sanitizedQuery) || 
          p.description.toLowerCase().includes(sanitizedQuery)
        );
      }

      // Apply filters
      if (filters?.type) {
        projects = projects.filter((p: Project) => p.type === filters.type);
      }

      if (filters?.status) {
        projects = projects.filter((p: Project) => p.status === filters.status);
      }

      if (filters?.city) {
        projects = projects.filter((p: Project) => p.city === filters.city);
      }

      // Sort by createdAt descending and limit to 50
      projects.sort((a: Project, b: Project) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      projects = projects.slice(0, 50);

      return { success: true, data: projects };
    } catch (error: any) {
      console.error('Search projects error:', error);
      return { success: false, error: 'خطأ في البحث' };
    }
  }

  async getUserAnalytics(userId?: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const projects = this.getStoredProjects();
      const analyses = this.getStoredAnalyses();

      // حساب الإحصائيات
      const analytics = {
        projects: {
          total: projects.length,
          completed: projects.filter((p: Project) => p.status === 'completed').length,
          analyzing: projects.filter((p: Project) => p.status === 'analyzing').length,
          saved: projects.filter((p: Project) => p.status === 'saved').length,
          by_type: this.groupBy(projects, 'type'),
          monthly_trend: this.getMonthlyTrend(projects.map((p: Project) => ({ created_at: p.createdAt.toISOString() })))
        },
        analyses: {
          total: analyses.length,
          monthly_trend: []
        },
        activity: {
          last_project: projects[0]?.createdAt?.toISOString(),
          last_analysis: null
        }
      };

      return { success: true, data: analytics };
    } catch (error: any) {
      console.error('Get analytics error:', error);
      return { success: false, error: 'خطأ في جلب الإحصائيات' };
    }
  }

  // ==================== Utility Methods ====================
  private sanitizeJsonData(data: any): any {
    if (typeof data === 'string') {
      return SecurityUtils.sanitizeInput(data);
    }
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeJsonData(item));
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[SecurityUtils.sanitizeInput(key)] = this.sanitizeJsonData(value);
      }
      return sanitized;
    }
    
    return data;
  }

  private getLocalizedDatabaseError(error: any): string {
    const errorMap: Record<string, string> = {
      '23505': 'البيانات موجودة مسبقاً',
      '23503': 'مرجع غير صحيح',
      '42501': 'ليس لديك صلاحية لهذا الإجراء',
      'PGRST116': 'لم يتم العثور على البيانات'
    };

    return errorMap[error.code] || error.message || 'خطأ في قاعدة البيانات';
  }

  private groupBy(array: any[], key: string): Record<string, number> {
    return array.reduce((result, item) => {
      const group = item[key] || 'غير محدد';
      result[group] = (result[group] || 0) + 1;
      return result;
    }, {});
  }

  private getMonthlyTrend(data: any[]): Array<{ month: string; count: number }> {
    const monthlyData: Record<string, number> = {};
    
    data.forEach(item => {
      const date = new Date(item.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6) // آخر 6 أشهر
      .map(([month, count]) => ({
        month: new Date(month + '-01').toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' }),
        count
      }));
  }
}

export const databaseService = DatabaseService.getInstance();