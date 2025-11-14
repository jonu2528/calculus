# คู่มือการพัฒนาและขยายเว็บไซต์ Calculus 1 Online

เอกสารนี้อธิบายวิธีการพัฒนาและเพิ่มเนื้อหาใหม่ให้กับเว็บไซต์

## 📁 โครงสร้างไฟล์

```
calculus/
├── index.html              # หน้าแรก (สร้างแล้ว ✅)
├── manifest.json           # PWA manifest (สร้างแล้ว ✅)
├── service-worker.js       # Service worker (สร้างแล้ว ✅)
├── TEMPLATE.html          # Template สำหรับหน้าใหม่ (สร้างแล้ว ✅)
├── README.md              # คู่มือหลัก (สร้างแล้ว ✅)
├── CONTENT_STRUCTURE.md   # โครงเนื้อหาทั้งหมด (สร้างแล้ว ✅)
├── DEVELOPMENT_GUIDE.md   # ไฟล์นี้
│
├── css/
│   └── styles.css         # CSS หลัก (สร้างแล้ว ✅)
│
├── js/
│   └── app.js             # JavaScript หลัก (สร้างแล้ว ✅)
│
├── assets/
│   └── icon-*.png         # App icons (ต้องสร้าง)
│
└── chapters/
    ├── chapter1/
    │   ├── functions.html     ✅ สร้างแล้ว - ใช้เป็นตัวอย่าง
    │   ├── limits.html        ⏳ ต้องสร้าง
    │   └── continuity.html    ⏳ ต้องสร้าง
    ├── chapter2/ (ต้องสร้าง 5 ไฟล์)
    ├── chapter3/ (ต้องสร้าง 4 ไฟล์)
    ├── chapter4/ (ต้องสร้าง 6 ไฟล์)
    └── chapter5/ (ต้องสร้าง 6 ไฟล์)
```

## 🚀 วิธีการสร้างหน้าเนื้อหาใหม่

### ขั้นตอนที่ 1: คัดลอก Template

```bash
cp TEMPLATE.html chapters/chapter[X]/[topic-name].html
```

### ขั้นตอนที่ 2: แก้ไข Metadata

เปิดไฟล์และแก้ไข:

```html
<meta name="description" content="[คำอธิบายหน้านี้]">
<title>[หมายเลข] [ชื่อหัวข้อ] - Calculus 1 Online</title>
```

**ตัวอย่าง:**
```html
<meta name="description" content="บทที่ 1.2 ลิมิต (Limits) - เรียนรู้ลิมิตด้านซ้ายและขวา กฎของลิมิต และลิมิตรูปไม่กำหนด">
<title>1.2 ลิมิต (Limits) - Calculus 1 Online</title>
```

### ขั้นตอนที่ 3: อัพเดท Breadcrumb

```html
<nav class="breadcrumb">
    <a href="/">หน้าแรก</a>
    <a href="#">บทที่ [X]: [ชื่อบท]</a>
    <span>[หมายเลข] [ชื่อหัวข้อ]</span>
</nav>
```

### ขั้นตอนที่ 4: เพิ่มส่วนทฤษฎี

ใช้โครงสร้างต่อไปนี้:

```html
<div class="theory-content">
    <h3>หัวข้อย่อย 1</h3>
    <p>คำอธิบาย...</p>

    <div class="math-display">
        $$[สูตรทางคณิตศาสตร์]$$
    </div>

    <div class="note">
        <div class="note-title">หมายเหตุ</div>
        <p>เนื้อหาหมายเหตุ...</p>
    </div>
</div>
```

**Box ที่ใช้ได้:**
- `<div class="note">` - หมายเหตุทั่วไป (สีน้ำเงิน)
- `<div class="tip">` - เทคนิค/คำแนะนำ (สีเขียว)
- `<div class="warning">` - คำเตือน/ข้อควรระวัง (สีเหลือง)

### ขั้นตอนที่ 5: เพิ่มตัวอย่าง (5-7 ข้อ)

แต่ละตัวอย่างใช้โครงสร้าง:

