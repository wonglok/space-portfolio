import Link from "next/link";

import { FOOTER_DATA } from "@/constants";
import LaserFlow from "../sub/code/laser-flow";

export const Footer = () => {
  return (
    <div className="w-full h-full relative bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          {FOOTER_DATA.map((column) => (
            <div
              key={column.title}
              className="min-w-[200px] h-auto flex flex-col items-center justify-start"
            >
              <h3 className="font-bold text-[16px]">{column.title}</h3>
              {column.data.map(({ icon: Icon, name, link }) => (
                <Link
                  key={`${column.title}-${name}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-row items-center my-[15px]"
                >
                  {Icon && <Icon />}
                  <span className="text-[15px] ml-[6px]">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-[20px] text-[15px] text-center">
          &copy; wonglok831 {new Date().getFullYear()} . All rights reserved.
        </div>
      </div>

      {/* <div className=" fixed bottom-0 transform translate-y-[45%] left-0 w-full h-[1000px]">
        <LaserFlow
          horizontalBeamOffset={0.0}
          verticalBeamOffset={-0.05}
          color="#FF79C6"
          className="h-[1000px]"
        />
      </div> */}
    </div>
  );
};
