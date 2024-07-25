"use client";

import { useState } from "react";

import Image from "next/image";
import PoweredByCard from "@/components/PoweredByCard";
import Link from "next/link";
import npm from "../../public/npm-logo.jpg";
import GenerateToken from "@/components/GenerateToken";
import VerifyToken from "@/components/VerifyToken";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("generate");

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6 text-stone-800">
      <div className="max-w-md w-full md:bg-white md:shadow-md rounded-lg p-8 mb-1 mt-1s">
        <PoweredByCard />
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "generate"
                ? "bg-stone-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("generate")}
          >
            Generate Token
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "verify"
                ? "bg-stone-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("verify")}
          >
            Verify Token
          </button>
        </div>
        {currentTab === "generate" && <GenerateToken />}
        {currentTab === "verify" && <VerifyToken />}
        <div className="flex items-center justify-center space-x-2 mt-2">
          <span className="font-mono text-sm text-gray-700">
            For more info:
          </span>
          <Link href="https://www.npmjs.com/package/secureauthjwt" passHref>
            <Image
              src={npm}
              alt="npm logo"
              width={32}
              height={32}
              className="transition-transform transform hover:scale-120"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