```html
<div class="example">
    <div class="example-header">
        <span class="example-number">ตัวอย่างที่ 1</span>
        <span class="example-difficulty difficulty-easy">ง่าย</span>
    </div>

    <div class="example-problem">
        <h4>โจทย์:</h4>
        <p>[โจทย์]</p>
    </div>

    <div class="solution">
        <h4>วิธีทำ:</h4>

        <div class="solution-step">
            <div class="step-label">ขั้นตอนที่ 1: [คำอธิบาย]</div>
            <p>[รายละเอียด]</p>
            <div class="math-display">
                $$[คำนวณ]$$
            </div>
        </div>

        <div class="solution-step">
            <div class="step-label">คำตอบ:</div>
            <p>[คำตอบสุดท้าย]</p>
        </div>
    </div>
</div>
```

**ระดับความยาก:**
- `difficulty-easy` - สีเขียว
- `difficulty-medium` - สีเหลือง
- `difficulty-hard` - สีแดง

**การแบ่งตัวอย่าง:**
- ข้อ 1-2: ง่าย
- ข้อ 3-5: ปานกลาง
- ข้อ 6-7: ท้าทาย (อย่างน้อย 1 ข้อเป็นโจทย์ข้อความ/ประยุกต์)

### ขั้นตอนที่ 6: เพิ่มแบบฝึกหัด

แบบฝึกหัดแบ่งเป็น 2 ระดับ:

```html
<h3>ระดับพื้นฐาน</h3>

<div class="exercise">
    <div class="exercise-problem">
        <h4>ข้อ 1:</h4>
        <p>[โจทย์]</p>
    </div>
    <button class="btn btn-show-solution">ดูเฉลย</button>
    <div class="solution hidden">
        <h4>เฉลย:</h4>
        <div class="solution-step">
            <p>[วิธีทำละเอียด]</p>
            <p><strong>คำตอบ:</strong> [คำตอบ]</p>
        </div>
    </div>
</div>

<h3>ระดับท้าทาย</h3>
<!-- เพิ่มแบบฝึกหัดท้าทาย -->
```

**สำคัญ:** เฉลยต้องมี `class="hidden"` เพื่อซ่อนไว้ จะแสดงเมื่อกดปุ่ม "ดูเฉลย"

### ขั้นตอนที่ 7: อัพเดท data-topic

ตรวจสอบว่า link ใน sidebar มี `data-topic` ที่ถูกต้อง:

```html
<li><a href="/chapters/chapter1/limits.html" data-topic="1.2">1.2 ลิมิต (Limits)</a></li>
```

`data-topic` ใช้สำหรับระบบติดตามความคืบหน้า

## 📐 การใช้ LaTeX

### กฎสำคัญ
- ใช้ LaTeX เท่านั้น ไม่ใช้อักขระพิเศษ Unicode (∫, ∞, ε)
- Inline math: `$...$`
- Display math: `$$...$$` หรือ `\[...\]`

### สัญลักษณ์ที่ใช้บ่อย

**พื้นฐาน:**
```latex
$x^2$                    # กำลังสอง
$x_1$                    # subscript
$\frac{a}{b}$           # เศษส่วน
$\sqrt{x}$              # รากที่สอง
$\sqrt[n]{x}$           # รากที่ n
```

**แคลคูลัส:**
```latex
$\lim_{x \to a} f(x)$          # ลิมิต
$\lim_{x \to \infty}$          # ลิมิตที่อนันต์
$\frac{dy}{dx}$                # อนุพันธ์
$f'(x)$, $f''(x)$              # อนุพันธ์ (prime notation)
$\int f(x)\,dx$                # ปริพันธ์ไม่จำกัดเขต
$\int_a^b f(x)\,dx$            # ปริพันธ์จำกัดเขต
```

**ตรีโกณมิติ:**
```latex
$\sin x$, $\cos x$, $\tan x$
$\sin^2 x$                     # กำลัง
$\arcsin x$, $\arctan x$       # ฟังก์ชันผกผัน
```

**อื่นๆ:**
```latex
$\infty$                       # อนันต์
$\pm$                          # บวกลบ
$\leq$, $\geq$                # มากกว่าเท่ากับ
$\neq$                         # ไม่เท่ากับ
$\approx$                      # ประมาณ
$\rightarrow$                  # ลูกศร
$\varepsilon$, $\delta$        # epsilon, delta
```

