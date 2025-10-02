import React, { useState, useEffect } from 'react';
import { Menu, User, Settings, Bell, Search, LogIn, ChevronDown, LogOut, Shield, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../stores';
import { useUIStore } from '../stores';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import VoicePersistentToggle from './VoicePersistentToggle';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onMenuToggle: () => void;
  onAuthModalOpen: () => void;
  onNotificationOpen: () => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onViewChange, 
  onMenuToggle, 
  onAuthModalOpen,
  onNotificationOpen,
  isDarkMode, 
  onDarkModeToggle 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notificationCount] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { voiceEnabled, toggleVoiceEnabled } = useUIStore();
  const { user, signOut } = useAuthStore();

  const navItems = [
    { id: 'home', label: 'الرئيسية', active: currentView === 'home' },
    { id: 'flow', label: 'بدء مشروع', active: currentView === 'flow' },
    { id: 'dashboard', label: 'مشاريعي', active: currentView === 'dashboard', requireAuth: true },
    { id: 'pricing', label: 'التسعير', active: currentView === 'pricing' },
    { id: 'academy', label: 'الأكاديمية', active: currentView === 'academy' },
    { id: 'help', label: 'المساعدة', active: currentView === 'help' }
  ];

  const quickSearchResults = [
    'كيف أبدأ مشروع توصيل؟',
    'دراسة جدوى مطعم',
    'تمويل المشاريع الصغيرة',
    'متطلبات التراخيص التجارية'
  ];

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu') && !target.closest('.search-container')) {
        setShowUserMenu(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleVoice = async () => {
    const next = !voiceEnabled;
    toggleVoiceEnabled();
    try {
      const { analytics } = await import('../lib/analytics');
      analytics.trackVoiceToggle(next);
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  };

  const handleSearch = (term: string) => {
    if (term.trim()) {
      // تنفيذ البحث
      console.log('البحث عن:', term);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      onViewChange('home');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className={`${isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-100'} backdrop-blur-md shadow-sm border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo والعنوان */}
          <div className="flex items-center space-x-reverse space-x-4">
            <button
              onClick={onMenuToggle}
              className={`p-2 rounded-xl text-saudi-green hover:bg-light-green transition-colors lg:hidden ${isDarkMode ? 'hover:bg-gray-700' : ''}`}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="cursor-pointer flex items-center gap-3" onClick={() => onViewChange('home')}>
              {/* Replace SVG logo with PNG logo */}
              <img 
                src="/smartstartai_final_logo.png" 
                alt="SmartStartAI Logo" 
                className="h-10 w-10 rounded-xl shadow-sm"
              />
              <div>
                <h1 className={`text-xl font-almarai font-bold text-transparent bg-clip-text bg-gradient-to-l from-saudi-green to-saudi-gold`}>
                  SmartStartAI
                </h1>
                
              </div>
            </div>
          </div>

          {/* شريط التنقل */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-8">
            {navItems.map((item) => {
              // إخفاء العناصر التي تتطلب تسجيل دخول إذا لم يكن المستخدم مسجلاً
              if (item.requireAuth && !user) return null;
              
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onViewChange(item.id);
                  }}
                  className={`font-almarai font-medium transition-all duration-300 relative py-2 px-4 rounded-lg ${
                    item.active
                      ? 'text-saudi-green bg-light-green'
                      : `${isDarkMode ? 'text-gray-300 hover:text-saudi-green hover:bg-gray-700' : 'text-gray-700 hover:text-saudi-green hover:bg-light-green/50'}`
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  {item.label}
                  {item.active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-saudi-green rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* أدوات المستخدم */}
          <div className="flex items-center space-x-reverse space-x-4">
            {/* البحث */}
            <div className="search-container relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="البحث"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* نافذة البحث المنسدلة */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50"
                  >
                    <div className="relative mb-4">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ابحث عن خدمة، قطاع، أو سؤال..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                        className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl font-almarai text-right focus:border-saudi-green focus:outline-none"
                        autoFocus
                      />
                    </div>
                    
                    {/* اقتراحات البحث السريع */}
                    <div>
                      <h4 className="font-almarai font-bold text-gray-800 mb-2 text-right text-sm">
                        اقتراحات سريعة:
                      </h4>
                      <div className="space-y-1">
                        {quickSearchResults.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(suggestion)}
                            className="w-full text-right p-2 hover:bg-gray-50 rounded-lg font-almarai text-sm text-gray-700 hover:text-saudi-green transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* الإشعارات */}
            <VoicePersistentToggle />
            
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={onDarkModeToggle} />
            
            {/* Enhanced Notifications Button */}
            <button 
              onClick={onNotificationOpen}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors relative flex items-center justify-center"
              aria-label="الإشعارات"
            >
              <div className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <motion.div
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="absolute -top-2 -right-2 w-6 h-6 bg-saudi-dark rounded-full flex items-center justify-center shadow-lg"
                 >
                    <span className="text-white text-xs font-bold">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  </motion.div>
                )}
              </div>
            </button>

            {/* المستخدم أو أزرار التسجيل */}
            {user ? (
              <div className="user-menu relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  <div className="hidden md:block text-right">
                    <p className="font-almarai font-bold text-gray-800 text-sm">
                      {user.name}
                    </p>
                    <p className="font-almarai text-gray-600 text-xs">
                      باقة {user.subscription_type === 'free' ? 'مجانية' : 
                            user.subscription_type === 'growth' ? 'النمو' : 'المؤسسات'}
                      {user.auth_provider && user.auth_provider !== 'email' && (
                        <span className="mr-1">
                          {user.auth_provider === 'google' ? '🔗 Google' : '🔗 Apple'}
                        </span>
                      )}
                    </p>
                  </div>
                  {user.avatar_url ? (
                    <img 
                      src={user.avatar_url} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-saudi-green"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-saudi-green flex items-center justify-center text-white font-bold text-sm">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {/* قائمة المستخدم المنسدلة */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50"
                    >
                      {/* معلومات المستخدم */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-almarai font-bold text-gray-800 text-right">
                          {user.name}
                        </p>
                        <p className="font-almarai text-gray-600 text-sm text-right">
                          {user.email}
                        </p>
                      </div>

                      {/* عناصر القائمة */}
                      {[
                        { id: 'profile', label: 'الملف الشخصي', icon: User },
                        { id: 'dashboard', label: 'مشاريعي', icon: BarChart3 },
                        { id: 'settings', label: 'الإعدادات', icon: Settings },
                        ...(user?.role === 'admin' || user?.subscription_type === 'enterprise' || user?.email?.includes('admin') ? 
                          [{ id: 'admin', label: 'لوحة الأدمن', icon: Shield }] : [])
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            // توجيه حسب العنصر المختار في قائمة المستخدم
                            switch (item.id) {
                              case 'admin':
                                onViewChange('admin');
                                break;
                              case 'dashboard':
                                onViewChange('dashboard');
                                break;
                              case 'settings':
                                onViewChange('profile');
                                break;
                              case 'profile':
                              default:
                                onViewChange('profile');
                                break;
                            }
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-3 text-right font-almarai hover:bg-gray-50 transition-colors flex items-center gap-3"
                        >
                          <item.icon className="h-5 w-5 text-gray-600" />
                          <span className="flex-1">{item.label}</span>
                        </button>
                      ))}

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleSignOut}
                          className="w-full px-4 py-3 text-right font-almarai hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                        >
                          <LogOut className="h-5 w-5" />
                          <span className="flex-1">تسجيل الخروج</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={onAuthModalOpen}
                  className="flex items-center gap-2 bg-saudi-green text-white px-4 py-2 rounded-lg font-almarai font-bold hover:bg-saudi-green/90 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  تسجيل الدخول
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
    </header>
  );
};

export default Header;