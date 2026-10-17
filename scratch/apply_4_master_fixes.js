const fs = require('fs');

let mainJs = fs.readFileSync('main.js', 'utf8');

// ============================================================================
// 1. REQUIREMENT 2 (PART A): 
//    Update bld-b1-female in HOSPITAL_BUILDINGS (expand width to 34m, center lx=21.0, lz=-14.0)
//    pos: { x: 23.32, y: 0, z: -9.60 }
// ============================================================================
const oldB1Block = `  {
    "id": "bld-b1-female",
    "code": "BLD-B1",
    "name": "ตึกผู้ป่วยในหญิง (Female IPD Ward)",
    "shortName": "ตึกผู้ป่วยในหญิง",
    "sub": "อาคาร 2 ชั้น หลังคาเขียวมรกต (ด้านขวาของผังตาม floor.png) · มีทางลงข้างตึกเชื่อมต่อเส้นทางจราจรฝั่งขวา",
    "category": "หออภิบาลผู้ป่วยใน",
    "status": "เปิดให้บริการ 24 ชม.",
    "pos": {
      "x": 18.42,
      "y": 0,
      "z": -10.62
    },
    "rotY": -0.196,
    "cameraOffset": {
      "x": 0,
      "y": 30,
      "z": 38
    },
    "anchorHeight": 12,
    "dimensions": {
      "w": 24,
      "h": 8.2,
      "d": 13.5
    },`;

const newB1Block = `  {
    "id": "bld-b1-female",
    "code": "BLD-B1",
    "name": "ตึกผู้ป่วยในหญิง (Female IPD Ward)",
    "shortName": "ตึกผู้ป่วยในหญิง",
    "sub": "อาคาร 2 ชั้น หลังคาเขียวมรกต ขยายอาคารพร้อมทางลงลาดชันติดเส้นทางจราจรฝั่งขาออกอย่างมีมาตรฐาน",
    "category": "หออภิบาลผู้ป่วยใน",
    "status": "เปิดให้บริการ 24 ชม.",
    "pos": {
      "x": 23.32,
      "y": 0,
      "z": -9.6
    },
    "rotY": -0.196,
    "cameraOffset": {
      "x": 0,
      "y": 30,
      "z": 38
    },
    "anchorHeight": 12,
    "dimensions": {
      "w": 34,
      "h": 8.2,
      "d": 13.5
    },`;

if (mainJs.includes(oldB1Block)) {
  mainJs = mainJs.replace(oldB1Block, newB1Block);
  console.log('1. bld-b1-female expanded in HOSPITAL_BUILDINGS.');
} else {
  const normOldB1 = oldB1Block.replace(/\r\n/g, '\n');
  const normMain = mainJs.replace(/\r\n/g, '\n');
  if (normMain.includes(normOldB1)) {
    mainJs = normMain.replace(normOldB1, newB1Block.replace(/\r\n/g, '\n'));
    console.log('1. bld-b1-female expanded (normalized).');
  } else {
    console.error('Failed to locate oldB1Block');
    process.exit(1);
  }
}

