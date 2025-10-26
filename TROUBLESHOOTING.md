# 🔧 دليل حل المشاكل السريع

## 🚨 المشاكل الشائعة والحلول

### 1️⃣ CI Workflow فشل

#### المشكلة: `npm run lint` فشل
```bash
# الحل:
npm run lint -- --fix
git add .
git commit -m "fix: resolve lint errors"
git push
```

#### المشكلة: `npm run typecheck` فشل
```bash
# الحل: أصلح أخطاء TypeScript
# راجع الأخطاء في VS Code (Problems panel)
# أصلح كل خطأ واحدًا تلو الآخر
```

#### المشكلة: `npm run build` فشل
```bash
# تحقق من:
1. جميع imports صحيحة
2. لا توجد أخطاء TypeScript
3. ملف next.config.js صحيح
4. المتغيرات البيئية موجودة (إن لزم)
```

---

### 2️⃣ Vercel Preview لا يعمل

#### السبب المحتمل: الأسرار غير موجودة

```bash
# الخطوات:
1. vercel login
2. vercel link
3. افتح .vercel/project.json
4. انسخ orgId و projectId
5. أضفهم في GitHub Secrets
```

#### التحقق:
```
Settings → Secrets → Actions
يجب أن يكون:
✅ VERCEL_TOKEN
✅ VERCEL_ORG_ID
✅ VERCEL_PROJECT_ID
```

---

### 3️⃣ Dependabot لا يُدمج تلقائيًا

#### الحل:
```
1. Settings → General → Pull Requests
   ✅ Allow auto-merge

2. Settings → Actions → General
   ✅ Read and write permissions
   ✅ Allow Actions to create PRs
```

---

### 4️⃣ Branch Protection يمنع الدمج

#### إذا كنت المالك الوحيد:
```
Settings → Branches → main → Edit
✅ لا تفعّل "Include administrators"
```

#### إذا كان لديك فريق:
```
احتفظ بـ:
✅ Require PR
✅ Require status checks
لكن اسمح للمسؤولين بالتجاوز عند الضرورة
```

---

### 5️⃣ الأدوات (Tools) كثيرة جدًا

#### الحل السريع:
```
1. Ctrl+Shift+P
2. Configure Tools
3. احذف كل شيء ما عدا:
   - vscodeAPI
   - GitHub Pull Requests
   - github (MCP)
```

#### راجع: `.vscode/TOOLS-GUIDE.md`

---

### 6️⃣ إعلانات Tabnine مزعجة

#### تم الحل تلقائيًا في:
`.vscode/settings.json`

إذا استمرت:
```
Settings → Tabnine → Disable notifications
```

---

### 7️⃣ أخطاء إملائية كثيرة

#### الحل:
```json
// في .vscode/settings.json
"cSpell.enabled": true
"cSpell.language": "en,ar"
```

#### إضافة كلمات مخصصة:
```
اضغط بالزر الأيمن على الكلمة
→ Add to Workspace Dictionary
```

---

### 8️⃣ .next/ و node_modules/ ظاهرة في Git

#### الحل:
```bash
# تحقق من .gitignore
# يجب أن يحتوي على:
node_modules/
.next/
.vercel/

# إذا كانت موجودة بالفعل:
git rm -r --cached node_modules .next
git commit -m "chore: remove ignored files"
git push
```

---

### 9️⃣ VS Code بطيء جدًا

#### الحلول:
```
1. قلل عدد الأدوات (Tools) إلى 3-5
2. عطّل الامتدادات غير المستخدمة
3. أضف مجلدات للاستثناء:
   - node_modules
   - .next
   - dist
```

#### في `.vscode/settings.json`:
```json
"files.watcherExclude": {
  "**/node_modules/**": true,
  "**/.next/**": true
}
```

---

### 🔟 CODEOWNERS لا يعمل

#### السبب: اسم المستخدم خاطئ

```bash
# في .github/CODEOWNERS
# استبدل:
@your-username

# بـ:
@اسمك-الفعلي-على-GitHub
```

#### للتحقق:
```
افتح PR → تحقق من المراجعين المطلوبين
```

---

## 🆘 عند فشل كل شيء

### Reset للإعدادات:
```bash
# احذف:
rm -rf node_modules
rm -rf .next
rm package-lock.json

# أعد التثبيت:
npm install

# أعد البناء:
npm run build
```

### استعادة الملفات الافتراضية:
```bash
# من Git:
git checkout main -- .vscode/
git checkout main -- .github/
```

---

## 📞 طلب المساعدة

إذا استمرت المشكلة:

1. **افتح Issue** مع:
   - وصف المشكلة
   - الخطوات لإعادة الإنتاج
   - سجلات الأخطاء
   - لقطات شاشة

2. **راجع الوثائق**:
   - `SETUP-GUIDE.md`
   - `.vscode/FAQ.md`
   - `CONTRIBUTING.md`

3. **تحقق من Logs**:
   - GitHub Actions logs
   - VS Code Output panel
   - Browser Console (للأخطاء في الموقع)

---

## ✅ التحقق السريع

```bash
# اختبار شامل قبل Push:
npm run lint && npm run typecheck && npm run build
```

إذا نجح كل شيء → جاهز للـ Push! 🚀

---

**هذا الدليل يغطي 95% من المشاكل الشائعة!** 💪