**สมการหลายบรรทัด:**
```latex
$$
\begin{align*}
f(x) &= x^2 + 2x + 1 \\
     &= (x + 1)^2
\end{align*}
$$
```

**Cases (piecewise functions):**
```latex
$$
f(x) = \begin{cases}
x^2 & \text{if } x < 0 \\
2x & \text{if } x \geq 0
\end{cases}
$$
```

## 🎨 CSS Classes ที่มี

### Layout
- `.section` - แต่ละส่วนหลัก
- `.section-header` - หัวข้อของส่วน
- `.theory-content` - เนื้อหาทฤษฎี
- `.math-display` - สมการแสดงผล

### Components
- `.note`, `.tip`, `.warning` - กล่องข้อความพิเศษ
- `.example` - กล่องตัวอย่าง
- `.exercise` - กล่องแบบฝึกหัด
- `.solution` - เฉลย
- `.solution-step` - แต่ละขั้นตอนของเฉลย

### Buttons
- `.btn` - ปุ่มพื้นฐาน
- `.btn-primary` - ปุ่มหลัก (สีน้ำเงิน)
- `.btn-show-solution` - ปุ่มดูเฉลย (สีเขียว)

### Utilities
- `.hidden` - ซ่อนองค์ประกอบ
- `.text-center` - จัดกลาง
- `.mt-1`, `.mt-2`, `.mt-3`, `.mt-4` - margin top
- `.mb-1`, `.mb-2`, `.mb-3`, `.mb-4` - margin bottom

## 🔧 การทดสอบ

### ทดสอบภายใน Local

1. รัน web server:
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

2. เปิดเบราว์เซอร์: `http://localhost:8000`

### สิ่งที่ต้องทดสอบ

- ✅ MathJax แสดงสมการถูกต้อง
- ✅ ปุ่ม "ดูเฉลย" ทำงาน
- ✅ Navigation ใน sidebar ทำงาน
- ✅ Progress tracking บันทึกถูกต้อง
- ✅ Responsive บนมือถือและแท็บเล็ต
- ✅ Search ค้นหาได้
- ✅ PWA ติดตั้งได้

## 📝 Checklist สำหรับหน้าใหม่

เมื่อสร้างหน้าใหม่ ตรวจสอบ:

- [ ] Title และ description ถูกต้อง
- [ ] Breadcrumb แสดงเส้นทางถูกต้อง
- [ ] data-topic ตรงกับระบบ progress tracking
- [ ] ส่วนทฤษฎีอธิบายครบถ้วน
- [ ] มีตัวอย่าง 5-7 ข้อ
- [ ] ตัวอย่างแบ่งตามระดับความยาก
- [ ] มีโจทย์ข้อความ/ประยุกต์อย่างน้อย 1 ข้อ
- [ ] แบบฝึกหัดมีเฉลยละเอียด
- [ ] เฉลยมี class="hidden"
- [ ] ทุกสมการใช้ LaTeX
- [ ] ไม่มีอักขระพิเศษ Unicode
- [ ] ทดสอบบนเบราว์เซอร์แล้ว

## 🎯 ลำดับความสำคัญในการสร้าง

### ลำดับที่ 1: บทที่ 1 (พื้นฐานสำคัญ)
1. ✅ functions.html (สร้างแล้ว)
2. ⏳ limits.html
3. ⏳ continuity.html

### ลำดับที่ 2: บทที่ 2 (อนุพันธ์ - หัวใจหลัก)
1. derivative-intro.html
2. derivative-rules.html
3. standard-derivatives.html
4. advanced-derivatives.html
5. theorems.html

### ลำดับที่ 3: บทที่ 4 (ปริพันธ์ - หัวใจหลัก)
1. integral-intro.html
2. indefinite-integrals.html
3. definite-integrals.html
4. standard-integrals.html
5. u-substitution.html
6. applications.html

### ลำดับที่ 4: บทที่ 3 (ประยุกต์อนุพันธ์)
1. geometry.html
2. physics.html
3. extrema.html
4. approximation.html