// ============================================================================
// 2. REQUIREMENT 2 (PART B): 
//    Update buildGreenGableWard for gender === 'female':
//    Direct sloped ramp from east wall (w/2) extending eastward to road curb (w/2 + 8.0, lx=46.0)
// ============================================================================
const oldFemaleRampTarget = `  // Requirement 5: ทางลงข้างตึกผู้ป่วยในหญิง (แนวนอนติดผนังฝั่งขวา ตัดเชื่อมกับเส้นทางจราจรฝั่งขาออกอย่างสวยงาม)
  if (gender === 'female') {
    const rampGroup = new THREE.Group();
    const rampW = 2.4; // standard wide hospital gurney corridor
    const rampLen = 16.0; // runs horizontally along the building wall
    const landingH = 1.0; // elevated door landing

    // 1. Door Landing Platform (ชานชาลาหน้าประตูทางออกข้างตึก)
    const doorLanding = new THREE.Mesh(
      new THREE.BoxGeometry(rampW, 0.25, 3.6),
      new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.75 })
    );
    doorLanding.position.set(w / 2 + rampW / 2 + 0.05, landingH, -rampLen / 2 + 1.8);
    doorLanding.receiveShadow = true;
    rampGroup.add(doorLanding);

    // 2. Longitudinal concrete ramp running horizontally along outer east wall (ทางลงแนวนอนติดผนัง)
    const rampSlab = new THREE.Mesh(
      new THREE.BoxGeometry(rampW, 0.24, rampLen - 3.6),
      new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.75 })
    );
    rampSlab.position.set(w / 2 + rampW / 2 + 0.05, landingH / 2, 1.8);
    rampSlab.rotation.x = 0.076; // gentle gurney/wheelchair slope descending southwards to y=0.08
    rampSlab.receiveShadow = true;
    rampGroup.add(rampSlab);

    // Wall-mounted and outer stainless steel handrails with safety balusters
    const railMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.2 });
    for (let rx of [w / 2 + 0.15, w / 2 + rampW - 0.15]) {
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, rampLen), railMat);
      topRail.position.set(rx, landingH + 0.9, 0);
      topRail.rotation.x = 0.06;
      rampGroup.add(topRail);

      for (let rz = -rampLen / 2 + 1.0; rz <= rampLen / 2; rz += 2.5) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.95, 8), railMat);
        const py = Math.max(0.48, landingH - (rz + rampLen / 2 - 3.6) * 0.076 + 0.48);
        post.position.set(rx, py, rz);
        rampGroup.add(post);
      }
    }

    // 3. Wide concrete connector apron turning outward directly into outbound road (ตัดเชื่อมกับทางจราจรฝั่งขาออก)
    // Connects from outer ramp edge across courtyard to outbound road curb
    const roadConnect = new THREE.Mesh(
      new THREE.BoxGeometry(18.0, 0.18, 5.0),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85 })
    );
    roadConnect.position.set(w / 2 + rampW + 9.0, 0.09, rampLen / 2 + 0.5);
    roadConnect.receiveShadow = true;
    rampGroup.add(roadConnect);

    // High-visibility yellow safety tactile boundary strips
    const tactile = new THREE.Mesh(
      new THREE.BoxGeometry(18.0, 0.04, 0.35),
      new THREE.MeshBasicMaterial({ color: 0xfacc15 })
    );
    tactile.position.set(w / 2 + rampW + 9.0, 0.19, rampLen / 2 + 3.0);
    rampGroup.add(tactile);

    floorGroup1.add(rampGroup);
  }`;

