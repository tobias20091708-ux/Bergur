"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform float uTime;

  float wave(vec2 pos, float freq, float amp, float speed, float dirx, float diry) {
    return sin(pos.x * dirx * freq + pos.y * diry * freq + uTime * speed) * amp;
  }

  void main() {
    vec3 pos = position;

    float elevation = 0.0;
    elevation += wave(pos.xy, 0.18, 0.14, 0.12, 1.0, 0.3);
    elevation += wave(pos.xy, 0.4, 0.06, 0.2, -0.5, 1.0);
    elevation += wave(pos.xy, 0.9, 0.025, 0.32, 0.8, -0.6);

    pos.z += elevation;
    vElevation = elevation;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalMatrix * normal;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform vec3 uColorDeep;
  uniform vec3 uColorShallow;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

    float mixFactor = smoothstep(-0.1, 0.16, vElevation);
    vec3 color = mix(uColorDeep, uColorShallow, mixFactor);
    color += fresnel * 0.06;

    gl_FragColor = vec4(color, 0.9);
  }
`;

export function Ocean() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color("#0a1628") },
      uColorShallow: { value: new THREE.Color("#1a3a5c") },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -0.6, 0]}>
      <planeGeometry args={[40, 40, 140, 140]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
