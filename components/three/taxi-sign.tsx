import { RoundedBox, Text } from "@react-three/drei";

const HOUSING = {
  color: "#ffcc33",
  emissive: "#ff9900",
  emissiveIntensity: 0.6,
  metalness: 0.15,
  roughness: 0.15,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
} as const;

const PANEL = {
  color: "#0a1a12",
  metalness: 0.1,
  roughness: 0.4,
} as const;

const WIDTH = 1.9;
const HEIGHT = 0.62;
const DEPTH = 0.7;
const PANEL_WIDTH = 1.35;
const PANEL_HEIGHT = 0.4;

function SignFace({ z, rotationY }: { z: number; rotationY: number }) {
  return (
    <group position={[0, 0, z]} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[PANEL_WIDTH, PANEL_HEIGHT]} />
        <meshStandardMaterial {...PANEL} />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.27}
        letterSpacing={0.02}
        color="#ffd23f"
        outlineWidth={0.008}
        outlineColor="#7a4a00"
        anchorX="center"
        anchorY="middle"
      >
        TAXI
      </Text>
    </group>
  );
}

export function TaxiSign() {
  return (
    <group>
      <RoundedBox args={[WIDTH, HEIGHT, DEPTH]} radius={0.16} smoothness={6} castShadow>
        <meshPhysicalMaterial {...HOUSING} />
      </RoundedBox>

      <SignFace z={DEPTH / 2 + 0.005} rotationY={0} />
      <SignFace z={-(DEPTH / 2 + 0.005)} rotationY={Math.PI} />
    </group>
  );
}
