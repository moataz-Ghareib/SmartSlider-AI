import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import AuthProvider from './components/AuthProvider';
import { Suspense, lazy } from 'react';
import { useAuth } from './hooks/useAuth';
import { Project, Analysis } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const Header = lazy(() => import('./components/Header'));
const HeroSection = lazy(() => import('./components/HeroSection'));
const FeaturesSection = lazy(() => import('./components/FeaturesSection'));
const HowItWorksSection = lazy(() => import('./components/HowItWorksSection'));
const VoiceInteractionSection = lazy(() => import('./components/VoiceInteractionSection'));
const SolutionsSection = lazy(() => import('./components/SolutionsSection'));
const SectorsSection = lazy(() => import('./components/SectorsSection'));
const TrustSection = lazy(() => import('./components/TrustSection'));
const VoiceButton = lazy(() => import('./components/VoiceButton'));
const ProjectFlow = lazy(() => import('./components/ProjectFlow'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const AnalysisResults = lazy(() => import('./components/AnalysisResults'));
const PricingPlans = lazy(() => import('./components/PricingPlans'));
const AuthModal = lazy(() => import('./components/AuthModal'));
const HelpCenter = lazy(() => import('./components/HelpCenter'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const NotificationCenter = lazy(() => import('./components/NotificationCenter'));
const LoadingScreen = lazy(() => import('./components/LoadingScreen'));
const Footer = lazy(() => import('./components/Footer'));
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const DataPrivacyModal = lazy(() => import('./components/DataPrivacyModal'));
const VoiceGreeting = lazy(() => import('./components/VoiceGreeting'));
const SectorPage = lazy(() => import('./components/SectorPage'));
const LocationAnalysisPage = lazy(() => import('./components/LocationAnalysisPage'));
const BlogIndex = lazy(() => import('./components/BlogIndex'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));

type ViewType = 'home' | 'flow' | 'dashboard' | 'results' | 'pricing' | 'help' | 'profile' | 'admin' | 'sector' | 'location-analysis' | 'blog' | 'post';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedBlogPost, setSelectedBlogPost] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Enable dark mode by default
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const { user, loading } = useAuth();

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'تطبيق توصيل طعام صحي',
      description: 'تطبيق لتوصيل الوجبات الصحية والعضوية للعائلات في الرياض',
      type: 'tech',
      city: 'الرياض',
      goal: 'development',
      status: 'completed',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'متجر إلكتروني للمنتجات اليدوية',
      description: 'منصة لبيع المنتجات اليدوية السعودية التراثية',
      type: 'commercial',
      city: 'جدة',
      goal: 'funding',
      status: 'analyzing',
      createdAt: new Date('2024-01-20')
    },
    {
      id: '3',
      title: 'مركز تدريب مهني متخصص',
      description: 'مركز لتدريب الشباب على المهارات التقنية والمهنية',
      type: 'service',
      city: 'الدمام',
      goal: 'analysis',
      status: 'saved',
      createdAt: new Date('2024-02-01')
    }
  ]);

  const sampleAnalysis: Analysis = {
    feasibility: {
      swot: 'نقاط القوة: تزايد الطلب على الطعام الصحي بنسبة 25% سنوياً، دعم الحكومة للمشاريع التقنية، خبرة الفريق في التطوير. الفرص: السوق السعودي ينمو بقوة، إمكانية التوسع للخليج. نقاط الضعف: المنافسة الشديدة مع اللاعبين الكبار، التكاليف العالية للتسويق الأولي. التهديدات: تغيير سلوك المستهلكين، التحديات اللوجستية.',
      market: 'السوق السعودي لتوصيل الطعام يقدر بـ 2.8 مليار ريال وينمو بمعدل 15% سنوياً. الرياض تمثل 35% من السوق، تليها جدة بـ 25%. الجمهور المستهدف: العائلات الشابة (25-45 سنة) ذات الدخل المتوسط والعالي. حجم السوق المتاح: 1.2 مليون عائلة في المدن الرئيسية.',
      costs: 'التكلفة الإجمالية للبدء: 750,000 ريال موزعة كالتالي: تطوير التطبيق (300,000 ريال)، التسويق الأولي (200,000 ريال)، رأس المال التشغيلي (150,000 ريال)، المعدات واللوجستيات (100,000 ريال). التكاليف الشهرية: 85,000 ريال شاملة الرواتب والتشغيل.',
      profitability: 'العائد المتوقع: 22-28% خلال السنة الثانية. نقطة التعادل متوقعة خلال الشهر 16-18. الإيرادات المتوقعة: السنة الأولى 1.2 مليون ريال، السنة الثانية 2.8 مليون ريال، السنة الثالثة 4.5 مليون ريال. هامش الربح الإجمالي: 35-40%.'
    },
    marketing: {
      campaigns: 'استراتيجية تسويقية متعددة القنوات: (1) التسويق الرقمي عبر سناب شات وانستقرام بميزانية 50,000 ريال شهرياً، (2) شراكات مع المؤثرين الصحيين (20 مؤثر متوسط)، (3) حملات جوجل وفيسبوك مستهدفة، (4) فعاليات ترويجية في المجمعات التجارية، (5) برنامج إحالة العملاء مع مكافآت.',
      audience: 'الجمهور الأساسي: العائلات الشابة (25-45 سنة) في الرياض وجدة، دخل شهري 8,000+ ريال، يستخدمون التطبيقات بانتظام. الجمهور الثانوي: المهنيين المشغولين، كبار السن الذين يفضلون الطعام الصحي. خصائص ديموغرافية: 60% إناث، 40% ذكور، 70% متزوجون مع أطفال.',
      platforms: 'المنصات الرئيسية: سناب شات (الأولوية العليا للجمهور السعودي)، انستقرام (للمحتوى المرئي)، تيك توك (للجيل الجديد)، تويتر (للتفاعل المباشر). المنصات الثانوية: يوتيوب (للمحتوى التعليمي)، لينكد إن (للشراكات B2B)، واتساب بزنس (لخدمة العملاء).'
    },
    financial: {
      revenue: 'نموذج الإيرادات متنوع: (1) عمولة على كل طلب 15-20%، (2) رسوم التوصيل 8-12 ريال، (3) اشتراكات شهرية مميزة 29 ريال، (4) إعلانات المطاعم الشريكة، (5) بيع البيانات التحليلية للمطاعم. الإيرادات المتوقعة: الشهر الأول 45,000 ريال، نهاية السنة الأولى 120,000 ريال شهرياً.',
      expenses: 'التكاليف التشغيلية الشهرية: رواتب الفريق (35,000 ريال)، تسويق رقمي (25,000 ريال)، خوادم وتقنية (8,000 ريال)، مكتب وإدارة (7,000 ريال)، تأمين ومصاريف قانونية (5,000 ريال)، احتياطي طوارئ (5,000 ريال). إجمالي التكاليف الشهرية: 85,000 ريال.',
      funding: 'خطة التمويل على مراحل: المرحلة الأولى (750,000 ريال) من المؤسسين والأصدقاء، المرحلة الثانية (2 مليون ريال) من مستثمرين ملائكة بعد 12 شهر، المرحلة الثالثة (8 مليون ريال) من صناديق رأس المال الجريء بعد 24 شهر. البدائل: قروض بنكية، برامج دعم حكومية، شراكات استراتيجية.'
    },
    risks: {
      technical: 'المخاطر التقنية: أعطال الخوادم (احتمالية 15%)، مشاكل أمان البيانات (10%)، صعوبات التكامل مع أنظمة المطاعم (25%)، بطء في الأداء أثناء الذروة (20%). خطط التخفيف: خوادم احتياطية، تشفير متقدم، فريق دعم تقني 24/7، اختبارات دورية للأداء.',
      market: 'مخاطر السوق: دخول منافسين كبار (احتمالية 40%)، تغيير سلوك المستهلكين (25%)، ركود اقتصادي (15%)، تغييرات تنظيمية (20%). استراتيجيات المواجهة: التركيز على الجودة والخدمة، تنويع الخدمات، بناء قاعدة عملاء مخلصة، مراقبة السوق المستمرة.',
      financial: 'المخاطر المالية: تأخير في الحصول على التمويل (30%)، ارتفاع التكاليف التشغيلية (35%)، انخفاض الإيرادات المتوقعة (25%)، مشاكل في التدفق النقدي (20%). خطط الطوارئ: تقليل النفقات غير الأساسية، البحث عن مصادر تمويل بديلة، إعادة تقييم نموذج الأعمال، بناء احتياطي نقدي.'
    }
  };

  // Event handlers
  const handleStartVoice = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentView('flow');
  };

  const handleStartText = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentView('flow');
  };

  const handleProjectSelect = (project: Project) => {
    setCurrentView('results');
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    toast.success('تم تسجيل الدخول بنجاح!');
  };

  const handleGreetingAction = (action: string) => {
    switch (action) {
      case 'voice':
        handleStartVoice();
        break;
      case 'text':
        handleStartText();
        break;
      case 'explore':
        setCurrentView('home');
        break;
    }
  };

  const handleSectorSelect = (sectorName: string) => {
    setSelectedSector(sectorName);
    setCurrentView('sector');
  };

  const handleBlogPostSelect = (slug: string) => {
    setSelectedBlogPost(slug);
    setCurrentView('post');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'flow':
        return (
          <ProtectedRoute>
            <ProjectFlow />
          </ProtectedRoute>
        );
      case 'dashboard':
        return (
          <ProtectedRoute>
            <Dashboard projects={projects} onProjectSelect={handleProjectSelect} />
          </ProtectedRoute>
        );
      case 'results':
        return (
          <ProtectedRoute>
            <AnalysisResults analysis={sampleAnalysis} projectTitle="تطبيق توصيل طعام صحي" />
          </ProtectedRoute>
        );
      case 'pricing':
        return <PricingPlans />;
      case 'help':
        return <HelpCenter />;
      case 'profile':
        return (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        );
      case 'admin':
        return (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        );
      case 'sector':
        return <SectorPage sectorName={selectedSector} onBack={() => setCurrentView('home')} />;
      case 'location-analysis':
        return (
          <ProtectedRoute>
            <LocationAnalysisPage onBack={() => setCurrentView('home')} />
          </ProtectedRoute>
        );
      case 'blog':
        return <BlogIndex onOpenPost={handleBlogPostSelect} />;
      case 'post':
        return <BlogPostPage slug={selectedBlogPost} onBack={() => setCurrentView('blog')} />;
      default:
        return (
          <>
            <HeroSection 
              onStartVoice={handleStartVoice}
              onStartText={handleStartText}
              isDarkMode={isDarkMode}
            />
            <FeaturesSection isDarkMode={isDarkMode} />
            <VoiceInteractionSection isDarkMode={isDarkMode} />
            <HowItWorksSection isDarkMode={isDarkMode} />
            <SolutionsSection onSectorSelect={handleSectorSelect} isDarkMode={isDarkMode} />
            <SectorsSection onSectorSelect={handleSectorSelect} isDarkMode={isDarkMode} />
            <TrustSection isDarkMode={isDarkMode} />
          </>
        );
    }
  };

  if (loading) {
    return <LoadingScreen message="جاري تحميل التطبيق..." showDetails={true} />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <div className={`min-h-screen font-almarai transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-dark-bg text-dark-text' 
            : 'bg-gray-50 text-gray-900'
        }`} dir="rtl">
          {/* الترحيب الصوتي */}
          <VoiceGreeting onActionSelect={handleGreetingAction} />
          
          {/* مؤشر حالة الاتصال */}
          <AnimatePresence>
            {!isOnline && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-0 left-0 right-0 bg-saudi-dark text-white text-center py-2 z-50"
              >
                لا يوجد اتصال بالإنترنت
              </motion.div>
            )}
          </AnimatePresence>

          {/* شريط التحميل */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-saudi-primary to-saudi-gold z-50"
              >
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* الهيدر */}
          <Header
            currentView={currentView}
            onViewChange={setCurrentView}
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            onAuthModalOpen={() => setIsAuthModalOpen(true)}
            onNotificationOpen={() => setIsNotificationOpen(true)}
            isDarkMode={isDarkMode}
            onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
          />

          {/* المحتوى الرئيسي */}
          <main className="relative">
            {renderCurrentView()}
          </main>

          {/* الفوتر */}
          <Footer isDarkMode={isDarkMode} />

          {/* الأزرار العائمة */}
          <VoiceButton />

          {/* النوافذ المنبثقة */}
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            mode={authMode}
            onModeChange={setAuthMode}
            onSuccess={handleAuthSuccess}
          />

          <NotificationCenter
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
          />

          <DataPrivacyModal
            isOpen={isPrivacyModalOpen}
            onClose={() => setIsPrivacyModalOpen(false)}
          />

          {/* Toast notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'Almarai',
                direction: 'rtl',
                textAlign: 'right'
              },
              success: {
                style: {
                  background: isDarkMode ? '#007A3D' : '#007A3D',
                  color: 'white',
                },
              },
              error: {
                style: {
                  background: isDarkMode ? '#004225' : '#004225',
                  color: 'white',
                },
              },
            }}
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
