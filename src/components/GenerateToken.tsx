"use client";

import React, { useState } from "react";
import copy from "../../public/copy.svg";
import Image from "next/image";

const GenerateToken = () => {
  const [jwt, setJwt] = useState("");
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState({
    name: "",
    secret: "",
    admin: false,
  });

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
  return (
    <>
      <h1 className="text-2xl font-medium mb-6 text-center">Token Generator</h1>
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm text-black"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm text-black"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="admin"
            name="admin"
            checked={payload.admin}
            onChange={handlePayloadChange}
            className="h-4 w-4 text-stone-600 border-gray-300 rounded focus:ring-stone-500"
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
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
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
  );
};

export default GenerateToken;
