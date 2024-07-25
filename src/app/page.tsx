"use client";

import { useState } from "react";
import copy from "../../public/copy.svg";
import Image from "next/image";
import PoweredByCard from "@/components/PoweredByCard";
import Link from "next/link";
import npm from "../../public/npm-logo.jpg";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("generate");
  const [token, setToken] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [jwt, setJwt] = useState("");
  const [payload, setPayload] = useState({
    name: "",
    secret: "",
    admin: false,
  });

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setResponse(null);
    setError(null);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handlePayloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: name === "admin" ? e.target.checked : value,
    }));
  };

  const handleJwtSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to generate token");
      }

      const data = await res.json();
      setJwt(data.token);
      setError(null);
    } catch (err: any) {
      setJwt("");
      setError(err.message);
    }
  };

  const handleSecureSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/secure", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
    } catch (err: any) {
      setResponse(null);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6 text-stone-800">
      <PoweredByCard />
      <div className="max-w-md w-full md:bg-white md:shadow-md rounded-lg p-8 mb-1 mt-1s">
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "generate"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("generate")}
          >
            Generate Token
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "verify"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("verify")}
          >
            Verify Token
          </button>
        </div>

        {currentTab === "generate" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">
              JWT Token Generator
            </h1>
            <form onSubmit={handleJwtSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={payload.name}
                  onChange={handlePayloadChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />

                <label
                  htmlFor="secret"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Secret
                </label>

                <input
                  type="text"
                  id="secret"
                  name="secret"
                  value={payload.secret}
                  onChange={handlePayloadChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="admin"
                  name="admin"
                  checked={payload.admin}
                  onChange={handlePayloadChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="admin"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Admin
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Generate Token
                </button>
              </div>
            </form>
            {jwt && (
              <div
                className="mt-6 bg-green-100 border border-green-400 text-green-700 rounded overflow-auto"
                role="alert"
              >
                <button className="">
                  <Image
                    src={copy}
                    alt="copy"
                    className="rounded-br-md bg-[#FF6347]"
                  ></Image>
                </button>
                <div className="mt-1 pl-1">
                  <span>{jwt}</span>
                </div>
              </div>
            )}
            {error && (
              <div
                className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </>
        )}

        {currentTab === "verify" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">JWT Demo</h1>
            <form onSubmit={handleSecureSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="token"
                  className="block text-sm font-medium text-gray-700"
                >
                  JWT Token
                </label>
                <input
                  type="text"
                  id="token"
                  value={token}
                  onChange={handleTokenChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
            {response && (
              <div
                className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  {JSON.stringify(response)}
                </span>
              </div>
            )}
            {error && (
              <div
                className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="rounded-lg p-4 flex items-center space-x-4">
        <span className="font-mono text-sm text-gray-700">For more info:</span>
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
  );
}
