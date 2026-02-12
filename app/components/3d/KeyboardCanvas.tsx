'use client';

import { useState, useMemo, useRef, Suspense, type JSX } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows, Text, OrbitControls, Center, useTexture, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated, config } from '@react-spring/three';

// --- 1. ข้อมูล Skill พร้อม URL (คงเดิม) ---
const skillMap: Record<string, { name: string, urlWhite: string, urlColor: string, color: string, website: string }> = {
  'Q': { name: 'TS', urlWhite: 'https://cdn.simpleicons.org/typescript/white', urlColor: 'https://cdn.simpleicons.org/typescript/3178c6', color: '#3178c6', website: 'https://www.typescriptlang.org/' },
  'W': { name: 'JS', urlWhite: 'https://cdn.simpleicons.org/javascript/white', urlColor: 'https://cdn.simpleicons.org/javascript/f7df1e', color: '#f7df1e', website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  'E': { name: 'Python', urlWhite: 'https://cdn.simpleicons.org/python/white', urlColor: 'https://cdn.simpleicons.org/python/3776ab', color: '#3776ab', website: 'https://www.python.org/' },
  'R': { name: 'C++', urlWhite: 'https://cdn.simpleicons.org/cplusplus/white', urlColor: 'https://cdn.simpleicons.org/cplusplus/00599c', color: '#00599c', website: 'https://isocpp.org/' },
  'T': { name: 'React', urlWhite: 'https://cdn.simpleicons.org/react/white', urlColor: 'https://cdn.simpleicons.org/react/61dafb', color: '#61dafb', website: 'https://react.dev/' },
  'A': { name: 'Flutter', urlWhite: 'https://cdn.simpleicons.org/flutter/white', urlColor: 'https://cdn.simpleicons.org/flutter/02569B', color: '#02569B', website: 'https://flutter.dev/' },
  'S': { name: 'Next.js', urlWhite: 'https://cdn.simpleicons.org/nextdotjs/white', urlColor: 'https://cdn.simpleicons.org/nextdotjs/ffffff', color: '#ffffff', website: 'https://nextjs.org/' },
  'D': { name: 'Dart', urlWhite: 'https://cdn.simpleicons.org/dart/white', urlColor: 'https://cdn.simpleicons.org/dart/0175C2', color: '#0175C2', website: 'https://dart.dev/' },
  'F': { name: 'Tailwind', urlWhite: 'https://cdn.simpleicons.org/tailwindcss/white', urlColor: 'https://cdn.simpleicons.org/tailwindcss/38bdf8', color: '#38bdf8', website: 'https://tailwindcss.com/' },
  'G': { name: 'GitHub', urlWhite: 'https://cdn.simpleicons.org/github/white', urlColor: 'https://cdn.simpleicons.org/github/cccccc', color: '#ffffff', website: 'https://github.com/' },
};

const rows = [
  ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Del'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Bksp'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', 'Up'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Fn', 'Ctrl', 'Left', 'Down', 'Right']
];

const keySpacing = 1.1;
const getKeyWidth = (key: string) => {
  switch (key) {
    case 'Space': return 6.2;
    case 'Shift': return 2.3;
    case 'Enter': return 2.25;
    case 'Bksp': return 2;
    case 'Tab': return 1.5;
    case 'Caps': return 1.75;
    case '\\': return 1.5;
    default: return 1;
  }
};

