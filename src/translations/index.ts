export type Language = 'ar' | 'en';

interface Translation {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  stats: {
    models: {
      title: string;
      subtitle: string;
    };
    conversations: {
      title: string;
      subtitle: string;
    };
    uptime: {
      title: string;
      subtitle: string;
    };
    support: {
      title: string;
      subtitle: string;
    };
  };
  nav: {
    start: string;
    demo: string;
  };
}

export const translations: Record<Language, Translation> = {
  ar: {
    hero: {
      title: 'قوة الذكاء الاصطناعي',
      subtitle: 'في متناول يدك',
      description: 'منصة ذكاء اصطناعي شاملة تجمع أقوى النماذج العالمية في مكان واحد.',
      cta: {
        primary: 'ابدأ مجاناً',
        secondary: 'شاهد العرض',
      },
    },
    stats: {
      models: {
        title: '10+',
        subtitle: 'نماذج AI',
      },
      conversations: {
        title: '1M+',
        subtitle: 'محادثة',
      },
      uptime: {
        title: '99.9%',
        subtitle: 'وقت التشغيل',
      },
      support: {
        title: '24/7',
        subtitle: 'دعم فني',
      },
    },
    nav: {
      start: 'ابدأ الآن',
      demo: 'شاهد العرض التوضيحي',
    },
  },
  en: {
    hero: {
      title: 'Enterprise AI',
      subtitle: 'Unified Intelligence',
      description:
        "Experience the future of AI with our comprehensive platform integrating the world's most advanced models.",
      cta: {
        primary: 'Get Started',
        secondary: 'Learn More',
      },
    },
    stats: {
      models: {
        title: '10+',
        subtitle: 'AI Models',
      },
      conversations: {
        title: '1M+',
        subtitle: 'Conversations',
      },
      uptime: {
        title: '99.9%',
        subtitle: 'Uptime',
      },
      support: {
        title: '24/7',
        subtitle: 'Support',
      },
    },
    nav: {
      start: 'Start Now',
      demo: 'Watch Demo',
    },
  },
};
