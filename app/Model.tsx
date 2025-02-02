import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

useGLTF.preload("/robot_playground.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const scroll = useScroll();
  const { nodes, materials, animations, scene } = useGLTF(
    "/robot_playground.glb"
  );
  const { actions, clips } = useAnimations(animations, scene);
  useEffect(() => {
    console.log("actions-", actions);
    console.log("clips-", clips);
    //@ts-ignore
    actions["Experiment"].play().paused = true;
  }, []);

  useEffect(() => {
    if (!scroll) return;

    let startTime: number | null = null; // Store the starting time
    const targetOffset = 1; // Final scroll position
    const duration = 6000; // Total scroll time in milliseconds

    const animateScroll = (timestamp: number) => {
      if (startTime === null) startTime = timestamp; // Set start time on first frame

      const elapsed = timestamp - startTime; // Time elapsed since start
      const progress = Math.min(elapsed / duration, 1); // Normalize progress (0 to 1)

      scroll.offset = progress * targetOffset; // Update scroll position

      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll); // Start animation
  }, [scroll]);

  useFrame(() => {
    if (!scroll) return;
    //@ts-ignore
    actions["Experiment"].time =
      //@ts-ignore
      (actions["Experiment"].getClip().duration * scroll.offset) / 3;
  });

  return (
    <>
      <group ref={group}>
        <primitive object={scene} />
      </group>
    </>
  );
}
