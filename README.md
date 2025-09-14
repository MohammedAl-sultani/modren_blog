# المدونة الاحترافية - Professional Blog

مدونة احترافية شاملة مع ميزات الذكاء الاصطناعي المتقدمة، مبنية بـ Python (FastAPI) و React و MySQL.

## 🌟 الميزات الرئيسية

### 📝 إدارة المحتوى
- إنشاء وتحرير المقالات مع دعم Markdown
- رفع وإدارة الصور والفيديوهات والملفات الصوتية
- تصنيفات وعلامات متقدمة
- نظام نشر مرن (مسودة، منشور، مؤرشف)

### 🤖 ميزات الذكاء الاصطناعي
- توليد المحتوى والعناوين تلقائياً
- توليد الصور والفيديوهات بالذكاء الاصطناعي
- تحويل الصوت إلى نص والعكس
- الترجمة التلقائية للنصوص
- تصحيح الأخطاء النحوية والإملائية
- اقتراحات المحتوى الذكية

### 👥 نظام المستخدمين
- تسجيل دخول وتسجيل مستخدمين جدد
- أدوار متعددة (مدير، محرر، مؤلف، زائر)
- ملفات شخصية قابلة للتخصيص
- تفضيلات المستخدم والإعدادات

### 💬 التفاعل الاجتماعي
- نظام تعليقات متقدم
- الإعجابات والمشاركة
- إشعارات فورية
- إحصائيات مفصلة

### 🎨 التصميم والواجهة
- تصميم متجاوب وجذاب
- دعم الوضع المظلم والفاتح
- واجهة عربية كاملة
- تجربة مستخدم محسنة

### 📊 لوحة التحكم
- إحصائيات شاملة
- إدارة المستخدمين والمحتوى
- إعدادات النظام
- إدارة الملفات والوسائط

## 🚀 كيفية التشغيل

### المتطلبات الأساسية
- Python 3.8 أو أحدث
- Node.js 16 أو أحدث
- MySQL 8.0 أو أحدث
- Git

### 1. إعداد المشروع
```bash
# استنساخ المشروع
git clone <repository-url>
cd professional-blog

# تشغيل سكريبت الإعداد التلقائي
./start.sh
```

### 2. إعداد قاعدة البيانات
```bash
# تشغيل MySQL
# على macOS:
brew services start mysql

# على Ubuntu:
sudo systemctl start mysql

# إنشاء قاعدة البيانات
mysql -u root -p < database_setup.sql
```

### 3. إعداد متغيرات البيئة
```bash
# نسخ ملف الإعدادات
cp env.example .env

# تعديل الإعدادات
nano .env
```

### 4. تشغيل التطبيق

#### تشغيل Backend (في terminal منفصل)
```bash
./start-backend.sh
```

#### تشغيل Frontend (في terminal منفصل)
```bash
./start-frontend.sh
```

### 5. الوصول للتطبيق
- **الواجهة الأمامية**: http://localhost:3000
- **API**: http://localhost:8000
- **وثائق API**: http://localhost:8000/api/docs

## 📁 هيكل المشروع

```
professional-blog/
├── backend/                 # Python FastAPI Backend
│   ├── app/
│   │   ├── api/            # API Routes
│   │   ├── core/           # Core configurations
│   │   ├── db/             # Database configurations
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── main.py             # FastAPI application
│   └── run.py              # Run script
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript types
│   │   └── styles/         # Styled components
│   └── public/             # Static files
├── uploads/                # Uploaded files
│   ├── images/
│   ├── videos/
│   └── audio/
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
├── database_setup.sql     # Database schema
└── start.sh              # Setup script
```

## 🔧 الإعدادات المتقدمة

### متغيرات البيئة المهمة
```env
# قاعدة البيانات
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/blog_db

# مفاتيح API
OPENAI_API_KEY=your-openai-api-key
GOOGLE_TRANSLATE_API_KEY=your-google-translate-key

# إعدادات الأمان
SECRET_KEY=your-super-secret-key
JWT_ALGORITHM=HS256

# إعدادات الملفات
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_DIR=uploads
```

### إعدادات قاعدة البيانات
- **المستخدم الافتراضي**: admin@blog.com
- **كلمة المرور الافتراضي**: admin123
- **قاعدة البيانات**: blog_db

## 🛠️ التطوير

### إضافة ميزات جديدة
1. إنشاء API endpoints في `backend/app/api/`
2. إضافة نماذج قاعدة البيانات في `backend/app/models/`
3. إنشاء مكونات React في `frontend/src/components/`
4. إضافة صفحات جديدة في `frontend/src/pages/`

### اختبار التطبيق
```bash
# اختبار Backend
cd backend
python -m pytest

# اختبار Frontend
cd frontend
npm test
```

## 📚 الوثائق

- [وثائق API](http://localhost:8000/api/docs)
- [دليل المطور](docs/developer-guide.md)
- [دليل النشر](docs/deployment-guide.md)

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء branch للميزة الجديدة
3. Commit التغييرات
4. Push إلى Branch
5. إنشاء Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 الدعم

للحصول على الدعم أو الإبلاغ عن مشاكل:
- إنشاء Issue في GitHub
- التواصل عبر البريد الإلكتروني
- الانضمام لمجتمع المطورين

---

**تم تطويره بـ ❤️ باستخدام Python, React, و MySQL**