const newFemaleRampCode = `  // ข้อ 2: ทางลงลาดชันข้างตึกผู้ป่วยในหญิง ยื่นติดกับเส้นทางจราจรทางเข้าฝั่งขาออกอย่างมีมาตรฐาน
  if (gender === 'female') {
    const rampGroup = new THREE.Group();
    const landingH = 0.88; // ระดับชานชาลาประตูทางออก
    const rampW = 3.2; // ความกว้างช่องทางลาดรถเข็น/เตียงผู้ป่วย
    const rampReach = 8.0; // ยื่นจากผนังด้านทิศตะวันออก (w/2) ไปบรรจบขอบถนนฝั่งขาออกที่ lx=46.0 พอดี

    // 1. ชานชาลาหน้าประตูทางออกทิศตะวันออก (Door Landing Platform)
    const doorLanding = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.22, rampW),
      new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.75 })
    );
    doorLanding.position.set(w / 2 + 0.8, landingH - 0.11, 0);
    doorLanding.receiveShadow = true;
    rampGroup.add(doorLanding);

    // ประตูทางออกฉุกเฉิน/เคลื่อนย้ายผู้ป่วย
    const exitDoor = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.2, 1.8), windowMat);
    exitDoor.position.set(w / 2 + 0.02, 1.1, 0);
    floorGroup1.add(exitDoor);

    const exitCanopy = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.15, 2.4), fasciaMat);
    exitCanopy.position.set(w / 2 + 0.9, 2.4, 0);
    floorGroup1.add(exitCanopy);

    // 2. ทางลาดชันคอนกรีตเชื่อมตรงลงสู่เส้นทางจราจรฝั่งขาออก (Direct Sloped Ramp descending East to Road)
    // สโลปจาก y=landingH ลงสู่ y=0 แนบสนิทกับขอบทางจราจรฝั่งขาออกที่ lx=46.0
    const rampSlopeLen = rampReach - 1.2;
    const slopeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(rampSlopeLen, 0.18, rampW),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 })
    );
    slopeMesh.position.set(w / 2 + 1.2 + rampSlopeLen / 2, landingH / 2, 0);
    slopeMesh.rotation.z = -Math.atan2(landingH, rampSlopeLen); // สโลปสม่ำเสมอลงสู่ผิวถนนพอดี
    slopeMesh.receiveShadow = true;
    rampGroup.add(slopeMesh);

    // 3. ราวสแตนเลสกันตกทั้งสองข้างของทางลาด (Dual Stainless Steel Handrails)
    const railMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.85, roughness: 0.2 });
    [-rampW / 2 + 0.1, rampW / 2 - 0.1].forEach(rz => {
      for (let rx = 0.5; rx <= rampReach; rx += 1.8) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.9, 8), railMat);
        const py = Math.max(0.45, landingH * (1.0 - rx / rampReach) + 0.45);
        post.position.set(w / 2 + rx, py, rz);
        rampGroup.add(post);
      }
      const rail = new THREE.Mesh(new THREE.BoxGeometry(rampReach, 0.05, 0.05), railMat);
      rail.position.set(w / 2 + rampReach / 2, landingH / 2 + 0.9, rz);
      rail.rotation.z = -Math.atan2(landingH, rampSlopeLen);
      rampGroup.add(rail);
    });

    // 4. แถบเตือนสีเหลืองสะท้อนแสงบริเวณรอยต่อผิวทางจราจร
    const tactileEnd = new THREE.Mesh(
      new THREE.PlaneGeometry(0.4, rampW),
      new THREE.MeshBasicMaterial({ color: 0xfacc15 })
    );
    tactileEnd.rotation.x = -Math.PI / 2;
    tactileEnd.position.set(w / 2 + rampReach - 0.2, 0.045, 0);
    rampGroup.add(tactileEnd);

    floorGroup1.add(rampGroup);
  }`;

if (mainJs.includes(oldFemaleRampTarget)) {
  mainJs = mainJs.replace(oldFemaleRampTarget, newFemaleRampCode);
  console.log('2. Female ward ramp updated to slope directly onto outbound road.');
} else {
  const normOldRamp = oldFemaleRampTarget.replace(/\r\n/g, '\n');
  const normMain2 = mainJs.replace(/\r\n/g, '\n');
  if (normMain2.includes(normOldRamp)) {
    mainJs = normMain2.replace(normOldRamp, newFemaleRampCode.replace(/\r\n/g, '\n'));
    console.log('2. Female ward ramp updated (normalized).');
  } else {
    console.error('Failed to locate oldFemaleRampTarget');
    process.exit(1);
  }
}

// ============================================================================
// 3. REQUIREMENT 3 (PART A): 
//    เอาทางเชื่อมหน้าตึกผู้ป่วยใน 5 ชั้นออก
//    In buildWalkwaysNetwork(): Remove addWalkwaySegment(16.0, 7.25, 16.0, -7.25, 3.2, 3.6);
// ============================================================================
const oldFrontWalkwayTarget = `  // 4. ทางเชื่อมเข้าสู่มุขหน้าอาคารผู้ป่วยใน 5 ชั้น
  addWalkwaySegment(16.0, 7.25, 16.0, -7.25, 3.2, 3.6);`;

