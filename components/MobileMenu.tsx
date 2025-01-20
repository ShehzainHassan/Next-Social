"use client";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div
          className={`w-6 h-1 bg-blue2 rounded-sm ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue2 rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue2 rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] flex flex-col items-center justify-center gap-8 font-medium text-xl z-10 bg-white dark:bg-black">
          <Link href="/">Home</Link>
          <Link href="/">Friends</Link>
          <Link href="/">Stories</Link>
        </div>
      )}
    </div>
  );
};
export default MobileMenu;
