# 🤖 Master Prompt สำหรับสั่ง Agentic AI สร้าง 3D Digital Twin
### (Universal Master Prompt for AI Coding Assistants: Antigravity, Claude Code, Cursor, Windsurf, Copilot, ChatGPT)

> คัดลอกข้อความ Prompt ด้านล่างนี้ไปวางในเครื่องมือ AI เพื่อให้ AI สร้างระบบ 3D Smart Building Digital Twin ทั้งหมดตามมาตรฐานของโครงการนี้ได้ทันที

---

```markdown
คุณคือ Senior Creative 3D WebGL Developer และ Software Architect ที่เชี่ยวชาญ Three.js, Vanilla JavaScript, และ Modern UI Design

เป้าหมายของคุณคือการสร้างเว็บแอปพลิเคชัน "3D Smart Facility Digital Twin Dashboard" แบบ Interactive เสมือนจริง 100% บนเว็บเบราว์เซอร์ โดยจำลองผังอาคาร โครงสร้างสถาปัตยกรรม และระบบควบคุมอัจฉริยะ สำหรับ [ใส่ชื่อสถานที่ของคุณ เช่น โรงพยาบาล... / มหาวิทยาลัย... / โรงงาน...]

โปรดพัฒนาโดยยึดหลักเกณฑ์และสถาปัตยกรรมเชิงเทคนิคมาตรฐานดังต่อไปนี้:

### 1. ปรัชญาและข้อกำหนดด้านเทคนิค (Core Technical Constraints)
- **100% Procedural Geometry**: ห้ามใช้โมเดลไฟล์ 3D ภายนอกขนาดใหญ่ (.gltf, .fbx, .obj) เพื่อให้โหลดได้ทันทีแบบ Zero-lag (Instant Loading) น้ำหนักเบา และแสดงผลลื่นไหล 60 FPS บนทุกอุปกรณ์
- **Pure Web Standards**: ใช้ HTML5, Vanilla CSS (Glassmorphism), และ Vanilla JavaScript (ES6+) ร่วมกับ Three.js (r128), OrbitControls, และ TWEEN.js ผ่าน CDN โดยไม่ต้องใช้ build tools หรือติดตั้ง npm dependencies
- **Aesthetic Style (Architectural Clay Diorama)**: สุนทรียศาสตร์แบบโมเดลสถาปัตยกรรมจำลอง สะอาดตา ผนังคอนกรีตคลีนโทนสว่างนวล หลังคาตัดสีเอกลักษณ์ประจำอาคาร กระจกสะท้อนเงาคมชัด และขอบอาคารมีมิติ

### 2. ระบบพิกัดและการจัดผัง (3D Coordinate System)
- กำหนดจุดกึ่งกลางของพื้นที่โครงการเป็น (X: 0, Z: 0) บนระนาบ Y=0
- สเกลมาตรฐาน: 1 หน่วย Three.js = 1 เมตรจริง
- แกน +X = ทิศตะวันออก, -X = ทิศตะวันตก, +Y = ความสูง, +Z = ทิศใต้, -Z = ทิศเหนือ (หน้าโครงการ / ถนนใหญ่)
- สร้างพื้นดิน (Ground Plinth), ถนนสายหลักยางมะตอย, วงเวียน, ทางเดินเท้า, และสระน้ำ/สวนหย่อม

### 3. การสร้างอาคารและสิ่งปลูกสร้าง (Procedural Architectural Massing)
สร้างฟังก์ชันการสร้างอาคารด้วย Three.js Code โดยแยกกลุ่มวัตถุ (THREE.Group) และรองรับโครงสร้างแบบเป็นชั้น (Floors Hierarchy):
- **Base Massing**: ใช้ THREE.BoxGeometry สำหรับผนังและเสา
- **Roofs**: 
  - หลังคาหน้าจั่ว (Gable Roof): ใช้ THREE.Shape และ THREE.ExtrudeGeometry
  - หลังคาปั้นหยา (Hip Roof) และหลังคาเรียบพร้อมขอบกันตก (Flat Parapet)
- **Architectural Details**: ซุ้มทางเข้า (Canopy/Portico), ทางลาดรถพยาบาล/รถเข็น (Ramp), ระเบียงยื่น (Balcony), แผงระแนงบังแดด (Louvers), บันได และกระจกหน้าต่างแนวยาว (Ribbon Windows)
- **Covered Walkways**: โครงข่ายทางเดินมีหลังคาคลุมเชื่อมต่อระหว่างอาคาร พร้อมเสาค้ำคู่เป็นระยะ

### 4. ระบบแสงเงาและบรรยากาศ (Realistic Lighting Engine)
- **Renderer Settings**:
  - renderer.shadowMap.enabled = true
  - renderer.shadowMap.type = THREE.PCFSoftShadowMap
  - renderer.toneMapping = THREE.ACESFilmicToneMapping
  - renderer.toneMappingExposure = 0.90
- **Lighting Setup**:
  - THREE.DirectionalLight (ดวงอาทิตย์): สี #fff4e6, Intensity 1.65, ตั้งมุม Azimuth -40°, Elevation 48° ส่องทแยงให้เกิดเงาทอดยาวสวยงาม ขอบเงานุ่มนวล ไม่แตก
  - THREE.HemisphereLight (แสงสะท้อนท้องฟ้า-พื้น): สีท้องฟ้า #dce7f2, สีพื้น #64748b, Intensity 0.45
  - THREE.Fog / FogExp2: สีเข้ากับพื้นหลัง สร้างมิติความลึก (Depth Cue)
- **Day / Night Engine**:
  - กลลางวัน: ท้องฟ้าสว่าง แสงแดดสดใส อบอุ่น
  - กลางคืน: ท้องฟ้าสีน้ำเงินเข้ม แสงจันทร์นวลตา และหน้าต่าง/ป้ายไฟปรับ emissiveIntensity เรืองแสงสีทองส้ม 24 ชั่วโมง

### 5. มุมกล้องและระบบควบคุม (Camera & Presets)
- OrbitControls พร้อม Damping (dampingFactor: 0.08), จำกัด maxPolarAngle เพื่อไม่ให้มุมกล้องมุดลงใต้ดิน
- กำหนดมุมมองเริ่มต้น (Startup View): ให้วางตำแหน่งกล้องมองเข้าสู่ "ด้านหน้าอาคารหลัก" (จากทิศเหนือมองลงทิศใต้) ด้วยมุมกดสถาปัตยกรรม 30°-35° ระยะกำลังพอดีเห็นซุ้มทางเข้า ทางลาด และบริบทแวดล้อม
- ดับเบิลคลิกบนจุดใดๆ ในฉาก: กล้องจะซูมเข้าสู่จุดนั้นอย่างราบรื่น (Smooth Zoom Jump)
- เมื่อคลิกเลือกอาคาร: ใช้ TWEEN.js เคลื่อนกล้อง Orbit เข้าไปโฟกัสด้านหน้าอาคารอย่างนุ่มนวล (Cinematic Easing)

### 6. ส่วนติดต่อผู้ใช้และหมุด 3D (Interactive HUD & Leader Pins)
- **Dynamic 3D Pins & SVG Leader Stalks**:
  - สร้างจุด Anchor เหนือหลังคาแต่ละอาคาร
  - ฉายพิกัด 3D สู่หน้าจอ 2D (Vector3.project(camera)) ใน render loop
  - แสดงหมุดป้ายชื่อ HTML ลอยตามอาคาร พร้อมลากเส้น SVG Curve เชื่อมจากตัวอาคารขึ้นสู่หมุดแบบเรียลไทม์
- **Modern Glassmorphism UI**:
  - แถบเมนูด้านบน (Top Bar): โลโก้, ช่องค้นหาอาคาร, นาฬิกาดิจิทัล, ปุ่มปรับแสง, ปุ่มเต็มจอ
  - แผงรายละเอียดด้านขวา (Detail Slide Panel): แสดงชื่ออาคาร, แผนกบริการ, ผังจำลองแต่ละชั้น, สถิติผู้ใช้งาน, และปุ่มเปิดดูผังแยกชั้น (Exploded Floor View)
  - แถบควบคุมมุมมองด้านล่าง (Bottom Toolbar): ปุ่มรีเซ็ตภาพรวม, ปุ่มหมุน 360° (Turntable), ปุ่มเปิด-ปิดป้ายชื่อ, ปุ่มเปิด-ปิดทางเชื่อม, ปุ่มสลับโหมดกลางวัน/กลางคืน
  - แผงปรับแสงแดด (Sun & Light Popover): สไลเดอร์ปรับ Azimuth, Elevation, Sun Power, และปุ่ม Preset แสง (เช้า, เที่ยง, เย็น, ค่ำ)

โปรดส่งมอบโค้ดที่สมบูรณ์ สะอาด มีคอมเมนต์อธิบาย แยกโครงสร้างอย่างเป็นระบบ พร้อมเปิดทำงานผ่านเบราว์เซอร์ได้ทันที!
```

