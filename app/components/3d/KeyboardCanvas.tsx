'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows, Text, OrbitControls, Center, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated, config } from '@react-spring/three';

// --- ข้อมูล Skill ---
const skillMap: Record<string, { name: string, urlWhite: string, urlColor: string, color: string }> = {
  'Q': { name: 'TypeScript', urlWhite: 'https://cdn.simpleicons.org/typescript/white', urlColor: 'https://cdn.simpleicons.org/typescript/3178c6', color: '#3178c6' },
  'W': { name: 'JavaScript', urlWhite: 'https://cdn.simpleicons.org/javascript/white', urlColor: 'https://cdn.simpleicons.org/javascript/f7df1e', color: '#f7df1e' },
  'E': { name: 'Python', urlWhite: 'https://cdn.simpleicons.org/python/white', urlColor: 'https://cdn.simpleicons.org/python/3776ab', color: '#3776ab' },
  'R': { name: 'C++', urlWhite: 'https://cdn.simpleicons.org/cplusplus/white', urlColor: 'https://cdn.simpleicons.org/cplusplus/00599c', color: '#00599c' },
  'T': { name: 'React', urlWhite: 'https://cdn.simpleicons.org/react/white', urlColor: 'https://cdn.simpleicons.org/react/61dafb', color: '#61dafb' },
  'A': { name: 'Flutter', urlWhite: 'https://cdn.simpleicons.org/flutter/white', urlColor: 'https://cdn.simpleicons.org/flutter/02569B', color: '#02569B' },
  'S': { name: 'Next.js', urlWhite: 'https://cdn.simpleicons.org/nextdotjs/white', urlColor: 'https://cdn.simpleicons.org/nextdotjs/ffffff', color: '#ffffff' },
  'D': { name: 'Dart', urlWhite: 'https://cdn.simpleicons.org/dart/white', urlColor: 'https://cdn.simpleicons.org/dart/0175C2', color: '#0175C2' },
  'F': { name: 'Tailwind', urlWhite: 'https://cdn.simpleicons.org/tailwindcss/white', urlColor: 'https://cdn.simpleicons.org/tailwindcss/38bdf8', color: '#38bdf8' },
  'G': { name: 'GitHub', urlWhite: 'https://cdn.simpleicons.org/github/white', urlColor: 'https://cdn.simpleicons.org/github/cccccc', color: '#ffffff' },
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

function KeyIcon({ urlWhite, urlColor, hovered }: { urlWhite: string, urlColor: string, hovered: boolean }) {
    const [textureWhite, textureColor] = useTexture([urlWhite, urlColor]);
    return (
        <mesh position={[0, 0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.55, 0.55]} />
            <meshBasicMaterial map={hovered ? textureColor : textureWhite} transparent opacity={1} toneMapped={false} />
        </mesh>
    );
}

function BlackKey({ label, width, x, z }: { label: string, width: number, x: number, z: number }) {
  const [hovered, setHovered] = useState(false);
  const skill = skillMap[label];
  const isSkill = !!skill;
  
  const { positionY, scale, lightIntensity } = useSpring({
    positionY: hovered ? 0.35 : 0.1, 
    scale: hovered ? 1.08 : 1,
    lightIntensity: hovered ? 3 : 0,
    config: config.stiff
  });

  const blackMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#0a0a0a', roughness: 0.1, metalness: 0.8, clearcoat: 1, clearcoatRoughness: 0.05, reflectivity: 1, envMapIntensity: 1.5
  }), []);

  return (
    <animated.group 
        position-x={x} position-z={z} position-y={positionY} scale={scale}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
    >
        {isSkill && <animated.pointLight position={[0, -0.1, 0]} distance={1.5} intensity={lightIntensity} color={skill.color} toneMapped={false} />}
        <RoundedBox args={[width * 0.96, 0.75, 0.96]} radius={0.12} smoothness={6} material={blackMaterial} />
        {isSkill ? (
            <>
                <KeyIcon urlWhite={skill.urlWhite} urlColor={skill.urlColor} hovered={hovered} />
                {hovered && (
                    <Text position={[0, 1.8, 0]} fontSize={0.32} color={skill.color} anchorX="center" anchorY="middle" outlineWidth={0.03} outlineColor="black">
                        {skill.name}
                    </Text>
                )}
            </>
        ) : (
            <Text position={[-width * 0.32, 0.77, -0.32]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.24} color={hovered ? "white" : "#777"} anchorX="left" anchorY="top">
                {label}
            </Text>
        )}
    </animated.group>
  );
}

function RGBLightPlane({ position, args, opacity = 1, speed = 0.2 }: any) {
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    useFrame(({ clock }) => {
        if (materialRef.current) {
            const hue = (clock.getElapsedTime() * speed) % 1;
            materialRef.current.color.setHSL(hue, 0.8, 0.5);
        }
    });
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={args} />
            <meshBasicMaterial ref={materialRef} transparent opacity={opacity} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
    );
}

export default function KeyboardCanvas() {
  const keys: React.ReactNode[] = [];
  let currentRowZ = 0;
  rows.forEach((row, rowIndex) => {
      let currentX = 0;
      const rowWidth = row.reduce((sum, key) => sum + getKeyWidth(key) * keySpacing, 0);
      let startX = -rowWidth / 2;
      row.forEach((key, keyIndex) => {
          const width = getKeyWidth(key);
          let finalX = startX + currentX + (width * keySpacing) / 2;
          keys.push(<BlackKey key={`${rowIndex}-${keyIndex}`} label={key} width={width} x={finalX} z={currentRowZ} />);
          currentX += width * keySpacing;
      });
      currentRowZ += keySpacing;
  });

  const totalWidth = 16.8;
  const totalDepth = rows.length * keySpacing;

  return (
    <div className="w-full h-full min-h-[550px] cursor-grab active:cursor-grabbing relative">
      <Canvas shadows camera={{ position: [0, 14, 13], fov: 32 }} gl={{ alpha: true, antialias: true }}>
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 6} enablePan={false} rotateSpeed={0.6} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 5]} intensity={1.2} castShadow />
        <Environment preset="night" />
        <Center>
            <group rotation={[-0.15, 0, 0]}>
                {keys}
                <RGBLightPlane position={[0, 0.08, totalDepth / 2 - 0.5]} args={[totalWidth, totalDepth]} opacity={0.45} speed={0.12} />
                <RoundedBox args={[totalWidth + 0.45, 0.35, totalDepth + 0.45]} position={[0, -0.32, totalDepth / 2 - 0.5]} radius={0.25} smoothness={4}>
                     <meshStandardMaterial color="#050505" roughness={0.3} metalness={0.6} />
                </RoundedBox>
                <group position={[0, -0.38, totalDepth / 2 - 0.5]}>
                     <RGBLightPlane position={[0, 0, 0]} args={[totalWidth + 1.25, totalDepth + 1.25]} opacity={0.65} speed={0.08} />
                </group>
            </group>
        </Center>
        <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={45} blur={3.5} far={6} color="#000" />
      </Canvas>
    </div>
  );
}