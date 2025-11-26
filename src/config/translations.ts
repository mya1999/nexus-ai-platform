// Bilingual translations for NexusAI platform
export type Language = 'en' | 'ar';

export const translations = {
  en: {
    hero: {
      title: 'The Future of AI',
      subtitle: 'All in One Place',
      description:
        'Experience the power of multiple AI models unified in a single, elegant platform.',
      badge: 'Powered by Advanced AI',
      cta: {
        primary: 'Start Chatting',
        secondary: 'Learn More',
      },
    },
    stats: {
      models: { title: '10+', subtitle: 'AI Models' },
      conversations: { title: '1M+', subtitle: 'Conversations' },
      uptime: { title: '99.9%', subtitle: 'Uptime' },
      support: { title: '24/7', subtitle: 'Support' },
    },
    features: {
      aiModels: { title: 'Advanced AI Models', description: 'Access GPT-4, Claude, and Gemini.' },
      realTime: { title: 'Real-time Processing', description: 'Lightning-fast responses.' },
      security: { title: 'Enterprise Security', description: 'Bank-grade encryption.' },
      multiModal: { title: 'Multi-modal Support', description: 'Text, code, and images.' },
      availability: { title: '24/7 Availability', description: 'Always accessible.' },
      api: { title: 'API Integration', description: 'Seamless integration.' },
    },
    footer: {
      copyright: 'All rights reserved.',
    },
  },
  ar: {
    hero: {
      title: 'مستقبل الذكاء الاصطناعي',
      subtitle: 'كل شيء في مكان واحد',
      description: 'اختبر قوة نماذج الذكاء الاصطناعي المتعددة في منصة واحدة أنيقة.',
      badge: 'مدعوم بذكاء اصطناعي متقدم',
      cta: {
        primary: 'ابدأ المحادثة',
        secondary: 'اعرف المزيد',
      },
    },
    stats: {
      models: { title: '10+', subtitle: 'نموذج ذكاء' },
      conversations: { title: '1م+', subtitle: 'محادثة' },
      uptime: { title: '99.9%', subtitle: 'وقت التشغيل' },
      support: { title: '24/7', subtitle: 'دعم فني' },
    },
    features: {
      aiModels: { title: 'نماذج ذكاء متقدمة', description: 'الوصول إلى GPT-4 و Claude و Gemini.' },
      realTime: { title: 'معالجة فورية', description: 'استجابات سريعة كالبرق.' },
      security: { title: 'أمان المؤسسات', description: 'تشفير بمستوى بنكي.' },
      multiModal: { title: 'دعم متعدد الوسائط', description: 'نصوص وأكواد وصور.' },
      availability: { title: 'متاح 24/7', description: 'دائماً في خدمتك.' },
      api: { title: 'تكامل API', description: 'تكامل سلس.' },
    },
    footer: {
      copyright: 'جميع الحقوق محفوظة.',
    },
  },
} as const;
