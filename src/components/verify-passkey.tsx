import { Dispatch, SetStateAction, useState } from "react";
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

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
      <Input
        type="text"
        placeholder="Enter PassKey"
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