### ลำดับที่ 5: บทที่ 5 (เทคนิคขั้นสูง)
1. integration-by-parts.html
2. partial-fractions.html
3. trig-integrals.html
4. trig-substitution.html
5. general-substitution.html
6. improper-integrals.html

## 🖼️ การสร้าง Icons สำหรับ PWA

ต้องสร้างไอคอนขนาดต่างๆ:
- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

วางไฟล์ใน `/assets/` เป็น `icon-72.png`, `icon-96.png`, ฯลฯ

**วิธีสร้าง:**
1. ออกแบบไอคอนขนาด 512x512
2. ใช้เครื่องมือออนไลน์ resize เช่น:
   - https://realfavicongenerator.net/
   - https://www.pwabuilder.com/imageGenerator

**สีและธีม:**
- สีหลัก: #2c3e50 (น้ำเงินเข้ม)
- สีรอง: #3498db (น้ำเงิน)
- ธีม: คณิตศาสตร์, การศึกษา

## 🔄 การอัพเดท Search Index

เมื่อเพิ่มหน้าใหม่ ต้องอัพเดท search index ใน `js/app.js`:

```javascript
buildSearchIndex() {
    return [
        {
            title: 'ชื่อหัวข้อ',
            url: '/chapters/chapter[X]/[topic].html',
            chapter: '[X].[Y]',
            keywords: 'คำค้น ภาษาไทย english keywords'
        },
        // เพิ่มรายการใหม่ที่นี่
    ];
}
```

## 🚀 การ Deploy

### GitHub Pages
1. สร้าง repository บน GitHub
2. Push โค้ด
3. ไปที่ Settings → Pages
4. เลือก branch และ root folder
5. Save

### Netlify
1. สมัคร Netlify
2. Connect กับ GitHub repository
3. Deploy โดยอัตโนมัติ

### Vercel
1. สมัคร Vercel
2. Import project จาก GitHub
3. Deploy

**หมายเหตุ:** ไม่ต้องมี build process เพราะเป็น static site

## 📚 Resources เพิ่มเติม

**MathJax Documentation:**
- https://docs.mathjax.org/

**LaTeX Math Symbols:**
- https://www.cmor-faculty.rice.edu/~heinken/latex/symbols.pdf

**PWA Guidelines:**
- https://web.dev/progressive-web-apps/

**Responsive Design:**
- https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design

## 💡 Tips สำหรับผู้พัฒนา

1. **ใช้ functions.html เป็นตัวอย่าง** - มีทุกอย่างครบถ้วน
2. **Copy-paste แล้วแก้** - เร็วกว่าเริ่มใหม่
3. **ทดสอบบ่อยๆ** - เปิดเบราว์เซอร์ดูผลทันที
4. **Commit บ่อย** - แบ่งการทำงานเป็นขั้นตอนเล็กๆ
5. **ตรวจ LaTeX** - ใช้ online editor ทดสอบก่อน
6. **Mobile first** - ทดสอบบนมือถือด้วย

## 🐛 Troubleshooting

### MathJax ไม่แสดงผล
- ตรวจสอบ syntax LaTeX
- ดู Console ใน browser (F12)
- ลอง reload หน้า (Ctrl+Shift+R)

### ปุ่ม "ดูเฉลย" ไม่ทำงาน
- ตรวจสอบว่ามี `class="btn btn-show-solution"`
- ตรวจสอบว่า solution มี `class="hidden"`
- ตรวจสอบว่า load `app.js` ถูกต้อง

### Progress ไม่บันทึก
- ตรวจสอบ `data-topic` attribute
- เช็ค localStorage ใน Developer Tools
- Clear cache และ reload

### Responsive ไม่ทำงาน
- ตรวจสอบ viewport meta tag
- ตรวจสอบ CSS media queries
- ทดสอบด้วย Chrome DevTools (F12 → Toggle device toolbar)

---

**Happy Coding! 💻✨**

มีคำถามหรือต้องการความช่วยเหลือ โปรดดูเอกสารใน README.md และ CONTENT_STRUCTURE.md
