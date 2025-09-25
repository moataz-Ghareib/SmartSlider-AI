import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Play, Pause, RotateCcw, Download, AudioWaveform as Waveform, MessageSquare, Zap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { hoorAPI } from '../services/hoorAPI';
import toast from 'react-hot-toast';

interface VoiceInteractionSectionProps {
  isDarkMode?: boolean;
}

const VoiceInteractionSection: React.FC<VoiceInteractionSectionProps> = ({ isDarkMode = false }) => {
  const [voiceState, setVoiceState] = useState<'ready' | 'recording' | 'processing' | 'playing' | 'completed'>('ready');
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [currentWave, setCurrentWave] = useState(0);

  // محاكاة مستويات الصوت
  useEffect(() => {
    if (voiceState === 'recording') {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [voiceState]);

  // تدوير الموجات الصوتية
  useEffect(() => {
    if (voiceState === 'recording' || voiceState === 'playing') {
      const interval = setInterval(() => {
        setCurrentWave(prev => (prev + 1) % 20);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [voiceState]);

  const handleVoiceAction = () => {
    switch (voiceState) {
      case 'ready':
        startDemoRecording();
        break;
      case 'recording':
        stopDemoRecording();
        break;
      case 'processing':
        setVoiceState('playing');
        break;
      case 'playing':
        setVoiceState('completed');
        break;
      case 'completed':
        setVoiceState('ready');
        break;
    }
  };

  const startDemoRecording = async () => {
    try {
      setVoiceState('recording');
      setTranscript('');
      setResponse('');
      
      // محاكاة التسجيل لمدة 3 ثوان
      setTimeout(async () => {
        const demoText = 'أريد إنشاء تطبيق توصيل طعام صحي في الرياض، يستهدف العائلات الشابة ذات الدخل المتوسط والعالي';
        setTranscript(demoText);
        setVoiceState('processing');
        
        try {
          // الحصول على رد من حور
          const hoorResponse = await hoorAPI.chat(demoText);
          setResponse(hoorResponse);
          setVoiceState('playing');
          
          // تشغيل الرد صوتياً
          await hoorAPI.speak(hoorResponse);
          setVoiceState('completed');
        } catch (error) {
          console.error('Demo chat error:', error);
          setResponse('ممتاز! فكرة توصيل الطعام الصحي في الرياض لها إمكانيات كبيرة. السوق ينمو بمعدل 15% سنوياً والطلب على الطعام الصحي يزداد. سأحتاج لبعض التفاصيل: ما هو رأس المال المتاح؟ وما نوع الطعام الصحي المستهدف؟ هل لديك خبرة سابقة في هذا المجال؟');
          setVoiceState('completed');
        }
      }, 3000);
    } catch (error) {
      toast.error('خطأ في بدء التسجيل التجريبي');
      setVoiceState('ready');
    }
  };

  const stopDemoRecording = () => {
    setVoiceState('processing');
  };

  const getButtonContent = () => {
    switch (voiceState) {
      case 'ready':
        return { icon: Mic, text: 'ابدأ المحادثة', color: 'from-saudi-green to-saudi-gold' };
      case 'recording':
        return { icon: Pause, text: 'إيقاف التسجيل', color: 'from-red-500 to-red-600' };
      case 'processing':
        return { icon: RotateCcw, text: 'يعالج الصوت...', color: 'from-yellow-500 to-orange-500' };
      case 'playing':
        return { icon: Volume2, text: 'يشغل الرد...', color: 'from-blue-500 to-purple-500' };
      case 'completed':
        return { icon: Play, text: 'محادثة جديدة', color: 'from-saudi-green to-saudi-gold' };
    }
  };

  const buttonContent = getButtonContent();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-saudi-green/5 to-saudi-gold/5 relative overflow-hidden">
      {/* صورة خلفية للتقنية */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-saudi-green/5 to-white/95 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="تقنيات التفاعل الصوتي والذكاء الاصطناعي المتقدم"
          className="w-full h-full object-cover opacity-15 mix-blend-multiply"
          loading="lazy"
          decoding="async"
          width="1920"
          height="1080"
        />
      </div>
      
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden z-5">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 bg-saudi-green/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-40 h-40 bg-saudi-gold/10 rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-20">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-almarai font-bold text-gray-900 mb-6">
            🎙️ المحادثة الصوتية المتقدمة
          </h2>
          <p className="text-xl text-gray-600 font-almarai max-w-2xl mx-auto">
            تفاعل طبيعي بالصوت مع مستشارك الذكي — بدون كتابة، بدون تعقيد
          </p>
        </motion.div>

        {/* واجهة المحادثة الصوتية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-12"
        >
          {/* مؤشر الحالة */}
          <div className="text-center mb-8">
            <motion.div 
              className="inline-flex items-center bg-gray-100 rounded-full px-6 py-2 mb-4"
              animate={voiceState !== 'ready' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div 
                className={`w-3 h-3 rounded-full mr-3 ${
                  voiceState === 'ready' ? 'bg-gray-400' :
                  voiceState === 'recording' ? 'bg-red-500' :
                  voiceState === 'processing' ? 'bg-yellow-500' :
                  voiceState === 'playing' ? 'bg-blue-500' :
                  'bg-green-500'
                }`}
                animate={voiceState !== 'ready' ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="font-almarai font-medium text-gray-700">
                {voiceState === 'ready' && 'جاهز للتسجيل'}
                {voiceState === 'recording' && 'يسجل الآن...'}
                {voiceState === 'processing' && 'يعالج الصوت...'}
                {voiceState === 'playing' && 'يشغل الرد...'}
                {voiceState === 'completed' && 'انتهى ✓'}
              </span>
            </motion.div>
          </div>

          {/* زر الميكروفون المركزي */}
          <div className="text-center mb-8">
            <motion.button
              onClick={handleVoiceAction}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-32 h-32 rounded-full bg-gradient-to-r ${buttonContent.color} shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden`}
            >
              <motion.div
                animate={voiceState === 'recording' ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: voiceState === 'recording' ? Infinity : 0, ease: "linear" }}
              >
                <buttonContent.icon className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              
              {/* موجات صوتية */}
              {voiceState === 'recording' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-32 h-32 border-4 border-white/30 rounded-full"
                      animate={{
                        scale: [1, 1.5, 2],
                        opacity: [0.7, 0.3, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.button>
            
            <motion.p 
              className="font-almarai font-bold text-lg text-gray-700 mt-4"
              animate={voiceState !== 'ready' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {buttonContent.text}
            </motion.p>
          </div>

          {/* مؤشر مستوى الصوت */}
          <AnimatePresence>
            {voiceState === 'recording' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-center gap-1 mb-6"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-saudi-green rounded-full transition-all duration-100"
                    animate={{
                      height: audioLevel > (i * 5) ? `${Math.random() * 40 + 10}px` : '5px',
                      opacity: audioLevel > (i * 5) ? [0.5, 1, 0.5] : 0.3
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* النص المُحوّل */}
          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-light-green rounded-2xl p-6 mb-6 text-right"
              >
                <div className="flex items-center justify-end gap-2 mb-3">
                  <h4 className="font-almarai font-bold text-saudi-green">
                    ما قلته:
                  </h4>
                  <MessageSquare className="h-5 w-5 text-saudi-green" />
                </div>
                <motion.p 
                  className="text-saudi-green font-almarai text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{transcript}"
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* رد المستشار */}
          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-tech-blue/10 rounded-2xl p-6 text-right"
              >
                <div className="flex items-center justify-end gap-3 mb-3">
                  <h4 className="font-almarai font-bold text-tech-blue">
                    رد المستشار الذكي:
                  </h4>
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-saudi-green to-saudi-gold rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-white font-bold text-sm">AI</span>
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-tech-blue font-almarai text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {response}
                </motion.p>
                
                <AnimatePresence>
                  {voiceState === 'completed' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end gap-3 mt-4"
                    >
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-saudi-green text-white px-4 py-2 rounded-lg font-almarai text-sm hover:bg-saudi-green/90 transition-colors flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        حفظ المحادثة
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.location.hash = 'flow';
                          }
                        }}
                        className="bg-tech-blue text-white px-4 py-2 rounded-lg font-almarai text-sm hover:bg-tech-blue/90 transition-colors"
                      >
                        متابعة التحليل
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* مميزات التفاعل الصوتي */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🗣️',
              title: 'تفاعل طبيعي',
              description: 'تحدث بلهجتك الطبيعية — نحن نفهم جميع اللهجات السعودية',
              color: 'from-saudi-green to-saudi-gold'
            },
            {
              icon: '⚡',
              title: 'استجابة فورية',
              description: 'تحليل وردود فورية مع ملخص مكتوب لكل محادثة',
              color: 'from-tech-blue to-saudi-green'
            },
            {
              icon: '💾',
              title: 'حفظ تلقائي',
              description: 'جميع محادثاتك محفوظة ويمكن الرجوع إليها في أي وقت',
              color: 'from-saudi-gold to-tech-blue'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-2xl">{feature.icon}</span>
              </motion.div>
              <h3 className="font-almarai font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-almarai text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* إحصائيات الصوت */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-almarai font-bold text-center text-gray-800 mb-8">
            إحصائيات المحادثة الصوتية
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { value: '98%', label: 'دقة التحويل', icon: Zap, color: 'text-saudi-green' },
              { value: '15', label: 'لغة ولهجة', icon: Globe, color: 'text-saudi-gold' },
              { value: '2.3s', label: 'متوسط الاستجابة', icon: RotateCcw, color: 'text-tech-blue' },
              { value: '24/7', label: 'متاح دائماً', icon: Volume2, color: 'text-green-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                </motion.div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-almarai text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceInteractionSection;