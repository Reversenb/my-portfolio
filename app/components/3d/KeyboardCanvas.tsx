'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows, useTexture, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated, config } from '@react-spring/three';

// ================= Define Skills Data =================
const skills = [
  { name: 'TS', icon: '/skills/ts.png', color: '#3178c6' }, // สีประจำของ TypeScript
  { name: 'JS', icon: '/skills/js.png', color: '#f7df1e' }, // สีประจำของ JavaScript
  { name: 'Python', icon: '/skills/python.png', color: '#3776ab' },
  { name: 'C++', icon: '/skills/cpp.png', color: '#00599c' },
  { name: 'React', icon: '/skills/react.png', color: '#61dafb' }, // ตัวอย่างเพิ่ม
  { name: 'NextJS', icon: '/skills/nextjs.png', color: '#000000' }, // ตัวอย่างเพิ่ม
  // เพิ่มสกิลอื่นๆ ตามต้องการ...
];

// จัดวางตำแหน่งปุ่ม (Grid Layout แบบง่ายๆ 3 คอลัมน์)
const layout = skills.map((skill, index) => {
  const col = index % 3;
  const row = Math.floor(index / 3);
  const spacingX = 1.4;
  const spacingZ = 1.4;
  // จัดให้อยู่กึ่งกลาง
  const offsetX = (2 * spacingX) / 2;
  const offsetZ = (Math.floor((skills.length - 1) / 3) * spacingZ) / 2;

  return {
    ...skill,
    position: [col * spacingX - offsetX, 0, row * spacingZ - offsetZ] as [number, number, number],
  };
});


// ================= Individual Keycap Component =================
function SkillKey({ position, icon, color, name }: { position: [number, number, number], icon: string, color: string, name: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(icon);

  // Animation ฟิสิกส์ตอนเด้ง
  const { positionY, scale, glowColor } = useSpring({
    positionY: hovered ? 0.6 : 0, // ลอยขึ้นเมื่อ Hover
    scale: hovered ? 1.1 : 1, // ขยายใหญ่ขึ้นนิดหน่อย
    glowColor: hovered ? color : '#555555', // เปลี่ยนสีแสง
    config: config.wobbly, // ตั้งค่าความเด้งดึ๋ง
  });

  // สร้าง Material สำหรับ 6 ด้านของกล่อง
  // เราต้องการให้โลโก้อยู่แค่ด้านบน (Index 2 หรือ 3 แล้วแต่การหมุน, ในที่นี้คือ Index 2)
  const materials = useMemo(() => {
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: '#1a1a1a', // สีตัวปุ่ม (ดำเทา)
      roughness: 0.3,
      metalness: 0.5,
    });
    
    const topMaterial = new THREE.MeshStandardMaterial({
        color: '#ffffff', // พื้นหลังสีขาวตรงโลโก้เพื่อให้สีสด
        map: texture, // แปะรูปโลโก้
        roughness: 0.1,
        metalness: 0.1,
        transparent: true, // ถ้าโลโก้เป็น png ใส
    });

    return [baseMaterial, baseMaterial, topMaterial, baseMaterial, baseMaterial, baseMaterial];
  }, [texture]);

  // หมุนปุ่มนิดหน่อยตอน Hover
  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (state.pointer.x * Math.PI) / 10, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (state.pointer.y * Math.PI) / 10, 0.1);
    } else if (meshRef.current) {
      // Reset rotation
       meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
       meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
    }
  })


  return (
    <animated.group position={position} position-y={positionY} scale={scale}>
      {/* แสง Glow ด้านใต้ปุ่มตอน Hover */}
      <animated.pointLight position={[0, -0.5, 0]} distance={3} intensity={hovered ? 5 : 0} color={glowColor} />
        
        {/* ชื่อสกิลลอยอยู่เหนือปุ่ม */}
        {hovered && (
            <Text position={[0, 1.2, 0]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
                {name}
            </Text>
        )}

      {/* ตัวปุ่มสี่เหลี่ยมมุมมน */}
      <RoundedBox
        ref={meshRef}
        args={[1, 1, 1]} // ขนาด กว้าง ยาว สูง
        radius={0.15} // ความมน
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        material={materials} // ใช้ array materials ที่เราสร้าง
      >
      </RoundedBox>
    </animated.group>
  );
}

// ================= Main Canvas Component =================
export default function KeyboardCanvas() {
  return (
    <div className="w-full h-[500px] md:h-[600px] cursor-pointer">
      <Canvas shadows camera={{ position: [0, 5, 6], fov: 45 }}>
        {/* แสงและสภาพแวดล้อม */}
        <ambientLight intensity={0.5} />
        <directionalLight
            castShadow
            position={[2.5, 8, 5]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
        >
            <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
        </directionalLight>
        <pointLight position={[-5, 5, -5]} intensity={1} color="#4f46e5" /> {/* แสงสีม่วงจากด้านหลังซ้าย */}

        <Environment preset="city" />

        {/* กลุ่มของปุ่มคีย์บอร์ด */}
        {/* ใช้ Float ทำให้ทั้งคีย์บอร์ดลอยๆ นิดนึง */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <group rotation={[-Math.PI / 6, 0, 0]} position={[0, -0.5, 0]}> {/* เอียงคีย์บอร์ดเข้าหากล้อง */}
            {layout.map((keyData, index) => (
                <SkillKey key={index} {...keyData} />
            ))}
            </group>
        </Float>
        
        {/* เงาพื้น */}
        <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}