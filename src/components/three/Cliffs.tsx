"use client";

type CliffDef = {
  position: [number, number, number];
  scale: [number, number, number];
  rotationY: number;
};

const cliffs: CliffDef[] = [
  { position: [-4.6, -0.2, -7], scale: [2.4, 2.8, 2.4], rotationY: 0.3 },
  { position: [3.8, 0.0, -9], scale: [3.2, 3.6, 3.2], rotationY: -0.6 },
  { position: [0.4, -0.4, -11], scale: [4.6, 3.0, 4.6], rotationY: 1.1 },
  { position: [-2.2, -0.6, -13], scale: [3.8, 2.2, 3.8], rotationY: 0.8 },
];

export function Cliffs() {
  return (
    <group>
      {cliffs.map((cliff, i) => (
        <mesh
          key={i}
          position={cliff.position}
          scale={cliff.scale}
          rotation={[0, cliff.rotationY, 0]}
        >
          <coneGeometry args={[1, 1.6, 5]} />
          <meshStandardMaterial color="#0a1524" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