const newFrontWalkwayCode = `  // ข้อ 3: เอาทางเชื่อมหน้าตึกผู้ป่วยใน 5 ชั้นออกตามคำสั่งของผู้ใช้ เพื่อเปิดโล่งภูมิทัศน์หน้าอาคาร`;

if (mainJs.includes(oldFrontWalkwayTarget)) {
  mainJs = mainJs.replace(oldFrontWalkwayTarget, newFrontWalkwayCode);
  console.log('3. Connecting walkway in front of IPD 5 removed.');
} else {
  const normOldWalk = oldFrontWalkwayTarget.replace(/\r\n/g, '\n');
  const normMain3 = mainJs.replace(/\r\n/g, '\n');
  if (normMain3.includes(normOldWalk)) {
    mainJs = normMain3.replace(normOldWalk, newFrontWalkwayCode.replace(/\r\n/g, '\n'));
    console.log('3. Connecting walkway in front of IPD 5 removed (normalized).');
  } else {
    console.warn('Could not locate oldFrontWalkwayTarget');
  }
}

// ============================================================================
// 4. REQUIREMENT 1, 2 (Speed Bump), 3 (Close Front Road), and 4 (Remove Rear Road):
//    In buildInternalRoadNetwork()
// ============================================================================

// 4.1 Item 1: เพิ่มหลังคาจุดรับบริการขนาดกว้างข้างตึก ER ตามแนวผังอย่างมีมาตรฐาน
const oldSvcTarget = `  // Modern Service Kiosk Walls
  const svcWalls = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.8, 2.8),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
  );
  svcWalls.position.y = 1.51;`;

const newSvcCode = `  // ==========================================================================
  // ข้อ 1: หลังคาจุดรับบริการขนาดกว้างข้างตึก ER ตามแนวผังอย่างมีมาตรฐาน (Grand Service Reception Canopy)
  //       คลุมจุดบริการสีฟ้า ลานคัดกรองผู้ป่วย และจุดรับ-ส่งข้างตึก ER อย่างสมบูรณ์
  // ==========================================================================
  const svcCanopyGroup = new THREE.Group();

  // 4 เสาโครงสร้างเหล็กกล่องสีเทาเข้ม C-Channel รองรับหลังคาขนาดกว้าง (กว้าง 11.0m, ลึก 7.0m, สูง 4.0m)
  const canopyPostMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.25 });
  for (let px of [-5.0, 5.0]) {
    for (let pz of [-3.2, 3.2]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.0, 0.24), canopyPostMat);
      col.position.set(px, 2.0, pz);
      col.castShadow = true;
      svcCanopyGroup.add(col);

      // ฐานเสาคานคอนกรีต
      const bPlinth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
      bPlinth.position.set(px, 0.15, pz);
      svcCanopyGroup.add(bPlinth);
    }
  }

  // โครงคานเหล็กรับหลังคา (Perimeter Trusses)
  [-3.2, 3.2].forEach(pz => {
    const beamX = new THREE.Mesh(new THREE.BoxGeometry(10.4, 0.22, 0.22), canopyPostMat);
    beamX.position.set(0, 3.9, pz);
    svcCanopyGroup.add(beamX);
  });
  [-5.0, 5.0].forEach(px => {
    const beamZ = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 6.6), canopyPostMat);
    beamZ.position.set(px, 3.9, 0);
    svcCanopyGroup.add(beamZ);
  });

  // ผืนหลังคาคลุมขนาดกว้างสีขาว-ฟ้าการแพทย์ (Wide Architectural Service Canopy Roof, 11.6m x 7.4m)
  const canopyRoofSlab = new THREE.Mesh(
    new THREE.BoxGeometry(11.6, 0.18, 7.4),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 })
  );
  canopyRoofSlab.position.y = 4.05;
  canopyRoofSlab.castShadow = true;
  svcCanopyGroup.add(canopyRoofSlab);

  // ป้ายแถบสีฟ้าสัญลักษณ์จุดรับบริการ (Service Kiosk Canopy Identity Fascia)
  const fasciaBand = new THREE.Mesh(
    new THREE.BoxGeometry(11.7, 0.55, 7.5),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 })
  );
  fasciaBand.position.y = 4.3;
  svcCanopyGroup.add(fasciaBand);

  // ป้ายข้อความไฟเรืองแสงด้านหน้า "จุดรับบริการและคัดกรองผู้ป่วย (Patient Service & Triage Reception)"
  const signMeshFront = new THREE.Mesh(
    new THREE.PlaneGeometry(8.5, 0.45),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xe0f2fe, emissiveIntensity: 1.2 })
  );
  signMeshFront.position.set(0, 4.3, -3.76);
  signMeshFront.rotation.y = Math.PI;
  svcCanopyGroup.add(signMeshFront);

  // โคมไฟดาวน์ไลท์ LED ฝังฝ้า 6 ดวง ส่องสว่างจุดบริการตลอด 24 ชม.
  const downlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffedd5, emissiveIntensity: 1.8 });
  for (let dx of [-3.5, 0, 3.5]) {
    for (let dz of [-1.8, 1.8]) {
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 12), downlightMat);
      lamp.position.set(dx, 3.95, dz);
      svcCanopyGroup.add(lamp);
    }
  }

  // ม้านั่งรอรับบริการใต้หลังคา (Waiting Benches)
  const benchMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
  for (let bz of [-1.5, 1.5]) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.45, 0.5), benchMat);
    bench.position.set(-3.2, 0.25, bz);
    svcCanopyGroup.add(bench);
  }

  svc.add(svcCanopyGroup);

  // Modern Service Kiosk Walls
  const svcWalls = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.8, 2.8),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
  );
  svcWalls.position.y = 1.51;`;

