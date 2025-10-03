"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
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

let mymo: any = motion

export const HeroContent = () => {
  return (
    <mymo.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-20 w-full z-[20]"
    >
      <div className=" shrink-0 h-full w-full lg:w-1/2 flex flex-col gap-5 justify-center m-auto text-start">
        <mymo.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Self-Host Community Server
          </h1>
        </mymo.div>

        <mymo.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl text-bold text-white max-w-[900px] w-auto h-auto"
        >
          <span>
            <span className="block p-2 text-transparent bg-clip-text font-bold bg-gradient-to-r from-purple-500 to-pink-500">
              Agent to Agent
            </span>
            <span className="block p-2 text-transparent bg-clip-text font-bold bg-gradient-to-r from-violet-500 to-purple-300">
              Avatar Network
            </span>
          </span>
        </mymo.div>

        <mymo.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[900px] px-2"
        >
          <mymo.div variants={slideInFromLeft(1)} className="mb-4">
            {/*  */}
            {/*  */}
            {`Create Avatar Agents that can talk with each other digitally.`}
          </mymo.div>
        </mymo.p>

        <Link
          target="_blank"
          href={`https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/`}
        >
          <mymo.a
            variants={slideInFromLeft(1)}
            className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] px-4"
          >
            Powered by Google A2A Protocol.
          </mymo.a>
        </Link>
      </div>
    </mymo.div>
  );
};
