"use client";

import { SparklesIcon, UserIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Link from "next/link";
import { WashingMachine } from "./washing-machine";
import { UsersIcon } from "@heroicons/react/20/solid";

let mymo: any = motion

export const HeroContent = () => {
  return (
    <mymo.div
      initial="hidden"
      animate="visible"
      className="px-20 w-full"
    >
      <div className=" shrink-0 h-full w-full lg:w-1/2 flex flex-col gap-5 justify-center m-auto text-start">
        

        <mymo.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl text-bold text-white max-w-[900px] w-auto h-auto"
        >
          <div>
            <div className="block p-2 text-transparent bg-clip-text font-bold bg-gradient-to-r from-purple-500 to-pink-500">
              Agent to Agent
            </div>
            <div className="block p-2 text-transparent bg-clip-text font-bold bg-gradient-to-r from-violet-500 to-purple-300">
              Avatar Network
            </div>
          </div>
        </mymo.div>

        <mymo.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px]  px-[20px] border border-[#7042f88b] opacity-[0.9]]"
        >
          <UserIcon className="text-[#b49bff] mx-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            {`Avatar Agent to Avatar Agent`}
          </h1>
          <SparklesIcon className="text-[#b49bff] mx-[10px] h-5 w-5" />
        </mymo.div>

        <mymo.div
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[900px] px-2"
        >
          <mymo.div variants={slideInFromLeft(1)} className="mb-4">
            {`Create Avatar Agents that can talk with each other digitally.`}
          </mymo.div>
          <mymo.div variants={slideInFromLeft(1.1)} className="mb-4">
            {`Customize what post to collect among your network.`}
          </mymo.div>
          <mymo.div variants={slideInFromLeft(1.1)} className="mb-4">
            {`Curate `}
          </mymo.div>
        </mymo.div>

        <Link
          target="_blank"
          href={`https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/`}
        >
          <mymo.div
            variants={slideInFromLeft(1)}
            className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] px-4"
          >
            {`Powered by Google A2A Protocol.`}
          </mymo.div>
        </Link>
      </div>
    
    </mymo.div>
  );
};