if (mainJs.includes(oldSvcTarget)) {
  mainJs = mainJs.replace(oldSvcTarget, newSvcCode);
  console.log('4.1 Wide service reception canopy added beside ER.');
} else {
  const normOldSvc = oldSvcTarget.replace(/\r\n/g, '\n');
  const normMain4 = mainJs.replace(/\r\n/g, '\n');
  if (normMain4.includes(normOldSvc)) {
    mainJs = normMain4.replace(normOldSvc, newSvcCode.replace(/\r\n/g, '\n'));
    console.log('4.1 Wide service reception canopy added (normalized).');
  } else {
    console.error('Failed to locate oldSvcTarget');
    process.exit(1);
  }
}

// 4.2 Items 3 & 4: ปิดเส้นทางจราจรหน้าตึก 5 ชั้นจนถึงจิตเวช 2 และเอาเส้นทางจราจรหลังตึก 5 ชั้นออก
const oldIpdRoadsTarget = `  // 2. IPD 5 Front Loop Road (ถนนวงแหวนหน้าตึกผู้ป่วยใน 5 ชั้น, กว้าง 6.5m, z = 3.5)
  // เชื่อมต่อจากลานคอร์ทยาร์ดและงานซ่อมบำรุง (x = -10.0) ข้ามหน้าตึก 5 ชั้น เชื่อมต่อถนนฝั่งขวา (x = 50.0) อย่างแนบสนิท
  const ipdFrontRoad = new THREE.Mesh(new THREE.PlaneGeometry(60.0, 6.5), roadMat);
  ipdFrontRoad.rotation.x = -Math.PI / 2;
  ipdFrontRoad.position.set(20.0, 0.031, 3.5);
  ipdFrontRoad.receiveShadow = true;
  roadGroup.add(ipdFrontRoad);
  addDashLine(-10.0, 3.5, 50.0, 3.5, 5);

  // 3. IPD 5 Rear Loop Road (ถนนวงแหวนหลังตึกผู้ป่วยใน 5 ชั้น, กว้าง 6.5m, z = 33.5)
  // เชื่อมต่อจากกลุ่มอาคารโรงครัว/ซักฟอกและตึกเด็ก (x = -16.0) ข้ามหลังตึก 5 ชั้น บรรจบถนนฝั่งขวา (x = 50.0) อย่างมีมาตรฐาน
  const ipdRearLoop = new THREE.Mesh(new THREE.PlaneGeometry(66.0, 6.5), roadMat);
  ipdRearLoop.rotation.x = -Math.PI / 2;
  ipdRearLoop.position.set(17.0, 0.031, 33.5);
  ipdRearLoop.receiveShadow = true;
  roadGroup.add(ipdRearLoop);
  addDashLine(-16.0, 33.5, 50.0, 33.5, 5);

  // Smooth Intersection Turn Fillets connecting loop roads to Eastern Thoroughfare
  addRoadPoly([[46.25, 0.25], [53.75, 0.25], [53.75, 6.75], [46.25, 6.75]]);
  addRoadPoly([[46.25, 30.25], [53.75, 30.25], [53.75, 36.75], [46.25, 36.75]]);

  // Directional Arrows on IPD 5 circulation loop
  const arrLoopWest = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3.2), arrowMat);
  arrLoopWest.rotation.x = -Math.PI / 2;
  arrLoopWest.rotation.z = Math.PI / 2; // heading West into front loop
  arrLoopWest.position.set(25.0, 0.046, 2.0);
  roadGroup.add(arrLoopWest);

  const arrLoopEast = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3.2), arrowMat);
  arrLoopEast.rotation.x = -Math.PI / 2;
  arrLoopEast.rotation.z = -Math.PI / 2; // heading East towards thoroughfare
  arrLoopEast.position.set(25.0, 0.046, 5.0);
  roadGroup.add(arrLoopEast);

  const arrLoopRearWest = arrLoopWest.clone();
  arrLoopRearWest.position.set(20.0, 0.046, 32.0);
  roadGroup.add(arrLoopRearWest);

  const arrLoopRearEast = arrLoopEast.clone();
  arrLoopRearEast.position.set(20.0, 0.046, 35.0);
  roadGroup.add(arrLoopRearEast);`;

