import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Analysis, Project } from '../types';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

interface AnalysisState {
  // State
  currentAnalysis: Analysis | null;
  loading: boolean;
  error: string | null;
  isGenerating: boolean;
  
  // Actions
  generateAnalysis: (project: Project) => Promise<Analysis | null>;
  downloadResults: (planId: string, fileType: 'excel' | 'pdf') => Promise<void>;
  clearAnalysis: () => void;
  clearError: () => void;
}

export const useAnalysisStore = create<AnalysisState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentAnalysis: null,
      loading: false,
      error: null,
      isGenerating: false,

      // Generate analysis
      generateAnalysis: async (project: Project) => {
        set({ loading: true, isGenerating: true, error: null });
        try {
          // تحويل Project إلى BusinessPlanRequest
          const businessPlanRequest = {
            projectName: project.title,
            industry: project.type,
            description: project.description,
            location: project.city,
            targetMarket: 'السوق السعودي',
            initialInvestment: 100000, // قيمة افتراضية
            fixedCosts: 50000,
            variableCosts: 30000,
            revenueProjections: [120000, 150000, 180000],
            marketSize: 1000000,
            marketGrowthRate: 0.15,
            targetMarketShare: 0.05,
            teamSize: 5,
            competitiveAdvantages: ['جودة عالية', 'خدمة ممتازة'],
            riskFactors: ['منافسة', 'تقلبات السوق'],
            fundingRequirements: 200000
          };

          const result = await apiService.generateBusinessPlan(businessPlanRequest);
          
          if (result.success) {
            // إنشاء تحليل افتراضي بناءً على النتيجة
            const analysis: Analysis = {
              feasibility: {
                swot: result.analysis?.swot || 'تحليل SWOT للمشروع',
                market: result.analysis?.market || 'تحليل السوق',
                costs: result.analysis?.costs || 'تحليل التكاليف',
                profitability: result.analysis?.profitability || 'تحليل الربحية'
              },
              marketing: {
                campaigns: result.analysis?.marketing?.campaigns || 'استراتيجية التسويق',
                audience: result.analysis?.marketing?.audience || 'الجمهور المستهدف',
                platforms: result.analysis?.marketing?.platforms || 'منصات التسويق'
              },
              financial: {
                cashFlow: result.analysis?.financial?.cashFlow || 'تحليل التدفق النقدي',
                breakeven: result.analysis?.financial?.breakeven || 'نقطة التعادل'
              },
              esg: {
                sustainability: 'الاستدامة البيئية',
                social: 'الأثر الاجتماعي'
              }
            };

            set({ 
              currentAnalysis: analysis, 
              loading: false, 
              isGenerating: false 
            });
            
            toast.success('تم إنتاج التحليل بنجاح');
            return analysis;
          } else {
            set({ error: 'فشل في إنتاج التحليل', loading: false, isGenerating: false });
            toast.error('خطأ في إنتاج التحليل');
            return null;
          }
        } catch (error: any) {
          set({ error: error.message, loading: false, isGenerating: false });
          toast.error('خطأ في إنتاج التحليل');
          return null;
        }
      },

      // Download results
      downloadResults: async (planId: string, fileType: 'excel' | 'pdf') => {
        set({ loading: true, error: null });
        try {
          await apiService.downloadFile(planId, fileType);
          set({ loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
          toast.error('خطأ في تحميل الملف');
        }
      },

      // Clear analysis
      clearAnalysis: () => {
        set({ 
          currentAnalysis: null, 
          error: null, 
          loading: false, 
          isGenerating: false 
        });
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'analysis-store',
    }
  )
);