// --- Component: น้องแมวนั่ง (ปรับสีหน้าบึ้งตามรูป) ---
function SittingCat({ targetPos, active }: { targetPos: THREE.Vector3 | null, active: boolean }) {
  const bodyRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);

  // ✅ ย้าย Material มาไว้ข้างใน useMemo เพื่อแก้ปัญหาสีขาวตอน Reload
  const mats = useMemo(() => ({
    fur: new THREE.MeshStandardMaterial({ color: "#5e544b", roughness: 0.85 }), // เทาเข้มอมน้ำตาล
    white: new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.9 }), // ขาว
    nose: new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.5 }), // จมูกดำ
    eye: new THREE.MeshStandardMaterial({ color: "#a5dcf8", roughness: 0.1, metalness: 0.5 }), // ฟ้าอ่อนใสๆ
    pupil: new THREE.MeshStandardMaterial({ color: "#000000" })
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bodyRef.current) {
        bodyRef.current.scale.y = 1 + Math.sin(t * 2) * 0.015;
        bodyRef.current.position.y = Math.sin(t * 2) * 0.02;
    }
    if (tailRef.current) {
        tailRef.current.rotation.z = Math.sin(t * 1.5) * 0.2;
        tailRef.current.rotation.y = Math.cos(t * 1.5) * 0.1;
    }
  });

  const reachDistance = targetPos ? Math.sqrt(targetPos.x ** 2 + (targetPos.z - (-3)) ** 2) : 0;
  const elbowBend = active ? Math.max(0.2, 1.5 - reachDistance * 0.15) : 0.5;

  const springProps = useSpring({
    headYaw: active && targetPos ? -targetPos.x * 0.12 : 0,
    headPitch: active ? 0.15 : 0.05, // ให้ก้มหน้ามองปุ่มนิดๆ ตลอดเวลา
    shoulderRot: active && targetPos ? [-0.8, 0, -targetPos.x * 0.08] : [0.3, 0, 0],
    elbowRot: active ? [elbowBend, 0, 0] : [0.8, 0, 0],
    wristRot: active ? [-0.5, 0, 0] : [-0.2, 0, 0],
    config: { mass: 1, tension: 120, friction: 26 }
  });

  const [pawSquish, setPawSquish] = useState(1);
  useFrame((state) => {
    if (active) {
      setPawSquish(1 - Math.abs(Math.sin(state.clock.getElapsedTime() * 12)) * 0.15);
    } else {
      setPawSquish(1);
    }
  });

  return (
    <group position={[0, 0.3, -3.5]}>
        <animated.group ref={bodyRef}>
            {/* ลำตัวส่วนบน (เทา) */}
            <mesh position={[0, 1.4, 0]} scale={[1.35, 1.6, 1.4]}>
                <sphereGeometry args={[1, 32, 32]} />
                <primitive object={mats.fur} attach="material" />
            </mesh>
            {/* ท้องและอก (ขาว) */}
            <mesh position={[0, 1.0, 0.8]} scale={[1.0, 1.2, 0.7]} rotation={[-0.2, 0, 0]}>
                <sphereGeometry args={[1, 32, 32]} />
                <primitive object={mats.white} attach="material" />
            </mesh>

            {/* ส่วนหัว */}
            <animated.group position={[0, 2.9, 0.2]} rotation-y={springProps.headYaw} rotation-x={springProps.headPitch}>
                {/* หัวหลัก (เทา) */}
                <mesh scale={[1.15, 1, 1]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <primitive object={mats.fur} attach="material" />
                </mesh>
                {/* หน้าสีขาว (บริเวณจมูกและปาก) */}
                <mesh position={[0, -0.3, 0.8]} scale={[0.6, 0.45, 0.4]}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <primitive object={mats.white} attach="material" />
                </mesh>
                {/* เส้นสีขาวกลางหน้าผาก (ตามรูป) */}
                <mesh position={[0, 0.4, 0.95]} scale={[0.08, 0.4, 0.1]}>
                     <sphereGeometry args={[1, 16, 16]} />
                     <primitive object={mats.white} attach="material" />
                </mesh>
                {/* จมูกดำ */}
                <mesh position={[0, -0.05, 1.15]} scale={[0.1, 0.08, 0.05]}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <primitive object={mats.nose} attach="material" />
                </mesh>
                {/* หูเทา */}
                {[-0.55, 0.55].map((x, i) => (
                    <group key={i} position={[x, 0.85, -0.1]} rotation={[0, 0, i === 0 ? 0.3 : -0.3]}>
                        <mesh scale={[0.3, 0.5, 0.1]}>
                             <sphereGeometry args={[1, 16, 16]} />
                             <primitive object={mats.fur} attach="material" />
                        </mesh>
                    </group>
                ))}

                {/* ✅ ตาแป๋ว 2 ข้าง สีฟ้าอ่อน */}
                {[-0.4, 0.4].map((x, i) => (
                    <group key={i} position={[x, 0.18, 1.0]}>
                        <mesh scale={[0.15, 0.17, 0.1]}>
                            <sphereGeometry args={[1, 24, 24]} />
                            <primitive object={mats.eye} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, 0.1]} scale={[0.06, 0.12, 0.02]}>
                            <sphereGeometry args={[1, 16, 16]} />
                            <primitive object={mats.pupil} attach="material" />
                        </mesh>
                    </group>
                ))}
            </animated.group>

             {/* หางเทา */}
            <group position={[0, 0.4, -1.2]} ref={tailRef}>
                 <mesh rotation={[0.5, 0, 0]} scale={[0.4, 0.4, 1]}>
                    <torusKnotGeometry args={[1, 0.3, 64, 8, 2, 3]} />
                    <primitive object={mats.fur} attach="material" />
                 </mesh>
            </group>
            
            {/* ขาและเท้า (ถุงเท้าขาว) */}
            {[-0.85, 0.85].map((x, i) => (
                <group key={i} position={[x, 0.4, 0.6]}>
                    <mesh rotation={[Math.PI/2.5, i===0 ? 0.3 : -0.3, 0]} scale={[0.5, 0.8, 0.5]}>
                        <sphereGeometry args={[1, 16, 16]} />
                        <primitive object={mats.fur} attach="material" />
                    </mesh>
                    <mesh position={[0, -0.5, 0.4]} scale={[0.45, 0.3, 0.5]}>
                        <sphereGeometry args={[1, 16, 16]} />
                        <primitive object={mats.white} attach="material" />
                    </mesh>
                </group>
            ))}

            {/* แขนซ้าย */}
            <group position={[-0.75, 1.8, 0.7]} rotation={[0.4, 0.3, -0.2]}>
                <mesh scale={[0.35, 1, 0.35]}>
                    <capsuleGeometry args={[1, 1.5, 16, 16]} />
                    <primitive object={mats.fur} attach="material" />
                </mesh>
                 <mesh position={[0, -1.1, 0.1]} scale={[0.4, 0.35, 0.45]}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <primitive object={mats.white} attach="material" />
                </mesh>
            </group>

            {/* ✅ แขนขวาเอื้อมจิ้ม */}
            <animated.group position={[0.75, 1.8, 0.7]} rotation={springProps.shoulderRot as any}>
                <mesh scale={[0.35, 0.7, 0.35]} position={[0, -0.35, 0]}>
                     <capsuleGeometry args={[1, 0.7, 16, 16]} />
                     <primitive object={mats.fur} attach="material" />
                </mesh>
                <animated.group position={[0, -0.7, 0]} rotation={springProps.elbowRot as any}>
                    <mesh scale={[0.32, 0.8, 0.32]} position={[0, -0.4, 0]}>
                        <capsuleGeometry args={[1, 0.8, 16, 16]} />
                        <primitive object={mats.fur} attach="material" />
                    </mesh>
                    <animated.group position={[0, -0.8, 0]} rotation={springProps.wristRot as any}>
                         <animated.group scale-y={pawSquish} position={[0, -0.2, 0.1]}>
                             <mesh scale={[0.45, 0.35, 0.5]} rotation={[0.2, 0, 0]}>
                                <sphereGeometry args={[1, 16, 16]} />
                                <primitive object={mats.white} attach="material" />
                            </mesh>
                        </animated.group>
                    </animated.group>
                </animated.group>
            </animated.group>
        </animated.group>
    </group>
  );
}

