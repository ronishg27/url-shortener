"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export function VerifyPassKey({
  setIsVerified,
}: {
  setIsVerified: Dispatch<SetStateAction<boolean>>;
}) {
  const [passKey, setPassKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (passKey === process.env.NEXT_PUBLIC_PASSKEY) {
      setIsVerified(true);
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setErrorMessage("Incorrect PassKey, please try again.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        document.getElementById("passkey")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [passKey]); // Adding dependencies to avoid stale closure

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
      <Input
        id="passkey"
        type="text"
        placeholder="Enter Passkey"
        value={passKey}
        onChange={(e) => setPassKey(e.target.value)}
        className="w-full"
      />
      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm font-medium text-center">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
