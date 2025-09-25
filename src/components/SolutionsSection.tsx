import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  Calculator, 
  Settings, 
  Users, 
  Scale, 
  Laptop,
  MoreHorizontal,
  Download,
  CheckCircle,
  Star,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { serviceDepartments } from '../data/servicePackages';
import ServicePackagesModal from './ServicePackagesModal';
import { ServiceDepartment, ServiceRequest, ServiceResult } from '../types/services';
import toast from 'react-hot-toast';

interface SolutionsSectionProps {
  isDarkMode?: boolean;
}

const SolutionsSection: React.FC<SolutionsSectionProps> = ({ isDarkMode = false }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<ServiceDepartment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentResult, setCurrentResult] = useState<ServiceResult | null>(null);

  const handleDepartmentClick = (deptId: string) => {
    const department = serviceDepartments.find(d => d.id === deptId);
    if (department) {
      setSelectedDepartment(department);
      setIsModalOpen(true);
    }
  };

  const handleServiceRequest = async (request: ServiceRequest) => {
    try {
      // استدعاء API الخدمة المناسبة
      const API_BASE = import.meta.env.VITE_API_BASE || 'https://smartstartai-backend-production.up.railway.app';
      const response = await fetch(`${API_BASE}/api/v1/services/${request.departmentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: request.packageId,
          ...request.inputs,
          ...request.projectContext
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const result: ServiceResult = {
        success: true,
        data,
        files: {
          json: `${request.departmentId}_${request.packageId}_${Date.now()}.json`
        },
        recommendations: data.recommendations || [],
        nextSteps: data.nextSteps || []
      };

      // عرض النتيجة
      setCurrentResult(result);
      setShowResultModal(true);
      
      toast.success('تم إنتاج الخدمة بنجاح!');
      
    } catch (error) {
      console.error('Service request error:', error);
      toast.error('خطأ في معالجة طلب الخدمة');
    }
  };

  const downloadServiceResult = (result: ServiceResult) => {
    if (!result.data) return;

    const dataStr = JSON.stringify(result.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = result.files?.json || 'service_result.json';
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('تم تحميل نتائج الخدمة');
  };

  const departments = [
    {
      icon: TrendingUp,
      name: 'الإدارة والاستراتيجية',
      id: 'strategy',
      description: 'رؤية واضحة وخطة تنفيذ محكمة',
      features: ['رؤية/رسالة/NSM ✓', 'تحليل السوق ✓', 'OKRs وخارطة طريق ✓'],
      color: 'from-saudi-green to-tech-blue',
      emoji: '📈',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Target,
      name: 'التسويق والنمو',
      id: 'marketing',
      description: 'استراتيجيات تسويق مدروسة ونمو مستدام',
      features: ['Channel Mix محسن ✓', 'تقويم محتوى 90 يوم ✓', 'قياس ROI دقيق ✓'],
      color: 'from-saudi-gold to-saudi-green',
      emoji: '🎯',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: DollarSign,
      name: 'المبيعات وتطوير الأعمال',
      id: 'sales',
      description: 'قنوات بيع فعالة وشراكات استراتيجية',
      features: ['ICP محدد ✓', 'CRM متقدم ✓', 'Playbooks جاهزة ✓'],
      color: 'from-tech-blue to-saudi-gold',
      emoji: '💼',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Calculator,
      name: 'المالية',
      id: 'financial',
      description: 'نماذج مالية دقيقة وتحليل استثماري',
      features: ['P&L متقدم ✓', 'سيناريوهات متعددة ✓', 'تحليل حساسية ✓'],
      color: 'from-saudi-green to-saudi-gold',
      emoji: '💰',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Settings,
      name: 'العمليات',
      id: 'operations',
      description: 'عمليات محسنة وجودة عالية',
      features: ['SOPs شاملة ✓', 'إدارة جودة ✓', 'تحسين مستمر ✓'],
      color: 'from-gray-600 to-gray-800',
      emoji: '⚙️',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Users,
      name: 'الموارد البشرية',
      id: 'hr',
      description: 'فريق متميز وثقافة مؤسسية قوية',
      features: ['هيكل تنظيمي ✓', 'خطة توظيف ✓', 'تطوير مواهب ✓'],
      color: 'from-saudi-gold to-saudi-light',
      emoji: '👥',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Scale,
      name: 'القانوني والامتثال',
      id: 'legal',
      description: 'امتثال كامل وحماية قانونية',
      features: ['تراخيص كاملة ✓', 'عقود محكمة ✓', 'امتثال PDPL ✓'],
      color: 'from-saudi-dark to-saudi-primary',
      emoji: '⚖️',
      image: 'https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Laptop,
      name: 'المنتج والتقنية',
      id: 'product',
      description: 'منتجات تقنية متطورة وآمنة',
      features: ['PRD احترافي ✓', 'معمارية قوية ✓', 'أمان متقدم ✓'],
      color: 'from-green-500 to-teal-500',
      emoji: '💻',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: MoreHorizontal,
      name: 'استشارات مخصصة',
      id: 'consulting',
      description: 'حلول مبتكرة لتحديات فريدة',
      features: ['تحليل متقدم ✓', 'حلول مبتكرة ✓', 'ذكاء اصطناعي ✓'],
      color: 'from-saudi-gold to-saudi-green',
      emoji: '✨',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    }
  ];

  const sectionBg = isDarkMode ? 'bg-gray-950' : 'bg-white';
  const cardBg = isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100';
  const headingText = isDarkMode ? 'text-white' : 'text-gray-900';
  const bodyText = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const cardTitle = isDarkMode ? 'text-white' : 'text-gray-800';

  return (
    <section className={`py-20 px-4 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-almarai font-bold ${headingText} mb-4`}>
            حلول تنفيذية جاهزة
          </h2>
          <p className={`text-lg ${bodyText} font-almarai max-w-3xl mx-auto`}>
            باقات واضحة تغطي أهم أقسام عملك — بأسلوب بسيط ونتائج عملية
          </p>
        </div>

        {/* شبكة الأقسام */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group cursor-pointer"
            >
              <div className={`${cardBg} rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full`}>
                {/* صورة القسم */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dept.image}
                    alt={`قسم ${dept.name} - فريق عمل متخصص يعمل في بيئة مكتبية احترافية`}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-black/50' : 'from-black/30'} to-transparent`}></div>
                </div>

                <div className="p-6">
                  {/* رأس البطاقة */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${dept.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <dept.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* اسم القسم */}
                  <h3 className={`text-xl font-almarai font-bold ${cardTitle} mb-2 text-right`}>
                    {dept.name}
                  </h3>

                  <p className={`${bodyText} font-almarai mb-4 text-right leading-relaxed`}>
                    {dept.description}
                  </p>

                  {/* المميزات */}
                  <div className="space-y-2 mb-6">
                    {dept.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-end gap-2">
                        <span className="text-saudi-green font-almarai text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* زر الاستكشاف */}
                  <motion.button 
                    onClick={() => handleDepartmentClick(dept.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-saudi-green hover:text-white' : 'bg-white text-saudi-green border-saudi-green/20 hover:bg-gradient-to-r hover:from-saudi-green hover:to-saudi-gold hover:text-white'} border py-3 rounded-xl font-almarai font-bold transition-all duration-300 group-hover:shadow-lg`}
                  >
                    استكشف الحزم →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* قسم مثال تفصيلي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-16 rounded-3xl p-8 ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50'}`}
        >
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-almarai font-bold ${cardTitle} mb-2`}>
              مثال: حزمة المالية المعتمدة
            </h3>
            <p className={`${bodyText} font-almarai`}>
              نظرة سريعة على عناصر الحزمة وما تحتويه من مخرجات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-lg`}>
              <h4 className={`font-almarai font-bold ${cardTitle} mb-2`}>
                Excel مصرفي
              </h4>
              <p className={`${bodyText} font-almarai text-sm`}>
                نموذج مالي معتمد للبنوك مع جميع التبويبات
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-lg`}>
              <h4 className={`font-almarai font-bold ${cardTitle} mb-2`}>
                3 سيناريوهات
              </h4>
              <p className={`${bodyText} font-almarai text-sm`}>
                أساسي/متفائل/متحفظ مع تحليل حساسية
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-lg`}>
              <h4 className={`font-almarai font-bold ${cardTitle} mb-2`}>
                تحليل مخاطر
              </h4>
              <p className={`${bodyText} font-almarai text-sm`}>
                مصفوفة مخاطر مع خطط التخفيف
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-lg`}>
              <h4 className={`font-almarai font-bold ${cardTitle} mb-2`}>
                تقرير معتمد
              </h4>
              <p className={`${bodyText} font-almarai text-sm`}>
                تقرير PDF جاهز للتقديم للمستثمرين
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* نافذة حزم الخدمات */}
      <ServicePackagesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        department={selectedDepartment!}
        onRequestService={handleServiceRequest}
      />

      {/* نافذة عرض النتائج */}
      <AnimatePresence>
        {showResultModal && currentResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-4xl w-full max_h-[80vh] overflow-hidden`}
            >
              <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'} p-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-almarai font-bold">نتائج الخدمة</h3>
                  <button
                    onClick={() => setShowResultModal(false)}
                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'}`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* عرض البيانات */}
                <div className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-6`}>
                  <h4 className={`font-almarai font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3 text-right`}>
                    البيانات المُولدة:
                  </h4>
                  <pre className={`text-sm overflow-auto max-h-64 rounded-lg p-4 text-left ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-700'}`}>
                    {JSON.stringify(currentResult.data, null, 2)}
                  </pre>
                </div>

                {/* التوصيات */}
                {currentResult.recommendations && currentResult.recommendations.length > 0 && (
                  <div className={`${isDarkMode ? 'bg-blue-950/50 border-blue-900' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4 mb-6`}>
                    <h4 className={`font-almarai font-bold mb-3 text-right ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                      التوصيات:
                    </h4>
                    <ul className="space-y-2">
                      {currentResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className={`h-4 w-4 mt-1 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                          <span className={`font-almarai text-sm text-right ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                            {rec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* الخطوات التالية */}
                {currentResult.nextSteps && currentResult.nextSteps.length > 0 && (
                  <div className={`${isDarkMode ? 'bg-green-950/50 border-green-900' : 'bg-green-50 border-green-200'} border rounded-xl p-4 mb-6`}>
                    <h4 className={`font-almarai font-bold mb-3 text-right ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                      الخطوات التالية:
                    </h4>
                    <ul className="space-y-2">
                      {currentResult.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className={`h-4 w-4 mt-1 flex-shrink-0 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                          <span className={`font-almarai text-sm text-right ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} p-6 border-t`}>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => downloadServiceResult(currentResult)}
                    className="bg-saudi-green text-white px-6 py-3 rounded-xl font-almarai font-bold hover:bg-saudi-green/90 transition-colors flex items-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    تحميل JSON
                  </button>
                  
                  <button
                    onClick={() => setShowResultModal(false)}
                    className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-500 hover:bg-gray-600'} text-white px-6 py-3 rounded-xl font-almarai font-bold transition-colors`}
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SolutionsSection;