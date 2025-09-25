import React from 'react';
import { Mic, FileText, Download, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface HowItWorksSectionProps {
  isDarkMode?: boolean;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isDarkMode = false }) => {
  const steps = [
    {
      number: 1,
      title: 'عرّف مشروعك بالصوت',
      description: 'شارك فكرة مشروعك والجمهور المستهدف عبر تسجيل صوتي قصير',
      icon: Mic,
      details: 'محرك الاستماع الذكي يلتقط النقاط الجوهرية ويحوّلها إلى متطلبات واضحة'
    },
    {
      number: 2,
      title: 'تصوّر أولي فوري',
      description: 'نقاط تنفيذ واضحة + قائمة البيانات المطلوبة بشكل منظم',
      icon: FileText,
      details: 'تحليل تلقائي للمدخلات مع إخراج منسق يختصر عليك الوقت في الخطوة التالية'
    },
    {
      number: 3,
      title: 'أكمل البيانات',
      description: 'أدخل التكاليف والأسعار والافتراضات المالية بدقة',
      icon: CheckCircle,
      details: 'نماذج ذكية وإرشادات مدمجة لضمان إدخال بيانات واقعية ومتسقة'
    },
    {
      number: 4,
      title: 'استلم الدراسة الجاهزة',
      description: 'PDF + Excel + عرض تقديمي للتقديم',
      icon: Download,
      details: 'حزمة مخرجات احترافية: دراسة جدوى، نموذج مالي، وعرض مستثمرين'
    }
  ];

  const sectionBg = isDarkMode
    ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800'
    : 'bg-gradient-to-br from-gray-50 to-light-green';

  const cardClasses = isDarkMode
    ? 'bg-gray-900/80 border border-gray-800'
    : 'bg-white';

  const titleClasses = isDarkMode ? 'text-white' : 'text-gray-900';
  const textMuted = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15 } })
  };

  return (
    <section className={`py-20 px-4 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-almarai font-bold ${titleClasses} mb-4`}>
            كيف يعمل SmartStartAI؟
          </h2>
          <p className={`text-lg ${textMuted} font-almarai max-w-3xl mx-auto`}>
            رحلة مدروسة من الفكرة إلى دراسة جدوى جاهزة للتقديم — بسرعة واحترافية
          </p>
        </div>

        {/* الخطوات */}
        <div className="relative">
          {/* خط الربط */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-saudi-green via-saudi-gold to-tech-blue transform -translate-y-1/2 z-0 opacity-70"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                whileHover={{ scale: 1.02, y: -5 }}
                className="text-center group"
              >
                {/* رقم الخطوة */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full shadow-lg mx-auto flex items-center justify-center border-4 border-saudi-green group-hover:border-saudi-gold transition-all duration-300`}>
                    <span className={`text-3xl font-bold text-saudi-green group-hover:text-saudi-gold transition-colors duration-300`}>
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* محتوى الخطوة */}
                <div className={`${cardClasses} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 p-6`}> 
                  <div className="w-12 h-12 bg-gradient-to-r from-saudi-green to-saudi-gold rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className={`text-xl font-almarai font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                    {step.title}
                  </h3>
                  
                  <p className={`${textMuted} font-almarai mb-4 leading-relaxed`}>
                    {step.description}
                  </p>
                  
                  <div className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-light-green'} rounded-lg p-3 border border-transparent`}> 
                    <p className={`${isDarkMode ? 'text-gray-200' : 'text-saudi-green'} font-almarai text-sm`}>
                      {step.details}
                    </p>
                  </div>
                </div>

                {/* سهم الانتقال */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 translate-x-4 z-20">
                    <ArrowLeft className={`${isDarkMode ? 'text-saudi-gold' : 'text-saudi-green'} h-8 w-8`} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* زر البدء */}
        <div className="text-center mt-16">
          <motion.button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.hash = 'flow';
              }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-saudi-green to-saudi-gold text-white px-12 py-4 rounded-2xl font-almarai font-bold text-xl hover:shadow-2xl transition-all duration-300"
          >
            ابدأ رحلتك الآن مجاناً
          </motion.button>
          <p className={`${textMuted} font-almarai mt-4`}>
            لا حاجة للتسجيل • ابدأ التجربة مباشرةً
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;