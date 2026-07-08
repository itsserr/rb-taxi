"use client";

import { Component, Suspense, useEffect, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { TaxiSign } from "./taxi-sign";

const CAMERA_DIRECTION = new THREE.Vector3(2.4, 1.4, 3.4).normalize();
const LOOK_AT = new THREE.Vector3(0, 0.1, 0);
const REST_Y = -0.55;

function CameraRig() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    const distanceFactor = aspect >= 1.1 ? 1 : Math.min(1.1 / Math.max(aspect, 0.4), 2.2);
    const distance = 4.6 * distanceFactor;
    camera.position.copy(CAMERA_DIRECTION).multiplyScalar(distance);
    camera.lookAt(LOOK_AT);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

function RotatingSign() {
  const group = useRef<THREE.Group>(null);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    // Continuous, steady spin — keeps flowing, never stops.
    if (!reducedMotion.current) {
      group.current.rotation.y += delta * 0.5;
    }

    // Gentle up-and-down float.
    const bob = Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
    group.current.position.y = REST_Y + bob;
  });

  return (
    <group ref={group}>
      <TaxiSign />
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.87, 0]}>
      <planeGeometry args={[20, 20]} />
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={1} color="#ffffff" />
      <directionalLight position={[-4, 3, -3]} intensity={0.35} color="#3b5bdb" />
      {/* Gentle front fill so the face stays lit at every rotation angle */}
      <directionalLight position={[2.4, 1.4, 3.4]} intensity={0.35} color="#ffffff" />
      {/* Rim light: subtle white edge highlight so the sign pops off the dark background */}
      <directionalLight position={[0, 1.6, -3.5]} intensity={0.9} color="#ffffff" />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer form="rect" intensity={3.5} scale={[8, 8, 1]} position={[0, 4, -7]} />
          <Lightformer form="circle" intensity={2} scale={5} position={[-6, 3, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="circle" intensity={2} scale={5} position={[6, 3, 1]} rotation-y={-Math.PI / 2} />
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

export function TaxiSignScene() {
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
          <RotatingSign />
          <ContactShadows
            position={[0, -0.31, 0]}
            opacity={0.6}
            scale={8}
            blur={2.2}
            far={1.5}
            resolution={512}
            color="#000000"
          />
          <Floor />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
