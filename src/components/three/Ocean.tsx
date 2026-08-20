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
    elevation += wave(pos.xy, 0.25, 0.35, 0.6, 1.0, 0.3);
    elevation += wave(pos.xy, 0.55, 0.15, 1.1, -0.5, 1.0);
    elevation += wave(pos.xy, 1.3, 0.06, 1.8, 0.8, -0.6);

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
  uniform vec3 uColorFoam;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

    float mixFactor = smoothstep(-0.2, 0.35, vElevation);
    vec3 color = mix(uColorDeep, uColorShallow, mixFactor);

    float foam = smoothstep(0.3, 0.42, vElevation);
    color = mix(color, uColorFoam, foam * 0.5);

    color += fresnel * 0.12;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function Ocean() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color("#04101c") },
      uColorShallow: { value: new THREE.Color("#2f7fae") },
      uColorFoam: { value: new THREE.Color("#bcd9ea") },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2.15, 0, 0]} position={[0, -1.3, 0]}>
      <planeGeometry args={[60, 60, 180, 180]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
