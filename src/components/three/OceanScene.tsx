"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Cliffs } from "./Cliffs";
import { Ocean } from "./Ocean";

export function OceanScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 6], fov: 50, near: 0.1, far: 60 }}
      gl={{ antialias: true }}
      dpr={[1, 1.75]}
    >
      <color attach="background" args={["#060d16"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[-4, 5, 2]} intensity={1.1} color="#bcd9ea" />
      <Suspense fallback={null}>
        <Ocean />
        <Cliffs />
      </Suspense>
    </Canvas>
  );
}
