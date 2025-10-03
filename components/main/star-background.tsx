"use client";

import { Points, PointMaterial, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, useEffect } from "react";
import type { Points as PointsType } from "three";
import { WashingMachine } from "../sub/washing-machine";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export const StarBackground = ({...props}) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  let [mode, setMode] = useState(5);
  //
  useEffect(() => {
    setMode(Math.floor(7 * Math.random()) + 1);
  }, []);
  //

  return (
    <div className="w-full h-auto fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarBackground></StarBackground>

        {/* <group rotation={[0, 0, 0]} scale={0.01}>
          <WashingMachine mode={mode}></WashingMachine>
        </group> */}

        <EffectComposer>
          <Bloom luminanceThreshold={0.0} intensity={2} mipMapBlur></Bloom>
        </EffectComposer>
      </Canvas>

      {/* <Canvas dpr={[2, 4]}>
        <group rotation={[0, 0, 0]} scale={1.25}>
          <WashingMachine mode={mode}></WashingMachine>
        </group>

        

        <PerspectiveCamera
          makeDefault
          position={[0, 0, 200]}
        ></PerspectiveCamera>
      </Canvas> */}
    </div>
  );
};
