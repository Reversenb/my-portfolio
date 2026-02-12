'use client';

import { useState, useMemo, useRef, Suspense, type JSX } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows, Text, OrbitControls, Center, useTexture, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// --- 1. ข้อมูล Skill พร้อม URL ---
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

function KeyContent({ skill, hovered }: { skill: any, hovered: boolean }) {
  const [white, colorIcon] = useTexture([skill.urlWhite, skill.urlColor]);
  return (
    <mesh position={[0, 0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial map={hovered ? colorIcon : white} transparent toneMapped={false} />
    </mesh>
  );
}

function BlackKey({ label, width, x, z }: { label: string, width: number, x: number, z: number }) {
  const [hovered, setHovered] = useState(false);
  const skill = skillMap[label];
  const isSkill = !!skill;

  const { positionY, scale } = useSpring({
    positionY: hovered ? 0.35 : 0.1,
    scale: hovered ? 1.08 : 1,
    config: { mass: 1, tension: 200, friction: 30 }
  });

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.3,
    metalness: 0.7
  }), []);

  const handleKeyClick = (e: any) => {
    e.stopPropagation();
    if (isSkill && skill.website) {
      window.open(skill.website, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <animated.group 
      position-x={x} position-z={z} position-y={positionY} scale={scale}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); if (isSkill) document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={handleKeyClick}
    >
      <RoundedBox args={[width * 0.96, 0.75, 0.96]} radius={0.1} smoothness={2} material={material} />
      {isSkill ? (
        <Suspense fallback={null}>
          <KeyContent skill={skill} hovered={hovered} />
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
        temp.push(<BlackKey key={`${rowIndex}-${keyIndex}`} label={key} width={width} x={finalX} z={currentRowZ} />);
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
      <Canvas 
        shadows={false} 
        dpr={[1, 1.5]} 
        // ✅ ปรับตำแหน่งกล้อง (Z เพิ่มเป็น 28 เพื่อซูมออก และ Y เพิ่มเป็น 22 เพื่อรักษามุมมองเฉียง)
        camera={{ position: [5, 22, 28], fov: 30 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            makeDefault 
            maxPolarAngle={Math.PI / 2.3} 
            minPolarAngle={Math.PI / 6}
            autoRotate={true}
            autoRotateSpeed={0.5} 
          />
          <ambientLight intensity={0.7} />
          <Environment preset="night" />
          <Center>
            <group rotation={[-0.1, -0.2, 0]}>
              {keys}
              <RGBLightPlane position={[0, 0.05, totalDepth / 2 - 0.5]} args={[totalWidth, totalDepth]} opacity={0.4} />
              <RoundedBox args={[totalWidth + 0.4, 0.3, totalDepth + 0.4]} position={[0, -0.3, totalDepth / 2 - 0.5]} radius={0.2}>
                <meshStandardMaterial color="#050505" />
              </RoundedBox>
              <group position={[0, -0.38, totalDepth / 2 - 0.5]}>
                <RGBLightPlane position={[0, 0, 0]} args={[totalWidth + 1.25, totalDepth + 1.25]} opacity={0.6} speed={0.08} />
              </group>
            </group>
          </Center>
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={40} blur={3} color="#000" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}