"use client";

import React, { useState } from "react";
import copy from "../../public/copy.svg";
import Image from "next/image";
import del from "../../public/del.svg";

const GenerateToken = () => {
  type Payload = {
    name: string;
    secret: string;
    ttl: number;
    aud: string[];
    msg: string;
    role: string;
  };
  const [jwt, setJwt] = useState("");
  const [error, setError] = useState(null);
  const [audience, setAudience] = useState("");
  const [payload, setPayload] = useState<Payload>({
    name: "",
    secret: "",
    ttl: 0,
    aud: [],
    msg: "",
    role: "",
  });

  const handleAddAudience = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    payload.aud.push(audience);
    setAudience("");
  };

  const handlePayloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: name === "admin" ? e.target.checked : value,
    }));
  };

  const handleAudDelete = (index: number) => {
    const updatedAud = [...payload.aud];
    updatedAud.splice(index, 1);
    //@ts-ignore
    setPayload((prevPayload) => ({
      ...prevPayload,
      aud: updatedAud,
    }));
  };

  const handleJwtSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name<span className="text-red-600 pl-1 pt-1">*</span>
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
            Secret<span className="text-red-600 pl-1 pt-1">*</span>
          </label>

          <input
            type="text"
            id="secret"
            name="secret"
            value={payload.secret}
            onChange={handlePayloadChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm text-black"
          />

          <label
            htmlFor="msg"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            Message
          </label>

          <input
            type="text"
            id="msg"
            name="msg"
            value={payload.msg}
            onChange={handlePayloadChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm text-black"
          />

          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            Role
          </label>

          <input
            type="text"
            id="role"
            name="role"
            value={payload.role}
            onChange={handlePayloadChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm text-black"
          />
          <label
            htmlFor="ttl"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            Time to Live<span className="text-gray-400"> (in sec)</span>
          </label>
          <input
            type="number"
            id="ttl"
            name="ttl"
            value={payload.ttl}
            onChange={handlePayloadChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm text-black"
          />
          <label
            htmlFor="ttl"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            Audience
          </label>
          <div className="flex items-center justify-center mt-1">
            <input
              type="text"
              id="aud"
              name="aud"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm text-black"
            />
            <button
              onClick={handleAddAudience}
              className="py-2 px-3 bg-stone-600 rounded-md ml-1 text-sm text-white"
            >
              Add
            </button>
          </div>
          <div className="mt-4 flex flex-wrap justify-left">
            {payload.aud.map((aud: string, index: number) => {
              return (
                <div className="flex bg-gray-200 ml-1 rounded-md p-2 mt-1">
                  <span className="rounded-lg text-sm text-black text-center font-light">
                    {aud}
                  </span>
                  <button
                    className="ml-1 text-stone-800"
                    onClick={() => handleAudDelete(index)}
                  >
                    <Image
                      src={del}
                      alt="remove"
                      width={18}
                      height={18}
                    ></Image>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <button
            onClick={handleJwtSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
          >
            Generate Token
          </button>
        </div>
      </div>
      {jwt && (
        <div
          className="mt-6 bg-green-100 border p-2 border-green-400 text-green-700 rounded-md w-full flex justify-between items-center"
          role="alert"
        >
          <span className="mt-1 pl-1 pb-2 w-10/12 whitespace-nowrap overflow-x-scroll scroll-my-4 text-center">
            {jwt}
          </span>

          <button
            className=" bg-green-400 hover:opacity-45 rounded-md"
            onClick={() => {
              navigator.clipboard.writeText(jwt);
            }}
          >
            <Image
              width={16}
              height={16}
              src={copy}
              alt="copy"
              className="m-2"
            ></Image>
          </button>
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
