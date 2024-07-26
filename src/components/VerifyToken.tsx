import React, { useState } from "react";

const VerifyToken = () => {
  type ResponseType = {
    message: string;
    user: { payload: Record<string, any> };
  };
  const [token, setToken] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [secret, setSecret] = useState("");

  console.log(response);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecret(e.target.value);
  };

  const handleSecureSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/secure?secret=${secret}`, {
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
    <>
      <h1 className="text-2xl font-medium mb-6 text-center">JWT Decoder</h1>
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
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
            value={secret}
            onChange={handleSecretChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm text-black"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
          >
            Submit
          </button>
        </div>
      </form>
      {response && (
        <div
          className="mt-6 bg-gray-200 px-4 py-3 rounded relative font-light"
          role="alert"
        >
          <span className="block sm:inline">
            <p>
              message :{" "}
              <span className="font-medium">
                {(response as ResponseType).message}
              </span>
            </p>
            Payload : &#123;
            {(response as ResponseType).user &&
              Object.keys((response as ResponseType).user.payload).map(
                (key) => {
                  return key !== "secret" ? (
                    <p>
                      &nbsp;&nbsp;{key} :{" "}
                      <span className="font-medium">
                        {key === "aud"
                          ? JSON.stringify(
                              (response as ResponseType).user.payload[key]
                            )
                          : (response as ResponseType).user.payload[key]}
                      </span>
                    </p>
                  ) : null;
                }
              )}
            &#125;
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
  );
};

export default VerifyToken;
