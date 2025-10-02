import React from 'react';
import { BookOpen, Library, FileText, Scale, TrendingUp, Star, GraduationCap, Users, ClipboardCheck, Award } from 'lucide-react';

interface AcademyPageProps {
  onBack?: () => void;
}

const AcademyPage: React.FC<AcademyPageProps> = ({ onBack }) => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-saudi-green to-saudi-gold text-white px-6 py-3 rounded-2xl shadow-lg">
            <BookOpen className="h-5 w-5" />
            <h1 className="text-2xl md:text-3xl font-almarai font-bold">SmartStart Academy</h1>
          </div>
          <p className="mt-4 text-gray-600 font-almarai text-lg">
            منصة تعليمية متكاملة تهدف إلى تمكين رواد الأعمال والمستثمرين في السوق السعودي بالمعرفة والمهارات اللازمة لبناء مشاريع ناجحة ومستدامة.
          </p>
        </div>
        {/* محتوى تفصيلي */}
        <div className="space-y-10">
          {/* مكتبة المحتوى العربي */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Library className="h-6 w-6 text-saudi-green" />
              <h2 className="text-xl font-almarai font-bold text-gray-800">📚 مكتبة المحتوى العربي</h2>
            </div>

            {/* المقالات المتخصصة */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-saudi-green">
                <FileText className="h-4 w-4" />
                <h3 className="font-almarai font-bold">1) المقالات المتخصصة</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">أ) ريادة الأعمال والابتكار</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>استراتيجيات بناء المشاريع الناشئة في المملكة</li>
                    <li>كيفية تحويل الفكرة إلى منتج قابل للتطبيق (MVP)</li>
                    <li>أساليب الابتكار في نماذج الأعمال التقليدية</li>
                    <li>إدارة النمو السريع للشركات الناشئة</li>
                    <li>التحول الرقمي للمؤسسات الصغيرة والمتوسطة</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ب) التمويل والاستثمار</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>دليل شامل لمصادر التمويل في السعودية</li>
                    <li>كيفية إعداد خطة مالية احترافية لجذب المستثمرين</li>
                    <li>استراتيجيات التقييم المالي للشركات الناشئة</li>
                    <li>التمويل الجماعي: الفرص والتحديات</li>
                    <li>برامج الدعم الحكومي ومنصات التمويل المتاحة</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ج) التسويق الرقمي والمبيعات</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>بناء الهوية التجارية في السوق السعودي</li>
                    <li>استراتيجيات التسويق عبر وسائل التواصل الاجتماعي</li>
                    <li>تحسين محركات البحث (SEO) للمواقع العربية</li>
                    <li>أساليب التسويق بالمحتوى الفعّال</li>
                    <li>تحليل سلوك العملاء وبناء قاعدة عملاء مخلصين</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">د) القيادة وإدارة الفرق</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>بناء فريق عمل متميز في بيئة العمل السعودية</li>
                    <li>مهارات القيادة الفعّالة لرواد الأعمال</li>
                    <li>إدارة الفرق عن بُعد وثقافة العمل الهجين</li>
                    <li>تطوير المواهب والاحتفاظ بها</li>
                    <li>حل النزاعات وبناء بيئة عمل إيجابية</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* دليل القوانين السعودية */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-tech-blue">
                <Scale className="h-4 w-4" />
                <h3 className="font-almarai font-bold">2) دليل القوانين السعودية</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">أ) تأسيس الشركات</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>أنواع الكيانات القانونية المتاحة</li>
                    <li>خطوات التسجيل في وزارة التجارة</li>
                    <li>متطلبات الترخيص حسب النشاط</li>
                    <li>إجراءات فتح الحساب البنكي التجاري</li>
                    <li>التسجيل في الزكاة والضريبة والجمارك</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ب) الأنظمة الضريبية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>نظام ضريبة القيمة المضافة (15%)</li>
                    <li>ضريبة الدخل على الشركات الأجنبية</li>
                    <li>الزكاة الشرعية: الاحتساب والإقرار</li>
                    <li>الإعفاءات الضريبية للشركات الناشئة</li>
                    <li>التزامات التقارير الدورية</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ج) قوانين العمل والعمالة</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>نظام العمل السعودي وحقوق الموظفين</li>
                    <li>برنامج نطاقات وتوطين الوظائف</li>
                    <li>عقود العمل والتأمينات الاجتماعية</li>
                    <li>تنظيم ساعات العمل والإجازات</li>
                    <li>إنهاء عقود العمل والتعويضات</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">د) حماية الملكية الفكرية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>تسجيل العلامات التجارية والشعارات</li>
                    <li>براءات الاختراع وحقوق التأليف</li>
                    <li>حماية الأسرار التجارية</li>
                    <li>اتفاقيات عدم الإفصاح (NDA)</li>
                    <li>إجراءات دعاوى انتهاك الملكية الفكرية</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 md:col-span-2">
                  <p className="font-almarai font-bold mb-2">هـ) التجارة الإلكترونية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>نظام التجارة الإلكترونية السعودي</li>
                    <li>متطلبات ترخيص المتاجر الإلكترونية</li>
                    <li>حماية المستهلك في البيئة الرقمية</li>
                    <li>تنظيم الدفع الإلكتروني والخدمات المالية</li>
                    <li>قوانين الخصوصية وحماية البيانات</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* قصص النجاح المحلية */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-saudi-gold">
                <Star className="h-4 w-4" />
                <h3 className="font-almarai font-bold">3 قصص النجاح المحلية</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">قصة 1: من فكرة إلى يونيكورن</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>الشركة: تطبيق توصيل محلي بدأ من الرياض</li>
                    <li>التحدي: المنافسة الشديدة في قطاع التوصيل</li>
                    <li>الحل: جودة وسرعة وخدمة عملاء استثنائية</li>
                    <li>النتيجة: تقييم مليار دولار خلال 3 سنوات</li>
                    <li>الدروس: فهم السوق المحلي والتكيف السريع</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">قصة 2: ريادية شابة تحدّت الصعاب</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>رائدة أعمال سعودية في التقنية المالية</li>
                    <li>بداية من المنزل برأس مال محدود</li>
                    <li>تمويل تأسيسي من حاضنة أعمال</li>
                    <li>توسع إقليمي وشراكات مع بنوك</li>
                    <li>إلهام: تمكين المرأة في ريادة الأعمال</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">قصة 3: التحول من التقليدي إلى الرقمي</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>تحويل محل عائلي إلى منصة إلكترونية</li>
                    <li>التحدي: مقاومة التغيير والتكاليف الأولية</li>
                    <li>الاستراتيجية: التدرج مع الحفاظ على الهوية</li>
                    <li>النتائج: زيادة المبيعات 400% وتوسع</li>
                    <li>العبرة: التقنية أداة للنمو لا بديل للجودة</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* اتجاهات السوق */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-saudi-green">
                <TrendingUp className="h-4 w-4" />
                <h3 className="font-almarai font-bold">4) اتجاهات السوق</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">أ) تحليل القطاعات الواعدة</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>التقنية المالية (FinTech)</li>
                    <li>الصحة الرقمية والتطبيب عن بُعد</li>
                    <li>التجارة الإلكترونية والتجزئة الذكية</li>
                    <li>الذكاء الاصطناعي والأتمتة</li>
                    <li>الطاقة المتجددة والاستدامة</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ب) مؤشرات الاستثمار</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>حجم الاستثمارات ربع سنويًا</li>
                    <li>معدلات النمو حسب القطاعات</li>
                    <li>التوزيع الجغرافي داخل المملكة</li>
                    <li>مقارنات إقليمية وعالمية</li>
                    <li>توقعات الخبراء للعام القادم</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ج) سلوك المستهلك السعودي</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>أنماط الشراء الرقمي والتفضيلات</li>
                    <li>تأثير وسائل التواصل على القرار</li>
                    <li>الولاء للعلامات المحلية</li>
                    <li>توجهات الجيل Z وألفا</li>
                    <li>التغيرات الموسمية والمناسبات</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">د) التحولات التنظيمية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>تحديثات رؤية 2030 وتأثيرها</li>
                    <li>تشريعات جديدة وفرص مصاحبة</li>
                    <li>برامج دعم حكومي مستحدثة</li>
                    <li>المبادرات الاقتصادية الكبرى</li>
                    <li>الاتجاه نحو الاقتصاد الأخضر</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* برامج التدريب التفاعلية */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-6 w-6 text-saudi-gold" />
              <h2 className="text-xl font-almarai font-bold text-gray-800">🎓 برامج التدريب التفاعلية</h2>
            </div>

            {/* الدورات المخصصة - المسارات */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3 text-tech-blue">
                <Users className="h-4 w-4" />
                <h3 className="font-almarai font-bold">1) الدورات المخصصة</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">المسار الأول: من الفكرة إلى التنفيذ (8 أسابيع)</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>الأسبوع 1-2: تطوير الفكرة (SWOT، المنافسين، UVP، Buyer Persona)</li>
                    <li>الأسبوع 3-4: نموذج العمل (Canvas، التسعير، سلسلة القيمة، التوقعات المالية)</li>
                    <li>الأسبوع 5-6: بناء المنتج الأولي (Lean، MVP، اختبار الفرضيات، التحسين)</li>
                    <li>الأسبوع 7-8: الإطلاق والنمو (GTM، التسويق، KPIs، التوسع)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">المسار الثاني: التمويل الذكي (6 أسابيع)</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>خيارات التمويل، Pitch Deck، التفاوض على الشروط</li>
                    <li>إدارة العلاقة مع المستثمرين والتقارير</li>
                    <li>التخطيط للجولات التمويلية التالية</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">المسار الثالث: التسويق الرقمي المتقدم (10 أسابيع)</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>استراتيجية المحتوى والسرد القصصي</li>
                    <li>SEM، إعلانات السوشيال، البريد والأتمتة</li>
                    <li>Analytics وتحسين الحملات، المؤثرين وبناء المجتمع</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">المسار الرابع: القيادة وبناء الفرق (4 أسابيع)</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>أساسيات القيادة الريادية</li>
                    <li>التوظيف والاحتفاظ بالمواهب</li>
                    <li>الثقافة المؤسسية وإدارة الأداء</li>
                    <li>التواصل الفعّال وحل المشكلات، القيادة في الأزمات</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* الورش العمل الافتراضية */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3 text-saudi-green">
                <BookOpen className="h-4 w-4" />
                <h3 className="font-almarai font-bold">2) الورش العمل الافتراضية</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ورش شهرية متخصصة (جلسة واحدة - 3 ساعات)</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>يناير: إعداد خطة العمل الاحترافية</li>
                    <li>فبراير: التسويق بالمحتوى</li>
                    <li>مارس: التفاوض مع المستثمرين</li>
                    <li>أبريل: التحليل المالي</li>
                    <li>مايو: تجربة المستخدم (UX)</li>
                    <li>يونيو: البيع الاستشاري</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ورش ربع سنوية موسعة (يومان - 6 ساعات/يوم)</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>الربع 1: بناء الفريق المثالي</li>
                    <li>الربع 2: الابتكار والتفكير التصميمي</li>
                    <li>الربع 3: التوسع والنمو</li>
                    <li>الربع 4: إدارة الأزمات</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* اختبارات التقييم */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3 text-saudi-green">
                <ClipboardCheck className="h-4 w-4" />
                <h3 className="font-almarai font-bold">3) اختبارات التقييم</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">أ) ما قبل الدورة</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>تحديد المستوى وتخصيص المحتوى</li>
                    <li>15-20 سؤال (اختيار متعدد، صح/خطأ)</li>
                    <li>المدة: 15 دقيقة</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ب) تقدمية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>تقييم بعد كل وحدة</li>
                    <li>أسئلة تطبيقية وحالات قصيرة</li>
                    <li>علامة النجاح: 70% فأكثر</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">ج) الاختبار النهائي</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>شامل لجميع المحاور</li>
                    <li>40-50 سؤال + دراسة حالة</li>
                    <li>المدة: 90 دقيقة — النجاح 75%</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 md:col-span-3">
                  <p className="font-almarai font-bold mb-2">د) تقييمات المشاريع العملية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>مشروع نهائي بمعايير تقييم واضحة</li>
                    <li>مراجعة خبراء وتغذية راجعة تفصيلية</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* شهادات الإتمام */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3 text-saudi-gold">
                <Award className="h-4 w-4" />
                <h3 className="font-almarai font-bold">4) شهادات الإتمام</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">الشهادة البرونزية - الأساسية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>إتمام دورة واحدة</li>
                    <li>حضور 80% من الجلسات</li>
                    <li>اجتياز النهائي 75%</li>
                    <li>صالحة سنتين</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">الشهادة الفضية - المتقدمة</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>إتمام 3 دورات مختلفة</li>
                    <li>حضور ورشتين على الأقل</li>
                    <li>مشروع تطبيقي معتمد</li>
                    <li>صالحة 3 سنوات</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">الشهادة الذهبية - الاحترافية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>مسار كامل (5 دورات+)</li>
                    <li>حضور جميع الورش الربع سنوية</li>
                    <li>دراسة حالة شاملة وتقييم 90%</li>
                    <li>المشاركة في الإرشاد Mentorship</li>
                    <li>صالحة 5 سنوات</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">شهادة الخبير المعتمد</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>إتمام جميع المسارات التعليمية</li>
                    <li>مساهمة بمحتوى تعليمي وقيادة ورشة</li>
                    <li>سجل مشاريع ناجحة وتوصيات خبراء</li>
                    <li>صالحة مدى الحياة مع تحديث سنوي</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* آليات الدعم والمتابعة */}
            <div className="mb-8">
              <h3 className="font-almarai font-bold text-gray-800 mb-3">⚙️ آليات الدعم والمتابعة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">منتدى النقاش المجتمعي</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>تفاعل مع المدربين والخبراء</li>
                    <li>شبكة تواصل بين رواد الأعمال</li>
                    <li>مشاركة التجارب والنصائح</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">جلسات الإرشاد الفردية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>حجز استشارة خاصة</li>
                    <li>متابعة تقدم المشروع</li>
                    <li>توجيه مخصص</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">المكتبة الرقمية</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>وصول غير محدود للموارد</li>
                    <li>تحديثات دورية للمحتوى</li>
                    <li>نماذج وقوالب جاهزة</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="font-almarai font-bold mb-2">تطبيق الهاتف المحمول</p>
                  <ul className="list-disc pr-5 text-sm text-gray-700 font-almarai space-y-1">
                    <li>التعلم بأي وقت ومكان</li>
                    <li>تنبيهات الفعاليات والورش</li>
                    <li>تتبع التقدم والإنجازات</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* مؤشرات النجاح */}
            <div>
              <h3 className="font-almarai font-bold text-gray-800 mb-3">📊 مؤشرات النجاح</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-light-green rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-saudi-green mb-1">85%</div>
                  <div className="text-sm text-gray-700 font-almarai">معدل إتمام الدورات</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-saudi-gold mb-1">4.7/5</div>
                  <div className="text-sm text-gray-700 font-almarai">رضا المتدربين</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-tech-blue mb-1">42%</div>
                  <div className="text-sm text-gray-700 font-almarai">الحصول على تمويل</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-saudi-green mb-1">68%</div>
                  <div className="text-sm text-gray-700 font-almarai">نجاح المشاريع بعد عامين</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center col-span-2 md:col-span-1">
                  <div className="text-2xl font-bold text-saudi-green mb-1">15,000+</div>
                  <div className="text-sm text-gray-700 font-almarai">شبكة خريجين نشطة</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        {onBack && (
          <div className="text-center mt-10">
            <button
              onClick={onBack}
              className="bg-white border-2 border-saudi-green text-saudi-green px-6 py-3 rounded-xl font-almarai font-bold hover:bg-light-green transition-colors"
            >
              العودة
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AcademyPage;


