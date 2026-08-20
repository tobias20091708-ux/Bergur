"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

const BASE_TILT = -0.18;
const WIDTH = 1.3;
const HEIGHT = 1.9;
const DEPTH = 0.12;

function Book({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const targetY = hovered ? 0.32 : BASE_TILT;
    g.rotation.y += (targetY - g.rotation.y) * 0.09;
  });

  const edgeMaterial = (
    <meshStandardMaterial color="#141f30" roughness={0.9} />
  );

  return (
    <group
      ref={group}
      rotation={[0, BASE_TILT, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        {edgeMaterial}
        {edgeMaterial}
        {edgeMaterial}
        {edgeMaterial}
        <meshStandardMaterial map={texture} roughness={0.55} />
        {edgeMaterial}
      </mesh>
    </group>
  );
}

function Fallback() {
  return (
    <mesh rotation={[0, BASE_TILT, 0]}>
      <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
      <meshStandardMaterial color="#141f30" />
    </mesh>
  );
}

export function BookCover({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px]">
      <div className="absolute bottom-1 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-full bg-black/50 blur-md" />
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 4]} intensity={0.9} />
        <directionalLight position={[-2, -1, 2]} intensity={0.3} />
        <Suspense fallback={<Fallback />}>
          <Book imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
