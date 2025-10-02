// Local Storage API Service - No Backend Required
import toast from 'react-hot-toast';
import { SecurityUtils } from '../utils/security';

export interface VoiceChatRequest {
  audioFile: File;
  sessionId?: string;
}

export interface TextChatRequest {
  message: string;
  sessionId?: string;
  context?: any;
}

export interface BusinessPlanRequest {
  projectName: string;
  industry: string;
  description: string;
  location: string;
  targetMarket: string;
  initialInvestment: number;
  fixedCosts: number;
  variableCosts: number;
  revenueProjections: number[];
  marketSize: number;
  marketGrowthRate: number;
  targetMarketShare: number;
  teamSize: number;
  competitiveAdvantages: string[];
  riskFactors: string[];
  fundingRequirements: number;
}

class APIService {
  private requestQueue: Map<string, Promise<any>> = new Map();

  // Voice Chat - محاكاة مع localStorage
  async voiceChat(request: VoiceChatRequest) {
    try {
      // محاكاة معالجة الصوت
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // حفظ المحادثة في localStorage
      const conversation = {
        id: `conv_${Date.now()}`,
        type: 'voice',
        message: 'رسالة صوتية محولة إلى نص',
        timestamp: new Date().toISOString(),
        sessionId: request.sessionId || 'default'
      };
      
      this.saveConversation(conversation);
      
      return {
        success: true,
        user_text: 'رسالة صوتية محولة إلى نص',
        assistant_text: 'تم استلام رسالتك الصوتية بنجاح. كيف يمكنني مساعدتك؟',
        session_id: request.sessionId || 'default',
        model_used: 'local_voice',
        processing_time: 1000
      };
    } catch (error) {
      console.error('Voice chat error:', error);
      toast.error('خطأ في المحادثة الصوتية');
      throw error;
    }
  }

  // Text Chat - محاكاة مع localStorage
  async textChat(request: TextChatRequest) {
    try {
      // تنظيف النص من المحتوى الضار
      const sanitizedMessage = SecurityUtils.sanitizeInput(request.message);
      
      // محاكاة معالجة النص
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // حفظ المحادثة في localStorage
      const conversation = {
        id: `conv_${Date.now()}`,
        type: 'text',
        message: sanitizedMessage,
        timestamp: new Date().toISOString(),
        sessionId: request.sessionId || 'default'
      };
      
      this.saveConversation(conversation);
      
      // إجابة ذكية بناءً على المحتوى
      const response = this.generateSmartResponse(sanitizedMessage);
      
      return {
        success: true,
        response: response,
        session_id: request.sessionId || 'default',
        model_used: 'local_ai',
        processing_time: 500
      };
    } catch (error) {
      console.error('Text chat error:', error);
      toast.error('خطأ في المحادثة النصية');
      throw error;
    }
  }

