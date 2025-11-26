/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  ZORO-AI Translations - Bilingual Support                   ║
 * ║  Complete translations for English and Arabic                ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

export type Language = 'en' | 'ar';

export const translations = {
  en: {
    hero: {
      title: 'Experience the Future of',
      subtitle: 'Artificial Intelligence',
      description:
        'ZORO-AI brings you the most advanced AI conversation experience, combining cutting-edge technology with intuitive design.',
      badge: 'Powered by Advanced AI',
      cta: {
        primary: 'Start Chatting',
        secondary: 'Explore Features',
      },
    },
    stats: {
      users: { title: '10M+', subtitle: 'Users' },
      accuracy: { title: '99.9%', subtitle: 'Accuracy' },
      support: { title: '24/7', subtitle: 'Support' },
    },
    features: {
      title: 'Powered by Advanced AI',
      models: ['GPT-4 Turbo', 'Claude 3 Sonnet', 'Gemini Pro'],
      aiModels: { title: 'Advanced AI Models', description: 'Access GPT-4, Claude, and Gemini.' },
      realTime: { title: 'Real-time Processing', description: 'Lightning-fast responses.' },
      security: { title: 'Enterprise Security', description: 'Bank-grade encryption.' },
      multiModal: { title: 'Multi-modal Support', description: 'Text, code, and images.' },
      availability: { title: '24/7 Availability', description: 'Always accessible.' },
      api: { title: 'API Integration', description: 'Seamless integration.' },
    },
    chat: {
      header: {
        newChat: 'New Chat',
        settings: 'Settings',
        clearChat: 'Clear Chat',
      },
      empty: {
        title: 'ZORO-AI',
        subtitle: 'Start a new conversation with AI',
        placeholder: 'Type your message here...',
      },
      actions: {
        send: 'Send',
        clear: 'Clear Chat',
        thinking: 'Thinking...',
      },
      shortcuts: {
        send: 'Press Enter to send, Shift+Enter for new line',
      },
      error: 'Sorry, an error occurred. Please try again.',
      confirmClear: 'Are you sure you want to clear the chat?',
    },
    footer: {
      copyright: 'All rights reserved.',
    },
  },
  ar: {
    hero: {
      title: 'اختبر مستقبل',
      subtitle: 'الذكاء الاصطناعي',
      description:
        'ZORO-AI يقدم لك تجربة محادثة ذكاء اصطناعي متقدمة، يجمع بين أحدث التقنيات والتصميم البديهي.',
      badge: 'مدعوم بذكاء اصطناعي متقدم',
      cta: {
        primary: 'ابدأ المحادثة',
        secondary: 'استكشف الميزات',
      },
    },
    stats: {
      users: { title: '10م+', subtitle: 'مستخدم' },
      accuracy: { title: '99.9%', subtitle: 'دقة' },
      support: { title: '24/7', subtitle: 'دعم' },
    },
    features: {
      title: 'مدعوم بذكاء اصطناعي متقدم',
      models: ['GPT-4 Turbo', 'Claude 3 Sonnet', 'Gemini Pro'],
      aiModels: { title: 'نماذج ذكاء متقدمة', description: 'الوصول إلى GPT-4 و Claude و Gemini.' },
      realTime: { title: 'معالجة فورية', description: 'استجابات سريعة كالبرق.' },
      security: { title: 'أمان المؤسسات', description: 'تشفير بمستوى بنكي.' },
      multiModal: { title: 'دعم متعدد الوسائط', description: 'نصوص وأكواد وصور.' },
      availability: { title: 'متاح 24/7', description: 'دائماً في خدمتك.' },
      api: { title: 'تكامل API', description: 'تكامل سلس.' },
    },
    chat: {
      header: {
        newChat: 'محادثة جديدة',
        settings: 'الإعدادات',
        clearChat: 'مسح المحادثة',
      },
      empty: {
        title: 'ZORO-AI',
        subtitle: 'ابدأ محادثة جديدة مع الذكاء الاصطناعي',
        placeholder: 'اكتب رسالتك هنا...',
      },
      actions: {
        send: 'إرسال',
        clear: 'مسح المحادثة',
        thinking: 'جاري التفكير...',
      },
      shortcuts: {
        send: 'اضغط Enter للإرسال، Shift+Enter للسطر الجديد',
      },
      error: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
      confirmClear: 'هل أنت متأكد من مسح المحادثة؟',
    },
    footer: {
      copyright: 'جميع الحقوق محفوظة.',
    },
  },
} as const;
