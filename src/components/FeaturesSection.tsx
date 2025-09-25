import React from 'react';
import { Brain, Mic, FileCheck, BarChart3, MapPin, Shield, Zap, Globe, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturesSectionProps {
  isDarkMode?: boolean;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isDarkMode = false }) => {
  // تبسيط: إزالة حالة التدوير الآلي

  const mainFeatures = [
    {
      icon: Brain,
      title: 'ذكاء سعودي الهوية',
      description: 'مصمم لواقع السوق السعودي ويفهم الثقافة المحلية',
      color: 'from-saudi-green to-saudi-gold',
      points: [
        'فهم عميق للثقافة السعودية',
        'تحليل مخصص للسوق المحلي',
        'امتثال للأنظمة واللوائح'
      ]
    },
    {
      icon: Mic,
      title: 'محادثة صوتية فورية',
      description: 'اضغط وتكلّم — واستلم إجابة صوتية مع ملخص مكتوب',
      color: 'from-saudi-gold to-saudi-green',
      points: [
        'تحويل صوت إلى نص متقدم',
        'فهم اللهجات السعودية',
        'ردود صوتية طبيعية'
      ]
    },
    {
      icon: FileCheck,
      title: 'دراسة جدوى احترافية',
      description: 'متوافقة مع متطلبات البنوك والجهات التمويلية المحليّة',
      color: 'from-saudi-green to-saudi-gold',
      points: [
        'متوافقة مع معايير SAMA',
        'نماذج مالية تفاعلية',
        'عروض تقديمية جاهزة'
      ]
    },
    {
      icon: BarChart3,
      title: 'نتائج عملية مدعومة بالبيانات',
      description: 'توصيات واضحة وجداول مالية قابلة للتحرير',
      color: 'from-saudi-green to-saudi-gold',
      points: [
        'تحليلات مالية دقيقة',
        'إسقاطات واقعية',
        'توصيات قابلة للتنفيذ'
      ]
    }
  ];

  const additionalFeatures = [
    { icon: MapPin, title: 'خرائط السوق المحلية', desc: 'تحليل المنافسة في مدينتك', color: 'text-saudi-green' },
    { icon: Shield, title: 'امتثال PDPL كامل', desc: 'حماية البيانات وفق القوانين السعودية', color: 'text-saudi-gold' },
    { icon: Zap, title: 'نتائج فورية', desc: 'تحليل شامل خلال 3 دقائق', color: 'text-saudi-gold' },
    { icon: Globe, title: 'دعم متعدد اللغات', desc: 'عربي، إنجليزي، ولهجات محلية', color: 'text-saudi-green' }
  ];

  // تدوير المميزات تلقائياً
  // تم تبسيط الحركة: لا حاجة لتدوير تلقائي حالياً

  const sectionBg = isDarkMode ? 'bg-gray-950' : 'bg-white';
  const cardBg = isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100';
  const headingText = isDarkMode ? 'text-white' : 'text-gray-900';
  const bodyText = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const titleText = isDarkMode ? 'text-white' : 'text-gray-800';

  return (
    <section className={`py-20 px-4 ${sectionBg} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-almarai font-bold ${headingText} mb-4`}>
            لماذا SmartStartAI؟
          </h2>
          <p className={`text-lg ${bodyText} font-almarai max-w-3xl mx-auto`}>
            أول مستشار ذكي يفهم السوق السعودي ويتحدث بلغتك
          </p>
        </motion.div>

        {/* المميزات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -6 }}
              className={`${cardBg} rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group`}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className={`text-lg font-almarai font-bold ${titleText} mb-3`}>
                {feature.title}
              </h3>
              
              <p className={`${bodyText} font-almarai mb-4 text-sm leading-relaxed`}>
                {feature.description}
              </p>
              
              <div className="space-y-2">
                {feature.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-saudi-green" />
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-almarai text-xs`}>{point}</span>
                  </div>
                ))}
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-4 font-almarai font-bold text-sm ${isDarkMode ? 'text-white hover:text-saudi-gold' : 'text-saudi-green hover:text-saudi-gold'}`}
              >
                اعرف أكثر ←
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* المميزات الإضافية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-3xl p-8 ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50'}`}
        >
          <h3 className={`text-3xl font-almarai font-bold text-center ${titleText} mb-10`}>
            مميزات إضافية تجعلنا الأفضل
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="text-center group cursor-pointer"
              >
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-16 h-16 rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center group-hover:shadow-xl transition-all duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color} group-hover:scale-105 transition-transform duration-300`} />
                </div>
                <h4 className={`text-lg font-almarai font-bold ${titleText} mb-2`}>
                  {feature.title}
                </h4>
                <p className={`${bodyText} font-almarai text-sm`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;