  // Generate Business Plan - محاكاة مع localStorage
  async generateBusinessPlan(request: BusinessPlanRequest) {
    try {
      // التحقق من صحة البيانات
      this.validateBusinessPlanRequest(request);

      // محاكاة إنتاج دراسة الجدوى
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const planId = `plan_${Date.now()}`;
      const timestamp = new Date().toISOString();
      
      // إنشاء تحليل افتراضي
      const analysis = {
        swot: `نقاط القوة: ${request.competitiveAdvantages.join('، ')}. نقاط الضعف: ${request.riskFactors.join('، ')}. الفرص: السوق السعودي ينمو بقوة. التهديدات: المنافسة الشديدة.`,
        market: `حجم السوق: ${request.marketSize.toLocaleString()} ريال. معدل النمو: ${(request.marketGrowthRate * 100).toFixed(1)}%. الحصة المستهدفة: ${(request.targetMarketShare * 100).toFixed(1)}%.`,
        costs: `الاستثمار الأولي: ${request.initialInvestment.toLocaleString()} ريال. التكاليف الثابتة: ${request.fixedCosts.toLocaleString()} ريال. التكاليف المتغيرة: ${request.variableCosts.toLocaleString()} ريال.`,
        profitability: `الإيرادات المتوقعة: ${request.revenueProjections.map(r => r.toLocaleString()).join('، ')} ريال. نقطة التعادل متوقعة خلال 12-18 شهر.`,
        marketing: {
          campaigns: 'استراتيجية تسويقية متعددة القنوات: التسويق الرقمي، الشراكة مع المؤثرين، الحملات الإعلانية.',
          audience: `الجمهور المستهدف: ${request.targetMarket}. الخصائص الديموغرافية: العائلات الشابة، الدخل المتوسط والعالي.`,
          platforms: 'المنصات الرئيسية: سناب شات، انستقرام، تيك توك، جوجل، فيسبوك.'
        },
        financial: {
          cashFlow: `التدفق النقدي المتوقع: السنة الأولى ${request.revenueProjections[0].toLocaleString()} ريال، السنة الثانية ${request.revenueProjections[1].toLocaleString()} ريال.`,
          breakeven: `نقطة التعادل: ${Math.round(request.initialInvestment / (request.revenueProjections[0] / 12))} شهر.`
        }
      };
      
      // حفظ الدراسة في localStorage
      const businessPlan = {
        id: planId,
        projectName: request.projectName,
        industry: request.industry,
        description: request.description,
        location: request.location,
        analysis,
        timestamp,
        status: 'completed'
      };
      
      this.saveBusinessPlan(businessPlan);
      
      return {
        success: true,
        plan_id: planId,
        files: {
          excel: `${planId}_financial_model.xlsx`,
          pdf: `${planId}_business_plan.pdf`
        },
        generated_at: timestamp,
        summary: `تم إنتاج دراسة جدوى شاملة لمشروع ${request.projectName}`,
        analysis,
        financials: {
          initialInvestment: request.initialInvestment,
          revenueProjections: request.revenueProjections,
          breakEvenMonths: Math.round(request.initialInvestment / (request.revenueProjections[0] / 12))
        },
        bankability: {
          score: 85,
          recommendation: 'مشروع قابل للتمويل مع بعض التحسينات المطلوبة'
        }
      };
    } catch (error) {
      console.error('Business plan generation error:', error);
      toast.error('خطأ في إنتاج دراسة الجدوى');
      throw error;
    }
  }

