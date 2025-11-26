# 🚀 دليل الإعداد السريع - Nexus AI Platform

## ✅ ما تم إضافته تلقائيًا

### 📁 إعدادات VS Code

- `.vscode/settings.json` - إعدادات المحرر
- `.vscode/extensions.json` - الامتدادات الموصى بها

### 🤖 GitHub Actions Workflows

- `auto-merge.yml` - دمج تلقائي لتحديثات Dependabot
- `stale.yml` - إغلاق Issues/PRs القديمة
- `label-sync.yml` - مزامنة الوسوم
- `pr-size.yml` - تصنيف PRs حسب الحجم
- `welcome.yml` - ترحيب بالمساهمين الجدد

### 📝 ملفات الإعداد

- `.prettierrc.js` - قواعد Prettier
- `.prettierignore` - استثناءات Prettier
- `.github/labels.yml` - تعريف الوسوم
- `CONTRIBUTING.md` - دليل المساهمة
- `SECURITY.md` - سياسة الأمان

---

## 🔧 الخطوات المطلوبة منك (5 دقائق)

### 1️⃣ تفعيل GitHub Actions

```
الإعدادات → Actions → General
✅ Allow all actions
✅ Read and write permissions
✅ Allow GitHub Actions to create and approve pull requests
```

### 2️⃣ إضافة أسرار Vercel

في Terminal:

```bash
npm i -g vercel
vercel login
vercel link
```

ثم في GitHub:

```
Settings → Secrets → Actions → New repository secret
```

أضف:

- `VERCEL_TOKEN` (من vercel.com/account/tokens)
- `VERCEL_ORG_ID` (من .vercel/project.json)
- `VERCEL_PROJECT_ID` (من .vercel/project.json)

### 3️⃣ تحديث CODEOWNERS

افتح `.github/CODEOWNERS` واستبدل:

```
@your-username
```

بـ:

```
@اسمك-الفعلي-على-GitHub
```

### 4️⃣ حماية فرع main

```
Settings → Branches → Add rule
Branch name: main

✅ Require pull request
✅ Require status checks (اختر: CI, CodeQL)
✅ Require branches to be up to date
```

### 5️⃣ تفعيل Dependabot

```
Settings → Code security
✅ Dependency graph
✅ Dependabot alerts
✅ Dependabot security updates
```

### 6️⃣ تثبيت الامتدادات الموصى بها

عند فتح VS Code، ستظهر رسالة لتثبيت الامتدادات - اضغط **Install All**

---

## 🎯 الأوامر المفيدة

### تنسيق الكود

```bash
npm run format      # تنسيق جميع الملفات
```

### فحص الجودة

```bash
npm run lint        # فحص ESLint
npm run typecheck   # فحص TypeScript
```

### اختبار محلي

```bash
npm run dev         # تشغيل محلي
npm run build       # بناء للإنتاج
```

### Git Workflow

```bash
# إنشاء فرع جديد
git checkout -b feature/new-feature

# الالتزام بالتغييرات
git add .
git commit -m "feat: وصف التغيير"

# دفع ورفع PR
git push -u origin feature/new-feature
```

---

## 📊 ماذا سيحدث الآن تلقائيًا؟

### عند فتح PR:

✅ تشغيل CI (Build, Lint, TypeCheck, Test)
✅ تشغيل CodeQL Security
✅ نشر معاينة على Vercel
✅ تصنيف حسب الحجم (size/xs, s, m, l, xl)
✅ ترحيب بالمساهمين الجدد

### أسبوعيًا:

✅ فحص أمني CodeQL
✅ تحديثات Dependabot للتبعيات
✅ إغلاق Issues/PRs القديمة

### عند دمج PR:

✅ حذف الفرع تلقائيًا
✅ تحديث الوسوم

### تحديثات Dependabot:

✅ موافقة ودمج تلقائي للتحديثات الصغيرة (patch/minor)

---

## 🏷️ الوسوم المتاحة

- `bug` - مشكلة
- `enhancement` - تحسين
- `dependencies` - تبعيات
- `documentation` - توثيق
- `performance` - أداء
- `security` - أمان
- `good first issue` - للمبتدئين
- `help wanted` - نحتاج مساعدة
- `stale` - قديمة
- `pinned` - مثبتة

---

## 🔒 الأمان

- ❌ لا تضع أسرار أو API keys في الكود
- ✅ استخدم متغيرات البيئة دائمًا
- ✅ راجع تنبيهات Dependabot
- ✅ راجع نتائج CodeQL

---

## 💡 نصائح

### رسائل Commit المعيارية:

```
feat: إضافة ميزة جديدة
fix: إصلاح عطل
docs: تحديث التوثيق
style: تنسيق
refactor: إعادة هيكلة
perf: تحسين أداء
test: إضافة اختبارات
chore: مهام صيانة
```

### أسماء الفروع:

```
feature/اسم-الميزة
bugfix/اسم-المشكلة
hotfix/إصلاح-عاجل
docs/تحديث-التوثيق
```

---

## 🆘 مشاكل شائعة

### CI فشل؟

1. تحقق من أخطاء Lint: `npm run lint`
2. تحقق من TypeScript: `npm run typecheck`
3. تأكد من نجاح Build: `npm run build`

### Vercel Preview لا يعمل؟

1. تحقق من وجود الأسرار الثلاثة
2. تأكد من صحة القيم
3. راجع سجل workflow

### Dependabot لا يُدمج تلقائيًا؟

1. تأكد من تفعيل Auto-merge في Settings
2. تأكد من صلاحيات Actions (Write)

---

## 🎉 كل شيء جاهز!

الآن لديك:

- ✅ CI/CD احترافي كامل
- ✅ أمان مستمر
- ✅ تحديثات تلقائية
- ✅ معاينات فورية
- ✅ أتمتة شاملة

**ابدأ العمل وسيتولى النظام الباقي! 🚀**

---

## 📞 المساعدة

- اقرأ [CONTRIBUTING.md](CONTRIBUTING.md)
- اقرأ [SECURITY.md](SECURITY.md)
- افتح Issue إذا واجهت مشكلة
