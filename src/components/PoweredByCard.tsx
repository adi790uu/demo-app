import React from "react";

const PoweredByCard = () => {
  return (
    <div className="rounded-md p-6 flex items-center justify-center w-full mb-4 border-2">
      <div>
        <h2 className="text-xl font-light text-gray-800">
          Powered by{" "}
          <span className="font-semibold font-mono tracking-wide">
            SecureAuthJWT
          </span>
        </h2>
        <p className="text-gray-500 text-xs text-left tracking-wider">
          Secure your apps with JWT
        </p>
      </div>
    </div>
  );
};

export default PoweredByCard;