---

## 💡 ตัวอย่าง Prompt ย่อยเฉพาะทาง (Specialized Micro-Prompts)

### 1. คำสั่งเพิ่มอาคารใหม่ตามพิกัดและฟังก์ชัน
```markdown
ช่วยเพิ่มอาคารใหม่ลงใน HOSPITAL_BUILDINGS และสร้างฟังก์ชัน 3D Procedural Mesh:
- รหัสอาคาร: BLD-HEMO (ศูนย์ไตเทียมและฟอกเลือด)
- พิกัด: X = 28, Z = -15, หมุนองศา Y = -0.196 rad
- ขนาด: กว้าง 18m, สูง 7.5m (2 ชั้น), ลึก 24m
- สถาปัตยกรรม: ผนังสีขาวนวล, หลังคาสีน้ำเงินทางการแพทย์, มีทางลาดชันสำหรับรถเข็นเชื่อมต่อกับถนนด้านหน้าโดยไม่ล้นทับเลนจราจร
- ภายใน: ชั้น 1 หน่วยฟอกเลือด 16 เตียง, ชั้น 2 ห้องพักแพทย์และห้องประชุม
```

### 2. คำสั่งปรับจูนมุมกล้องตอนเปิดระบบ
```markdown
โปรดปรับค่าใน VIEW_PRESETS.overview ให้จุดโฟกัสตอนเปิดระบบหันหน้าเข้าหาหน้าตึก ER และ OPD จากฝั่งถนนใหญ่หน้าโครงการ:
- Target: กึ่งกลางหน้าอาคาร ER/OPD ที่ระดับสายตา
- Position: ลอยอยู่ทิศเหนือมุมกด 32 องศา ระยะห่าง 75 เมตร
- มองเห็นทางลาดรถพยาบาลฉุกเฉิน ซุ้มประตูบานเลื่อน OPD และเห็นอาคารผู้ป่วยในตระหง่านอยู่ด้านหลัง
- ให้ปุ่ม Brand Reset ด้านบนวิ่งกลับมามุมนี้เช่นเดียวกัน
```

### 3. คำสั่งเชื่อมโยงข้อมูลเซนเซอร์ IoT หรือ API แบบ Real-time
```markdown
ต้องการเชื่อมโยงข้อมูลจาก REST API / WebSocket เข้ากับอาคารในโลก 3 มิติ:
- จำลองฟังก์ชัน fetchSensorData() ดึงค่าอุณหภูมิ, ความชื้น, และจำนวนผู้รับบริการ
- นำตัวเลขมาแสดงผลบนป้าย Pin 3D และในการ์ดสถิติของอาคารนั้นๆ
- หากค่าสถานะมีเหตุฉุกเฉิน (Status: Emergency) ให้เปิดไฟกะพริบสีแดง (Red Strobe Light) บนยอดตึกนั้นทันที
```
