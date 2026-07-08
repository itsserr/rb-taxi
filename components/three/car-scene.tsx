"use client";

import { Component, Suspense, useEffect, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshReflectorMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

const CAR_PHOTO =
  "https://images.unsplash.com/photo-1764605206511-7a649d9df63b?q=80&w=2400&auto=format&fit=crop";
const PHOTO_ASPECT = 2400 / 1351;
const PLANE_HEIGHT = 3.1;
const PLANE_WIDTH = PLANE_HEIGHT * PHOTO_ASPECT;
const PLANE_Y = 0.55;

function CameraRig() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    const halfW = PLANE_WIDTH / 2 + 0.3;
    const halfH = PLANE_HEIGHT / 2 + 0.5;
    const fovV = THREE.MathUtils.degToRad(30);
    const distanceForHeight = halfH / Math.tan(fovV / 2);
    const distanceForWidth = halfW / (Math.tan(fovV / 2) * aspect);
    const distance = Math.max(distanceForHeight, distanceForWidth) * 1.05;

    camera.position.set(0, PLANE_Y + 0.35, distance);
    camera.lookAt(0, PLANE_Y - 0.1, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

function CarPhoto({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const texture = useTexture(CAR_PHOTO);
  texture.colorSpace = THREE.SRGBColorSpace;

  const group = useRef<THREE.Group>(null);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useFrame((_state, delta) => {
    if (!group.current) return;
    const p = reducedMotion.current ? 0 : scrollProgress.current;
    const targetScale = 1 + p * 0.16;
    const targetY = PLANE_Y - p * 0.3;
    const targetRotZ = -p * 0.045;

    const scale = THREE.MathUtils.damp(group.current.scale.x, targetScale, 4.5, delta);
    group.current.scale.setScalar(scale);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 4.5, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetRotZ, 4.5, delta);
  });

  return (
    <group ref={group} position={[0, PLANE_Y, 0]}>
      <mesh>
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
      <planeGeometry args={[26, 26]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={25}
        roughness={1}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#050506"
        metalness={0.5}
        mirror={0.35}
      />
    </mesh>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, 3, -4]} intensity={0.3} color="#3b5bdb" />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer form="rect" intensity={3} scale={[10, 10, 1]} position={[0, 5, -9]} />
        </group>
      </Environment>
    </>
  );
}

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function CarScene({
  rotationTarget,
}: {
  rotationTarget: React.MutableRefObject<number>;
}) {
  return (
    <WebGLErrorBoundary>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{ fov: 30 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault());
        }}
      >
        <CameraRig />
        <Lighting />
        <Suspense fallback={null}>
          <CarPhoto scrollProgress={rotationTarget} />
          <Floor />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
