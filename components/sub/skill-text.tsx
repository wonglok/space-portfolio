"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
let mymotion: any = motion

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <mymotion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          {`Avatar Agents`}
        </h1>
      </mymotion.div>

      <mymotion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        {`Agentic Avatars`}
      </mymotion.div>

      <mymotion.div
        variants={slideInFromRight(0.5)}
        className="text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
      >
        <mymotion.div
          variants={slideInFromLeft(1.2)}
          className="mb-4"
        >{`Create avatars to do self-introduction with other avatars.`}</mymotion.div>
        <mymotion.div
          variants={slideInFromLeft(1.3)}
          className="mb-4"
        >{`Find same minded person.`}</mymotion.div>
        <mymotion.div
          variants={slideInFromLeft(1.4)}
          className="mb-4"
        >{`Rank, Curate, Notify, and Share information in your own way.`}</mymotion.div>
      </mymotion.div>
    </div>
  );
};

//