  // Download File - محاكاة مع localStorage
  async downloadFile(planId: string, fileType: string) {
    try {
      // محاكاة تحميل الملف
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // إنشاء ملف وهمي
      const content = fileType === 'excel' 
        ? 'Excel file content here' 
        : 'PDF file content here';
      
      const blob = new Blob([content], { 
        type: fileType === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf' 
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${planId}_${fileType}.${fileType === 'excel' ? 'xlsx' : 'pdf'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('تم تحميل الملف بنجاح');
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error('خطأ في تحميل الملف');
      throw error;
    }
  }

  // Project Management - مع localStorage
  async saveProject(inputData: any) {
    try {
      const projectId = `project_${Date.now()}`;
      const savedProject = { 
        ...inputData, 
        id: projectId, 
        created_at: new Date().toISOString(),
        user_id: this.getCurrentUserId()
      };
      
      const existingProjects = JSON.parse(localStorage.getItem('user_projects') || '[]');
      existingProjects.push(savedProject);
      localStorage.setItem('user_projects', JSON.stringify(existingProjects));
      
      toast.success('تم حفظ المشروع بنجاح');
      return savedProject;
    } catch (error) {
      console.error('Save project error:', error);
      toast.error('خطأ في حفظ المشروع');
      throw error;
    }
  }

  async getUserProjects(userId: string) {
    try {
      const projects = JSON.parse(localStorage.getItem('user_projects') || '[]');
      return projects.filter((p: any) => p.user_id === userId);
    } catch (error) {
      console.error('Get projects error:', error);
      return [];
    }
  }

  async updateProject(projectId: string, updates: any) {
    try {
      const projects = JSON.parse(localStorage.getItem('user_projects') || '[]');
      const projectIndex = projects.findIndex((p: any) => p.id === projectId);
      
      if (projectIndex === -1) throw new Error('Project not found');
      
      projects[projectIndex] = { 
        ...projects[projectIndex], 
        ...updates, 
        updated_at: new Date().toISOString() 
      };
      localStorage.setItem('user_projects', JSON.stringify(projects));
      
      toast.success('تم تحديث المشروع بنجاح');
      return projects[projectIndex];
    } catch (error) {
      console.error('Update project error:', error);
      toast.error('خطأ في تحديث المشروع');
      throw error;
    }
  }

  async deleteProject(projectId: string) {
    try {
      const projects = JSON.parse(localStorage.getItem('user_projects') || '[]');
      const filteredProjects = projects.filter((p: any) => p.id !== projectId);
      localStorage.setItem('user_projects', JSON.stringify(filteredProjects));
      
      toast.success('تم حذف المشروع بنجاح');
    } catch (error) {
      console.error('Delete project error:', error);
      toast.error('خطأ في حذف المشروع');
      throw error;
    }
  }

  // Helper Methods
  private validateBusinessPlanRequest(request: BusinessPlanRequest) {
    const errors: string[] = [];

    if (!request.projectName || request.projectName.trim().length < 3) {
      errors.push('اسم المشروع يجب أن يكون 3 أحرف على الأقل');
    }

    if (!request.industry) {
      errors.push('نوع المشروع مطلوب');
    }

    if (!request.description || request.description.trim().length < 10) {
      errors.push('وصف المشروع يجب أن يكون 10 أحرف على الأقل');
    }

    if (request.initialInvestment < 10000) {
      errors.push('الاستثمار المبدئي يجب أن يكون 10,000 ريال على الأقل');
    }

    if (request.initialInvestment > 100000000) {
      errors.push('الاستثمار المبدئي كبير جداً');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  private generateSmartResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('مشروع') || lowerMessage.includes('استثمار')) {
      return 'أهلاً بك! يمكنني مساعدتك في تحليل مشروعك وإنتاج دراسة جدوى شاملة. ما نوع المشروع الذي تريد تحليله؟';
    }
    
    if (lowerMessage.includes('دراسة جدوى') || lowerMessage.includes('تحليل')) {
      return 'ممتاز! لإنشاء دراسة جدوى احترافية، أحتاج لمعرفة تفاصيل مشروعك: نوع النشاط، الموقع، الاستثمار المبدئي، والجمهور المستهدف.';
    }
    
    if (lowerMessage.includes('تمويل') || lowerMessage.includes('قرض')) {
      return 'يمكنني مساعدتك في تحليل متطلبات التمويل وتحديد أفضل مصادر التمويل المناسبة لمشروعك. ما هو حجم التمويل المطلوب؟';
    }
    
    if (lowerMessage.includes('سوق') || lowerMessage.includes('منافسة')) {
      return 'تحليل السوق جزء مهم من أي مشروع. يمكنني مساعدتك في فهم حجم السوق، المنافسين، والفرص المتاحة.';
    }
    
    return 'شكراً لك على رسالتك! كيف يمكنني مساعدتك في تطوير مشروعك؟';
  }

  private saveConversation(conversation: any) {
    const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    conversations.push(conversation);
    
    // الاحتفاظ بآخر 100 محادثة فقط
    if (conversations.length > 100) {
      conversations.splice(0, conversations.length - 100);
    }
    
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }

  private saveBusinessPlan(businessPlan: any) {
    const businessPlans = JSON.parse(localStorage.getItem('business_plans') || '[]');
    businessPlans.push(businessPlan);
    
    // الاحتفاظ بآخر 50 دراسة جدوى فقط
    if (businessPlans.length > 50) {
      businessPlans.splice(0, businessPlans.length - 50);
    }
    
    localStorage.setItem('business_plans', JSON.stringify(businessPlans));
  }

  private getCurrentUserId(): string {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user?.id || 'anonymous';
  }

  // Stats and Health Check
  async getStats() {
    try {
      const projects = JSON.parse(localStorage.getItem('user_projects') || '[]');
      const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
      const businessPlans = JSON.parse(localStorage.getItem('business_plans') || '[]');
      
      return {
        totalProjects: projects.length,
        totalConversations: conversations.length,
        totalBusinessPlans: businessPlans.length,
        lastActivity: new Date().toISOString()
      };
    } catch (error) {
      console.error('Stats error:', error);
      return null;
    }
  }

  async getModelsStatus() {
    return {
      local_ai: 'active',
      local_voice: 'active',
      status: 'healthy'
    };
  }

  async healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        localStorage: 'active',
        voiceProcessing: 'active',
        textProcessing: 'active'
      }
    };
  }
}

export const apiService = new APIService();