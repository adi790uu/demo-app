import React from "react";

const PoweredByCard = () => {
  return (
    <div className="rounded-lg p-6 flex items-center justify-center w-1/2">
      <div>
        <h2 className="text-xl font-light text-gray-800">
          Powered by{" "}
          <span className="font-semibold font-mono tracking-wide">
            SecureAuthJWT
          </span>
        </h2>
        <p className="text-gray-600 text-sm">Secure your apps with JWT</p>
      </div>
    </div>
  );
};

export default PoweredByCard;
