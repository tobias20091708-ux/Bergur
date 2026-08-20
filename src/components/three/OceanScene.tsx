"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Ocean } from "./Ocean";

export function OceanScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 5], fov: 45, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[-3, 4, 2]} intensity={0.6} color="#c7d9e8" />
      <Suspense fallback={null}>
        <Ocean />
      </Suspense>
    </Canvas>
  );
}
