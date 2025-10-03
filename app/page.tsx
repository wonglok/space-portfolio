'use client'
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { ReactBits } from "@/components/main/react-bits";
import { Skills } from "@/components/main/skills";
import { HeroContent } from "@/components/sub/hero-content";
import { WashingMachine } from "@/components/sub/washing-machine";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main className="w-full">
      <div className="flex flex-col gap-20">
        <Hero />


        <section>
          <div className="h-[70vh]">
            <Canvas dpr={1.5}>
                <PerspectiveCamera position={[0,0,150]} fov={50} makeDefault></PerspectiveCamera>
                <WashingMachine mode={3}></WashingMachine>
            </Canvas>
          </div>
        </section>

        <Projects />

        <Skills />  

      {/* 
        <section>
          <div className="h-[70vh]">
            <Canvas>
              <PerspectiveCamera position={[0,0,200]} fov={50} makeDefault></PerspectiveCamera>
              <WashingMachine mode={4}></WashingMachine>
            </Canvas>
          </div>
        </section>
      */}

        {/* <Encryption /> */}
      </div>
    </main>
  );
}