const newIpdRoadsCode = `  // ==========================================================================
  // ข้อ 3: ปิดเส้นทางจราจรที่ผ่านไปหน้าตึกผู้ป่วยใน 5 ชั้น จนถึงอาคารจิตเวชและยาเสพติด 2 ให้เต็มเส้นทาง
  //       เปลี่ยนเป็นพื้นที่สีเขียวสวนหย่อมบำบัด (Healing Landscape Garden Lawn) เพื่อความสงบและปลอดภัยของผู้ป่วย
  // ==========================================================================
  const ipdFrontGardenLawn = new THREE.Mesh(
    new THREE.PlaneGeometry(60.0, 8.5),
    new THREE.MeshStandardMaterial({ color: 0x228b22, map: sharedTextures.grass, roughness: 0.88 })
  );
  ipdFrontGardenLawn.rotation.x = -Math.PI / 2;
  ipdFrontGardenLawn.position.set(20.0, 0.033, 3.5);
  ipdFrontGardenLawn.receiveShadow = true;
  roadGroup.add(ipdFrontGardenLawn);

  // คันหินคอนกรีตล้อมรอบสวนหย่อมหน้าตึก 5 ชั้น
  const ipdFrontCurbE = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 8.6), new THREE.MeshStandardMaterial({ color: 0xd8e0e8, roughness: 0.5 }));
  ipdFrontCurbE.position.set(46.1, 0.09, 3.5);
  roadGroup.add(ipdFrontCurbE);

  // ทางเดินแผ่นหินก้าวคนเดินในสวนหน้าตึก 5 ชั้น (Pedestrian Stepping Path)
  const ipdStoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
  for (let sx = -8.0; sx <= 44.0; sx += 2.2) {
    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.06, 8), ipdStoneMat);
    st.position.set(sx, 0.046, 3.5 + Math.sin(sx * 0.4) * 0.8);
    roadGroup.add(st);
  }

  // ==========================================================================
  // ข้อ 4: เอาเส้นทางจราจรด้านหลังตึกผู้ป่วยใน 5 ชั้นออกไป
  //       เปลี่ยนเป็นพื้นที่สีเขียวสวนหย่อมกันชน (Rear Quiet Buffer Lawn)
  // ==========================================================================
  const ipdRearGardenLawn = new THREE.Mesh(
    new THREE.PlaneGeometry(66.0, 8.5),
    new THREE.MeshStandardMaterial({ color: 0x228b22, map: sharedTextures.grass, roughness: 0.88 })
  );
  ipdRearGardenLawn.rotation.x = -Math.PI / 2;
  ipdRearGardenLawn.position.set(17.0, 0.033, 33.5);
  ipdRearGardenLawn.receiveShadow = true;
  roadGroup.add(ipdRearGardenLawn);

  const ipdRearCurbE = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 8.6), new THREE.MeshStandardMaterial({ color: 0xd8e0e8, roughness: 0.5 }));
  ipdRearCurbE.position.set(46.1, 0.09, 33.5);
  roadGroup.add(ipdRearCurbE);`;

