"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense } from "react";
import { Html, ScrollControls, useProgress } from "@react-three/drei";

function Loader() {
  const { progress, active } = useProgress();
  return <Html center>{progress.toFixed(1)} % Loaded</Html>;
}

export default function Character() {
  return (
    <>
      <Canvas gl={{ antialias: true }} className="relative h-svh">
        <directionalLight position={[-5, 5, 5]} intensity={5} />
        <Suspense fallback={<Loader />}>
          <ScrollControls damping={2} pages={0.5}>
            <Model />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}
