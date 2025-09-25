import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Twitter,
  Linkedin,
  Instagram,
  Youtube
} from 'lucide-react';
// تم تبسيط الفوتر وإزالة شرائط المعلومات الإضافية

interface FooterProps {
  isDarkMode?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  const footerSections = [
    {
      title: 'الخدمات',
      links: [
        { name: 'المحادثة الصوتية', href: '#voice' },
        { name: 'دراسة الجدوى', href: '#feasibility' },
        { name: 'التحليل المالي', href: '#financial' },
        { name: 'الاستشارات', href: '#consulting' }
      ]
    },
    {
      title: 'القطاعات',
      links: [
        { name: 'التجارة الإلكترونية', href: '#ecommerce' },
        { name: 'المطاعم والتوصيل', href: '#food' },
        { name: 'التقنية والبرمجة', href: '#tech' },
        { name: 'الصحة واللياقة', href: '#health' }
      ]
    },
    {
      title: 'الشركة',
      links: [
        { name: 'من نحن', href: '#about' },
        { name: 'فريق العمل', href: '#team' },
        { name: 'المدونة', href: '#blog' },
        { name: 'الوظائف', href: '#careers' },
        { name: 'الأخبار', href: '#news' }
      ]
    },
    {
      title: 'الدعم',
      links: [
        { name: 'مركز المساعدة', href: '#help' },
        { name: 'تواصل معنا', href: '#contact' },
        { name: 'الأسئلة الشائعة', href: '#faq' },
        { name: 'حالة النظام', href: '#status' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'تويتر', icon: Twitter, href: '#', color: 'hover:text-saudi-gold' },
    { name: 'لينكد إن', icon: Linkedin, href: '#', color: 'hover:text-saudi-gold' },
    { name: 'انستقرام', icon: Instagram, href: '#', color: 'hover:text-saudi-gold' },
    { name: 'يوتيوب', icon: Youtube, href: '#', color: 'hover:text-saudi-gold' }
  ];

  // تم تبسيط القسم وإزالة قائمة الاعتمادات غير المستخدمة

  return (
    <footer className={`${
      isDarkMode 
        ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-r from-saudi-green to-saudi-gold text-white'
    }`}>
      {/* القسم الرئيسي */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-14 relative z-10">
          {/* معلومات الشركة في الأعلى */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-almarai font-bold mb-4">
              SmartStartAI
            </h3>
            <p className={`${
              isDarkMode ? 'text-gray-200' : 'text-white/90'
            } font-almarai leading-relaxed mb-6 max-w-3xl mx-auto`}>
              مستشارك الذكي بصوتٍ سعودي لبدء مشروعك بثقة. نقدم دراسات جدوى احترافية 
              ومحادثة صوتية ذكية باللهجة السعودية لمساعدتك في تحقيق أحلامك التجارية.
            </p>
            
            {/* معلومات التواصل */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-saudi-gold" />
                <span className="font-almarai text-sm">920012345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-saudi-gold" />
                <span className="font-almarai text-sm">info@smartstart.sa</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-saudi-gold" />
                <span className="font-almarai text-sm">الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-saudi-gold" />
                <span className="font-almarai text-sm">دعم فني 24/7</span>
              </div>
            </div>

            {/* وسائل التواصل الاجتماعي */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-white/20 hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* جميع الروابط في خط واحد */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-wrap justify-center gap-1 text-sm">
              {footerSections.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                  {section.links.map((link, linkIndex) => (
                    <React.Fragment key={`${sectionIndex}-${linkIndex}`}>
                      <a
                        href={link.href}
                        className="text-white/80 hover:text-white font-almarai transition-colors duration-300 px-2 py-1"
                      >
                        {link.name}
                      </a>
                      {!(sectionIndex === footerSections.length - 1 && linkIndex === section.links.length - 1) && (
                        <span className="text-white/40">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* الحقوق */}
      <div className={`${isDarkMode ? 'bg-gray-800/60 border-t border-gray-600' : 'bg-black/20 border-t border-white/20'}`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-white/80'} font-almarai text-sm`}>
              © 2025 SmartStartAI. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.hash = 'privacy';
                  }
                }}
                className="text-white/80 hover:text-white font-almarai text-sm transition-colors"
              >
                سياسة الخصوصية
              </button>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.hash = 'terms';
                  }
                }}
                className="text-white/80 hover:text-white font-almarai text-sm transition-colors"
              >
                شروط الاستخدام
              </button>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.hash = 'cookies';
                  }
                }}
                className="text-white/80 hover:text-white font-almarai text-sm transition-colors"
              >
                سياسة الكوكيز
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;