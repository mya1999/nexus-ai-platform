# 🚀 دليل البدء السريع - NexusAI Platform

> دليل شامل لإعداد وتشغيل المشروع في دقائق

## ⚡ البدء السريع (3 خطوات)

### 1. استنساخ المشروع

```powershell
git clone https://github.com/mya1999/nexus-ai-platform.git
cd nexus-ai-platform
```

### 2. التفعيل التلقائي

```powershell
./scripts/auto-setup.ps1
```

### 3. التشغيل

```powershell
npm run dev
```

**الآن افتح**: `http://localhost:3000` 🎉

---

## 📋 المتطلبات

### ✅ المتطلبات الأساسية

| الأداة         | الإصدار المطلوب | التحقق            | التثبيت                                           |
| -------------- | --------------- | ----------------- | ------------------------------------------------- |
| **Node.js**    | ≥18.0.0 <23.0.0 | `node --version`  | [تحميل](https://nodejs.org/)                      |
| **npm**        | ≥9.0.0          | `npm --version`   | يأتي مع Node.js                                   |
| **Git**        | أحدث إصدار      | `git --version`   | [تحميل](https://git-scm.com/)                     |
| **PowerShell** | 7.0+            | `$PSVersionTable` | [تحميل](https://github.com/PowerShell/PowerShell) |

### 🎯 الأدوات الموصى بها

- **VS Code** - محرر الكود المفضل
- **GitHub Copilot** - مساعد البرمجة بالذكاء الاصطناعي
- **Docker** (اختياري) - للحاويات

---

## 🔧 الإعداد التفصيلي

### الخطوة 1: التثبيت الأساسي

```powershell
# تثبيت الاعتماديات
npm install

# نسخ ملف البيئة
cp .env.example .env.local
```

### الخطوة 2: إعداد مفاتيح API

افتح `.env.local` وأضف مفاتيح API:

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-...

# Google AI
GOOGLE_AI_API_KEY=...
```

> 💡 **احصل على المفاتيح من:**
>
> - OpenAI: https://platform.openai.com/api-keys
> - Anthropic: https://console.anthropic.com/
> - Google AI: https://makersuite.google.com/app/apikey

### الخطوة 3: التحقق من الإعداد

```powershell
# فحص TypeScript
npm run typecheck

# فحص الكود
npm run lint

# فحص التنسيق
npm run format:check
```

---

## 🎬 الأوامر المتاحة

### 🔥 التطوير

```powershell
# بدء خادم التطوير
npm run dev

# بدء مع الفحص التلقائي
npm run dev:auto

# البناء للإنتاج
npm run build

# تشغيل نسخة الإنتاج
npm run start
```

### 🔍 الجودة والاختبار

```powershell
# فحص TypeScript
npm run typecheck

# فحص ESLint
npm run lint

# إصلاح مشاكل ESLint
npm run lint:fix

# فحص التنسيق
npm run format:check

# تنسيق الكود
npm run format

# فحص شامل
npm run validate

# إصلاح وتنسيق
npm run fix
```

### 🔄 الصيانة

```powershell
# تنظيف الملفات المؤقتة
npm run clean

# إعادة التثبيت الكامل
npm run clean:install

# تحليل حجم البناء
npm run analyze
```

### 🚀 سكربتات PowerShell المخصصة

```powershell
# تشخيص النظام الشامل
./scripts/system-diagnostics.ps1

# إدارة التحديثات الذكية
./scripts/smart-update.ps1

# الإعداد التلقائي الكامل
./scripts/auto-setup.ps1

# بدء سريع
./quick-start.ps1
```

---

## 🐛 استكشاف الأخطاء

### مشكلة: خطأ في تثبيت الحزم

```powershell
# الحل
npm run clean:install
```

### مشكلة: أخطاء TypeScript

```powershell
# الحل
npm run typecheck
# ثم راجع الأخطاء وصححها
```

### مشكلة: Port 3000 محجوز

```powershell
# الحل: تغيير المنفذ
# في ملف package.json، غير:
"dev": "next dev -p 3001"
```

### مشكلة: مفاتيح API غير صحيحة

```powershell
# الحل: تحقق من .env.local
# تأكد من نسخ المفاتيح بالكامل بدون مسافات
```

### مشكلة: أخطاء في Git

```powershell
# تكوين Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## 📦 إضافات VS Code الموصى بها

سيتم اقتراح الإضافات تلقائياً عند فتح المشروع في VS Code:

### ⚡ ضرورية

- ✅ **GitHub Copilot** - مساعد الذكاء الاصطناعي
- ✅ **Prettier** - تنسيق الكود
- ✅ **ESLint** - فحص الكود
- ✅ **Tailwind CSS IntelliSense** - إكمال تلقائي

### 📝 موصى بها

- 🔹 **GitLens** - تحسينات Git
- 🔹 **Path Intellisense** - إكمال المسارات
- 🔹 **Pretty TypeScript Errors** - أخطاء واضحة
- 🔹 **Auto Rename Tag** - تعديل الوسوم

---

## 🎨 الميزات الرئيسية

### ✨ ما يتضمنه المشروع

- ✅ **Next.js 14** - أحدث إصدار
- ✅ **TypeScript** - كتابة آمنة
- ✅ **Tailwind CSS** - تصميم حديث
- ✅ **Framer Motion** - حركات سلسة
- ✅ **Zustand** - إدارة الحالة
- ✅ **Radix UI** - مكونات متاحة
- ✅ **تعدد نماذج AI** - OpenAI, Claude, Gemini
- ✅ **دعم ثنائي اللغة** - عربي/إنجليزي
- ✅ **PWA Ready** - تطبيق ويب تقدمي
- ✅ **SEO Optimized** - محسّن لمحركات البحث

### 🛠️ الأتمتة المدمجة

- 🤖 **GitHub Copilot** - اقتراحات ذكية
- 🔄 **Auto-format** - تنسيق تلقائي عند الحفظ
- 🔍 **Auto-fix** - إصلاح مشاكل ESLint
- 📦 **Auto-imports** - استيراد تلقائي
- 🔐 **Type safety** - أمان الأنواع
- 🎯 **Smart updates** - تحديثات ذكية

---

## 📚 الوثائق الإضافية

- 📁 [هيكل المشروع](./PROJECT-STRUCTURE.md)
- 🏗️ [المعمارية](./ARCHITECTURE.md)
- 🚀 [دليل النشر](./DEPLOYMENT.md)
- 🔒 [الأمان](../SECURITY.md)
- 🤝 [المساهمة](../CONTRIBUTING.md)

---

## 💡 نصائح للإنتاجية

### 1. استخدم السكربتات المخصصة

```powershell
# بدلاً من تنفيذ أوامر متعددة
./scripts/auto-setup.ps1  # يفعل كل شيء
```

### 2. فعّل GitHub Copilot

- اضغط `Ctrl+I` لفتح Copilot Chat
- اضغط `Tab` لقبول الاقتراح

### 3. اختصارات VS Code مفيدة

- `Ctrl+Shift+P` - لوحة الأوامر
- `Ctrl+P` - بحث سريع عن ملف
- `F12` - الذهاب للتعريف
- `Shift+F12` - إيجاد جميع المراجع
- `Ctrl+D` - تحديد التالي
- `Alt+Shift+F` - تنسيق الوثيقة

### 4. استخدم المهام Tasks

في VS Code اضغط `Ctrl+Shift+B` لتشغيل:

- 🚀 Start Development Server
- ✅ Validate & Check
- 🔧 Auto Fix & Format
- 🏗️ Build Production

---

## 🆘 الحصول على المساعدة

### 📞 قنوات الدعم

- 🐛 **Issues**: [GitHub Issues](https://github.com/mya1999/nexus-ai-platform/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/mya1999/nexus-ai-platform/discussions)
- 📧 **Email**: support@nexus-ai.dev

### 🔗 موارد مفيدة

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

---

## ✅ قائمة المراجعة للبدء

- [ ] تثبيت Node.js و npm
- [ ] استنساخ المستودع
- [ ] تشغيل `npm install`
- [ ] نسخ `.env.example` إلى `.env.local`
- [ ] إضافة مفاتيح API
- [ ] تشغيل `npm run dev`
- [ ] فتح `http://localhost:3000`
- [ ] تثبيت إضافات VS Code
- [ ] تفعيل GitHub Copilot
- [ ] استكشاف السكربتات المخصصة

---

**🎉 أهلاً بك في NexusAI Platform!**

> للمزيد من التفاصيل، راجع [README.md](../README.md) الرئيسي

---

**آخر تحديث**: نوفمبر 2025  
**الإصدار**: 2.0.0
