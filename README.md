# 🏥 Kamalasai Hospital 3D Smart Building Digital Twin
### โมเดลผังอาคารและระบบควบคุม 3 มิติอัจฉริยะ โรงพยาบาลกมลาไสย จ.กาฬสินธุ์

[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 📌 บทนำและวัตถุประสงค์ (Introduction & Overview)

**Kamalasai Hospital Digital Twin** เป็นโปรเจกต์ต้นแบบการสร้าง **ระบบผังอาคารและศูนย์ควบคุม 3 มิติเสมือนจริง (3D Smart Facility Digital Twin)** บนเว็บเบราว์เซอร์ 100% โดยอิงตามผังแม่บทภาพถ่ายดาวเทียมจริงและแปลนพิมพ์เขียวอาคารของ **โรงพยาบาลกมลาไสย จังหวัดกาฬสินธุ์**

จุดเด่นหลักของสถาปัตยกรรมโปรเจกต์นี้คือ **"ความเรียบง่าย แต่ได้มาตรฐานสูงสุด (Standard & High Performance)"**:
- 🚀 **Zero Heavy 3D Assets**: ไม่ต้องพึ่งพาไฟล์ 3D ภายนอกขนาดใหญ่ (เช่น `.gltf`, `.obj`, `.fbx`) ที่โหลดช้าและกินแบนด์วิดท์
- ⚡ **100% Procedural 3D Geometry**: ตัวอาคาร ถนน ทางเดินเชื่อม และองค์ประกอบทั้งหมดถูกสร้างขึ้นด้วยโค้ดคณิตศาสตร์ (Procedural Code) ผ่าน Three.js โหลดไว แสดงผลทันที ลื่นไหล 60 FPS แม้บนมือถือ
- 🎨 **Architectural Miniature / Clay Diorama Aesthetic**: ดีไซน์สไตล์สถาปัตยกรรมจำลอง สะอาดตา สวยงามแบบโมเดิร์น พร้อมเงาตกกระทบนุ่มนวล (Soft Shadows) และระบบแสงแดดคำนวณตามมุมจริง
- 🌐 **Modern Glassmorphism HUD**: ส่วนติดต่อผู้ใช้แบบกระจกฝ้าโปร่งแสง พร้อมหมุด 3D Pin เชื่อมโยงด้วยเส้น SVG ลอยตามวัตถุในโลกสามมิติแบบเรียลไทม์

---

## 🏗 สถาปัตยกรรมระบบ (System Architecture)

```mermaid
graph TD
    subgraph Data Layer
        A[ผังแม่บท Masterplan / แผนที่ดาวเทียม] --> B[พิกัด 3D World Origin & Grid System]
        B --> C[Building Inventory & Meta Data]
    end

    subgraph 3D WebGL Core Three.js
        C --> D[Procedural Terrain & Roads]
        C --> E[Architectural Massing & Buildings]
        C --> F[Covered Walkway Network]
        C --> G[Realistic Lighting Engine & Soft Shadows]
        G --> H[Day / Night Smooth Transition Engine]
    end

    subgraph Interactive UI / HUD Layer
        D & E & F --> I[Raycasting & Click Detection]
        I --> J[Camera Orbit & Cinematic Fly-to TWEEN]
        E --> K[3D to 2D Screen Projection]
        K --> L[Dynamic SVG Leader Stalks]
        L --> M[Floating 3D HTML Pins]
        I --> N[Glassmorphism Details & Stats Panel]
        I --> O[Exploded Floor View System]
    end
```

---

## 🚀 จุดเด่นและฟังก์ชันการทำงาน (Key Features)

| ฟีเจอร์ | คำอธิบายเชิงเทคนิค |
| :--- | :--- |
| **3D Masterplan Grid** | จัดวางพิกัดอาคาร 24+ จุดตามแผนที่จริง ทิศทางการจราจรขาเข้า-ขาออก และแนวถนนรอบโรงพยาบาล |
| **Realistic Sun & Shadows** | คำนวณเงาตกกระทบด้วย `THREE.PCFSoftShadowMap` และแถบปรับมุมแดด (Azimuth / Elevation) ปรับแสงเพื่อสำรวจทิศทางแดดจริงได้ทันที |
| **Day / Night Transitions** | สลับบรรยากาศกลางวันและกลางคืน หน้าต่างและป้ายไฟเรืองแสง (Emissive Glow) เสมือนโรงพยาบาลเปิดบริการ 24 ชั่วโมง |
| **Dynamic SVG Leader Stalks** | หมุดป้ายชื่อลอยในโลก 3 มิติ เชื่อมต่อด้วยเส้น SVG แบบ Bezier curve ปรับพิกัดตามมุมกล้องแบบ Real-time |
| **Frontal ER/OPD Focus View** | จุดโฟกัสกล้องเปิดหน้าตึกฉุกเฉิน (ER) และตึกผู้ป่วยนอก (OPD) พร้อมชานชาลารถพยาบาล 1669 ตามมาตรฐานสถาปัตยกรรม |
| **Exploded Floor View** | ระบบแยกชั้นอาคาร 3 มิติ เพื่อดูโครงสร้างฟังก์ชันและผังการใช้งานแต่ละชั้น |
| **Responsive & Fullscreen** | รองรับ Desktop, Tablet, Smartphone พร้อมปุ่มสลับโหมดเต็มจอ (Fullscreen / Hide UI) เพื่อการนำเสนอ |

---

## 🛠 เทคโนโลยีที่ใช้งาน (Technology Stack)

- **Frontend Core**: HTML5 Semantic Structure, Vanilla JavaScript (ES6+)
- **3D Graphics Engine**: [Three.js (r128)](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js)
- **Camera Navigation**: [OrbitControls.js](https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js)
- **Animation Transitions**: [TWEEN.js (18.6.4)](https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js)
- **Styling**: Modern Vanilla CSS, Glassmorphism Backdrop Filter, CSS Grid/Flexbox
- **Typography**: Google Fonts (Prompt & Sarabun)

---

## 📖 คู่มือการสร้าง Digital Twin จากศูนย์ (Step-by-Step Developer Guide)

หากคุณต้องการนำแนวคิดของโปรเจกต์นี้ไปพัฒนา Digital Twin สำหรับ **โรงพยาบาล, มหาวิทยาลัย, นิคมอุตสาหกรรม, หรืออาคารสำนักงาน** ของคุณ สามารถทำตาม 6 ขั้นตอนมาตรฐานนี้:

### ขั้นตอนที่ 1: กำหนดจุดกำเนิดและแปลงสเกลผัง (Coordinate Calibration)
1. นำภาพถ่ายดาวเทียม (Google Earth หรือ Drone Mapping) วางเป็นภาพพื้นหลังอ้างอิง
2. กำหนดจุดศูนย์กลางของพื้นที่ **(X: 0, Z: 0)** แนะนำให้ตั้งไว้ที่กึ่งกลางของโครงการ
3. กำหนดอัตราส่วนสเกล เช่น **1 หน่วย Three.js = 1 เมตรจริง**:
   - แกน $+X$: ทิศตะวันออก
   - แกน $-X$: ทิศตะวันตก
   - แกน $+Y$: ความสูงจากพื้นดิน
   - แกน $+Z$: ทิศใต้
   - แกน $-Z$: ทิศเหนือ (หน้าโครงการ / ถนนใหญ่)

### ขั้นตอนที่ 2: สร้างข้อมูลอาคารเชิงโครงสร้าง (Building Inventory Data)
กำหนด Meta Data ของแต่ละอาคารในไฟล์ `main.js`:
```javascript
const HOSPITAL_BUILDINGS = [
  {
    id: "bld-er",
    code: "BLD-ER",
    name: "อาคารอุบัติเหตุฉุกเฉิน & เอ็กซเรย์",
    shortName: "อาคารอุบัติเหตุฉุกเฉิน",
    pos: { x: 17.5, y: 0, z: -39.3 }, // พิกัดในฉาก
    dimensions: { w: 20, h: 8.8, d: 26 }, // กว้าง, สูง, ลึก (เมตร)
    roofColor: 0x4673886,
    accentColor: 0xd32f2f,
    floors: [
      { num: 1, desc: "แผนกอุบัติเหตุและฉุกเฉิน (ER), ชานชาลารถพยาบาล 1669" },
      { num: 2, desc: "งานประกันสุขภาพและยุทธศาสตร์" }
    ]
  }
];
```

### ขั้นตอนที่ 3: ขึ้นรูปทรง 3D แบบ Procedural (Procedural Massing)
การสร้างรูปทรงอาคารด้วยโค้ดทำให้โหลดเร็วและแก้ไขขนาดได้ยืดหยุ่น:
```javascript
// 1. ผนังอาคารหลัก
const wallGeo = new THREE.BoxGeometry(w, h, d);
const wallMesh = new THREE.Mesh(wallGeo, wallMaterial);
wallMesh.position.y = h / 2;
wallMesh.castShadow = true;
wallMesh.receiveShadow = true;

// 2. หลังคาหน้าจั่ว (Gable Roof)
const roofShape = new THREE.Shape();
roofShape.moveTo(-w / 2, 0);
roofShape.lineTo(0, roofHeight);
roofShape.lineTo(w / 2, 0);
roofShape.closePath();

const extrudeSettings = { depth: d, bevelEnabled: false };
const roofGeo = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
const roofMesh = new THREE.Mesh(roofGeo, roofMaterial);
roofMesh.position.set(0, h, -d / 2);
```

### ขั้นตอนที่ 4: ตั้งค่าระบบแสงเงาระดับสถาปัตยกรรม (Lighting & Tonemapping)
เพื่อให้ภาพออกมานุ่มนวลเหมือนโมเดลสถาปัตยกรรมโมเดิร์น (Architectural Clay Diorama):
```javascript
// 1. เปิดใช้ ACESFilmic Tone Mapping และ Soft Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.90;

// 2. แสงแดดส่องทแยงพร้อมขอบเขตเงานุ่ม
const sunLight = new THREE.DirectionalLight(0xfff4e6, 1.65);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.bias = -0.0001;

// 3. แสงกระเจิงท้องฟ้า (Hemisphere Sky/Ground Bounce)
const hemiLight = new THREE.HemisphereLight(0xdce7f2, 0x64748b, 0.45);
```

### ขั้นตอนที่ 5: ฉายพิกัด 3D สู่ป้ายชื่อ HTML (3D to 2D HUD Projection)
เชื่อมโยงจุด Anchor บนหลังคาอาคารเข้ากับป้าย Pin HTML และเส้น SVG:
```javascript
function updateLabelPositions() {
  const tempV = new THREE.Vector3();
  
  labelElements.forEach(({ element, anchorObj }) => {
    anchorObj.getWorldPosition(tempV);
    
    // ฉายพิกัด 3D สู่ Normalized Device Coordinates (-1 ถึง +1)
    tempV.project(camera);
    
    // แปลงเป็นพิกัดพิกเซลบนหน้าจอ
    const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(tempV.y * 0.5) + 0.5) * window.innerHeight;
    
    element.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
  });
}
```

### ขั้นตอนที่ 6: ระบบมุมกล้องและการเลือกอาคาร (Camera Orbit & Easing)
เมื่อคลิกอาคาร ให้กล้องลอยเข้าไปโฟกัสอย่างนุ่มนวลด้วย TWEEN:
```javascript
new TWEEN.Tween(controls.target)
  .to({ x: targetX, y: targetY, z: targetZ }, 1100)
  .easing(TWEEN.Easing.Cubic.Out)
  .start();

new TWEEN.Tween(camera.position)
  .to({ x: camX, y: camY, z: camZ }, 1100)
  .easing(TWEEN.Easing.Cubic.Out)
  .start();
```

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
kmlsfloor/
├── index.html            # โครงสร้างหน้าเว็บหลักและ UI Overlay
├── style.css             # ตกแต่ง Glassmorphism, แผงควบคุม, และ Responsive Layout
├── main.js               # Logic หลัก: Three.js Scene, Procedural Mesh, แสงเงา และ Event Handlers
├── .gitignore            # ไฟล์คัดกรองสำหรับ Git Repository
├── README.md             # เอกสารแนะนำและคู่มือการพัฒนา
├── plan/
│   └── 1_kmls_3d_building_plan # แผนแม่บทการพัฒนา 3D สถาปัตยกรรมและรายละเอียดมิติ
└── img/
    ├── floor.png         # ภาพแปลนพิมพ์เขียวอาคารอ้างอิง
    ├── maps.png          # ภาพถ่ายทางอากาศมุมกว้าง
    ├── maps2.png         # ภาพถ่ายดาวเทียมความละเอียดสูง (Google Earth Calibrated)
    └── ...               # ภาพสแกนพื้นที่เฉพาะโซน
```

---

## 💻 วิธีการติดตั้งและรันโปรเจกต์ (Getting Started)

เนื่องจากโปรเจกต์นี้พัฒนาด้วย **Pure Vanilla Web Technologies (HTML/JS/CSS)** จึงไม่จำเป็นต้องคอมไพล์หรือติดตั้ง `npm install` ใดๆ ทั้งสิ้น:

### วิธีที่ 1: รันด้วย Python (แนะนำ สะดวกและรวดเร็ว)
```bash
# Clone โปรเจกต์ลงเครื่อง
git clone https://github.com/witsanu-dev/kmls-digitaltwin.git

# เข้าสู่โฟลเดอร์
cd kmls-digitaltwin

# เริ่ม Local HTTP Server ด้วย Python
python -m http.server 8080
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:8080`

### วิธีที่ 2: รันด้วย Node.js (`npx serve` หรือ `http-server`)
```bash
npx serve .
# หรือ
npx http-server -p 8080
```

### วิธีที่ 3: ใช้ VS Code Live Server
1. เปิดโฟลเดอร์โปรเจกต์ด้วย Visual Studio Code
2. ติดตั้ง Extension **Live Server**
3. คลิกขวาที่ไฟล์ `index.html` แล้วเลือก **"Open with Live Server"**

---

## 🎮 คู่มือการควบคุม (User Controls & Keybindings)

- **คลิกซ้าย + ลาก**: หมุนมุมมองรอบโครงการ (Orbit Rotate)
- **คลิกขวา + ลาก**: เลื่อนระนาบมุมมอง (Pan)
- **หมุนล้อเมาส์**: ซูมเข้า - ซูมออกอย่างอิสระ (Smooth Zoom)
- **ดับเบิลคลิกบนจุดใดๆ**: กล้องจะซูมเข้าสู่จุดที่คลิกทันที (Double-Click Jump)
- **คลิกที่อาคาร หรือ ป้ายชื่อ**: โฟกัสอาคาร เปิดแผงรายละเอียด และสถิติข้อมูล
- **กดปุ่ม `H` หรือปุ่ม "เต็มจอ"**: สลับโหมดเต็มจอ / ซ่อนแถบควบคุมเพื่อการนำเสนอ
- **กดปุ่มโลโก้โรงพยาบาล**: รีเซ็ตมุมมองกลับสู่จุดมาตรฐานหน้าตึก ER/OPD

---

## 🤝 การนำไปประยุกต์ใช้และต่อยอด (Adaptation & Extensions)

คุณสามารถนำโปรเจกต์นี้ไปต่อยอดในบริบทต่างๆ ได้อย่างง่ายดาย:
1. **IoT Sensor Integration**: ดึงข้อมูลอุณหภูมิ, คุณภาพอากาศ (PM2.5), หรือสถานะการใช้ไฟฟ้าผ่าน WebSocket/REST API แล้วแสดงผลบนอาคารแบบ Real-time
2. **CCTV Live Preview**: ผูกตำแหน่งกล้องวงจรปิด 3D เข้ากับหน้าต่างสตรีมภาพสด
3. **Emergency Navigation**: จำลองเส้นทางหนีไฟ หรือเส้นทางนำส่งผู้ป่วยฉุกเฉิน
4. **Energy Management (BEMs)**: แสดงความร้อนของอาคาร (Heatmap) อิงตามการใช้พลังงานแอร์และไฟฟ้า

---

## 📄 ลิขสิทธิ์ (License)

โปรเจกต์นี้เผยแพร่ภายใต้ใบอนุญาต **[MIT License](LICENSE)** สามารถนำไปศึกษา ดัดแปลง ใช้งาน และพัฒนาต่อยอดได้อย่างอิสระ

---

<div align="center">
  พัฒนาเพื่อเป็นวิทยาทานและต้นแบบระบบดิจิทัลทวินสำหรับองค์กรไทย<br>
  <b>โรงพยาบาลกมลาไสย จ.กาฬสินธุ์</b>
</div>