if (mainJs.includes(oldIpdRoadsTarget)) {
  mainJs = mainJs.replace(oldIpdRoadsTarget, newIpdRoadsCode);
  console.log('4.2 IPD 5 front road and rear road closed and replaced with gardens.');
} else {
  const normOldIpdRoads = oldIpdRoadsTarget.replace(/\r\n/g, '\n');
  const normMain5 = mainJs.replace(/\r\n/g, '\n');
  if (normMain5.includes(normOldIpdRoads)) {
    mainJs = normMain5.replace(normOldIpdRoads, newIpdRoadsCode.replace(/\r\n/g, '\n'));
    console.log('4.2 IPD 5 front and rear roads closed (normalized).');
  } else {
    console.error('Failed to locate oldIpdRoadsTarget');
    process.exit(1);
  }
}

// 4.3 Item 2 (Part B): เอาลูกระนาดเดิมออก
const oldSpeedBumpTarget = `  // Speed Bumps (เนินชะลอความเร็ว) before crossings
  const bumpMat = new THREE.MeshStandardMaterial({ map: sharedTextures.speedBump, roughness: 0.6 });
  const bump1 = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.12, 0.8), bumpMat);
  bump1.position.set(-50, 0.06, -35);
  roadGroup.add(bump1);

  const bump2 = new THREE.Mesh(new THREE.BoxGeometry(6, 0.12, 0.8), bumpMat);
  bump2.position.set(41, 0.06, -14);
  roadGroup.add(bump2);`;

const newSpeedBumpCode = `  // ข้อ 2: เอาลูกระนาดเดิมข้างตึกผู้ป่วยในหญิงออก เพื่อให้การสัญจรของรถพยาบาลและผู้ป่วยราบรื่นไม่มีสิ่งกีดขวาง
  const bumpMat = new THREE.MeshStandardMaterial({ map: sharedTextures.speedBump, roughness: 0.6 });
  const bump1 = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.12, 0.8), bumpMat);
  bump1.position.set(-50, 0.06, -35);
  roadGroup.add(bump1);`;

if (mainJs.includes(oldSpeedBumpTarget)) {
  mainJs = mainJs.replace(oldSpeedBumpTarget, newSpeedBumpCode);
  console.log('4.3 bump2 removed from female ward road.');
} else {
  const normOldBump = oldSpeedBumpTarget.replace(/\r\n/g, '\n');
  const normMain6 = mainJs.replace(/\r\n/g, '\n');
  if (normMain6.includes(normOldBump)) {
    mainJs = normMain6.replace(normOldBump, newSpeedBumpCode.replace(/\r\n/g, '\n'));
    console.log('4.3 bump2 removed (normalized).');
  } else {
    console.error('Failed to locate oldSpeedBumpTarget');
    process.exit(1);
  }
}

fs.writeFileSync('main.js', mainJs, 'utf8');
console.log('main.js successfully updated! Total length:', mainJs.length);