// --- (BlackKey, KeyIcon, RGBLightPlane, KeyboardCanvas คงเดิม แต่ลบ Material นอก Component ออก) ---
function BlackKey({ label, width, x, z, onHover }: any) {
  const [hovered, setHovered] = useState(false);
  const skill = skillMap[label];
  const isSkill = !!skill;

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    if (isSkill) {
        document.body.style.cursor = 'pointer';
        onHover(new THREE.Vector3(x, 0.5, z)); 
    }
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
    onHover(null);
  };
    
  const { positionY, scale } = useSpring({
    positionY: hovered ? 0.35 : 0.1,
    scale: hovered ? 1.08 : 1,
    config: { mass: 1, tension: 200, friction: 30 }
  });

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a', roughness: 0.3, metalness: 0.7
  }), []);

  return (
    <animated.group 
      position-x={x} position-z={z} position-y={positionY} scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={() => isSkill && window.open(skill.website, '_blank')}
    >
      <RoundedBox args={[width * 0.96, 0.75, 0.96]} radius={0.1} smoothness={2} material={material} />
      {isSkill ? (
        <Suspense fallback={null}>
          <KeyIcon skill={skill} hovered={hovered} />
          {hovered && (
            <Text position={[0, 1.8, 0]} fontSize={0.3} color={skill.color} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="black">
              {skill.name}
            </Text>
          )}
        </Suspense>
      ) : (
        <Text position={[-width * 0.3, 0.77, -0.3]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.22} color={hovered ? "white" : "#666"} anchorX="left" anchorY="top">
          {label}
        </Text>
      )}
    </animated.group>
  );
}

