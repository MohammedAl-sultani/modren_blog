# 🚀 دليل التشغيل السريع - المدونة الاحترافية

## ⚡ التشغيل السريع (5 دقائق)

### 1. إعداد المشروع
```bash
# تشغيل سكريبت الإعداد التلقائي
./start.sh
```

### 2. إعداد قاعدة البيانات
```bash
# تشغيل MySQL
brew services start mysql  # على macOS
# أو
sudo systemctl start mysql  # على Ubuntu

# إنشاء قاعدة البيانات
mysql -u root -p < database_setup.sql
```

### 3. إعداد متغيرات البيئة
```bash
# نسخ ملف الإعدادات
cp env.example .env

# تعديل الإعدادات (اختياري)
nano .env
```

### 4. تشغيل التطبيق

#### Terminal 1 - Backend
```bash
./start-backend.sh
```

#### Terminal 2 - Frontend
```bash
./start-frontend.sh
```

### 5. الوصول للتطبيق
- **الواجهة الأمامية**: http://localhost:3000
- **API**: http://localhost:8000
- **وثائق API**: http://localhost:8000/api/docs

## 🔑 بيانات الدخول الافتراضية

### مدير النظام
- **البريد الإلكتروني**: admin@blog.com
- **كلمة المرور**: admin123

### قاعدة البيانات
- **المستخدم**: blog_user
- **كلمة المرور**: blog_password
- **قاعدة البيانات**: blog_db

## 📱 الميزات المتاحة

### ✅ مكتملة
- [x] هيكل المشروع الأساسي
- [x] Backend مع FastAPI
- [x] Frontend مع React
- [x] قاعدة البيانات MySQL
- [x] واجهة المستخدم الحديثة
- [x] صفحات أساسية (الرئيسية، المدونة، تسجيل الدخول، إلخ)
- [x] تصميم متجاوب
- [x] نظام التنقل

### 🚧 قيد التطوير
- [ ] نظام المصادقة الكامل
- [ ] إدارة المحتوى
- [ ] ميزات الذكاء الاصطناعي
- [ ] نظام التعليقات والإعجابات
- [ ] لوحة تحكم الإدارة
- [ ] رفع الملفات والوسائط

## 🛠️ استكشاف الأخطاء

### مشاكل شائعة

#### 1. خطأ في قاعدة البيانات
```bash
# تأكد من تشغيل MySQL
brew services list | grep mysql
# أو
sudo systemctl status mysql
```

#### 2. خطأ في Python dependencies
```bash
# إعادة تثبيت dependencies
source venv/bin/activate
pip install -r requirements.txt
```

#### 3. خطأ في Node.js dependencies
```bash
# إعادة تثبيت dependencies
npm install
```

#### 4. خطأ في المنافذ
```bash
# تحقق من المنافذ المستخدمة
lsof -i :3000  # Frontend
lsof -i :8000  # Backend
```

## 📚 الخطوات التالية

1. **إعداد مفاتيح API**:
   - OpenAI API key للذكاء الاصطناعي
   - Google Translate API key للترجمة

2. **تخصيص التصميم**:
   - تعديل الألوان والخطوط
   - إضافة شعار الموقع
   - تخصيص المحتوى

3. **إضافة ميزات جديدة**:
   - نظام التعليقات
   - رفع الملفات
   - الإشعارات

## 🆘 الحصول على المساعدة

- راجع ملف README.md للتفاصيل الكاملة
- تحقق من وثائق API على http://localhost:8000/api/docs
- راجع ملفات السجلات في حالة وجود أخطاء

---

**🎉 تهانينا! تم تشغيل المدونة الاحترافية بنجاح!**