function KeyIcon({ skill, hovered }: any) {
    const [white, colorIcon] = useTexture([skill.urlWhite, skill.urlColor]);
    return (
      <mesh position={[0, 0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial map={hovered ? colorIcon : white} transparent toneMapped={false} />
      </mesh>
    );
}
  
function RGBLightPlane({ args, speed = 0.2, opacity = 1, position }: any) {
    const ref = useRef<THREE.MeshBasicMaterial>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
        const hue = (clock.getElapsedTime() * speed) % 1;
        ref.current.color.setHSL(hue, 0.8, 0.5);
        }
    });
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={args} />
        <meshBasicMaterial ref={ref} transparent opacity={opacity} toneMapped={false} />
        </mesh>
    );
}

export default function KeyboardCanvas(): JSX.Element {
  const [activeKeyPos, setActiveKeyPos] = useState<THREE.Vector3 | null>(null);

  const keys = useMemo(() => {
    const temp: any[] = [];
    let currentRowZ = 0;
    rows.forEach((row, rowIndex) => {
      let currentX = 0;
      const rowWidth = row.reduce((sum, key) => sum + getKeyWidth(key) * keySpacing, 0);
      let startX = -rowWidth / 2;
      row.forEach((key, keyIndex) => {
        const width = getKeyWidth(key);
        let finalX = startX + currentX + (width * keySpacing) / 2;
        temp.push(
          <BlackKey 
            key={`${rowIndex}-${keyIndex}`} 
            label={key} 
            width={width} 
            x={finalX} 
            z={currentRowZ} 
            onHover={setActiveKeyPos} 
          />
        );
        currentX += width * keySpacing;
      });
      currentRowZ += keySpacing;
    });
    return temp;
  }, []);

  const totalWidth = 16.5;
  const totalDepth = rows.length * keySpacing;

  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas shadows={false} dpr={[1, 1.5]} camera={{ position: [8, 25, 30], fov: 32 }} gl={{ alpha: true, antialias: false }}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={true} enablePan={false} makeDefault maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 6} autoRotate={!activeKeyPos} autoRotateSpeed={0.4} />
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 10, -5]} intensity={0.8} color="#fff5e6" />
          <Environment preset="night" />
          <Center>
            <group rotation={[-0.1, -0.2, 0]}>
              {keys}
              
              <SittingCat targetPos={activeKeyPos} active={!!activeKeyPos} />

              <RGBLightPlane position={[0, 0.05, totalDepth / 2 - 0.5]} args={[totalWidth, totalDepth]} opacity={0.4} />
              <RoundedBox args={[totalWidth + 0.4, 0.3, totalDepth + 0.4]} position={[0, -0.3, totalDepth / 2 - 0.5]} radius={0.2}>
                <meshStandardMaterial color="#050505" />
              </RoundedBox>
              <group position={[0, -0.38, totalDepth / 2 - 0.5]}>
                <RGBLightPlane position={[0, 0, 0]} args={[totalWidth + 1.25, totalDepth + 1.25]} opacity={0.6} speed={0.08} />
              </group>
            </group>
          </Center>
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={45} blur={3} color="#000" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}