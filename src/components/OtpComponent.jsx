// src/components/OtpComponent.jsx

import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button"; // Assuming you have this

export default function OtpComponent({ title, description, isLoading, error, onComplete, onCancel }) {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    if (otp.length === 6) {
      onComplete(otp);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2 text-white">{title}</h1>
      <p className="text-center text-neutral-400 mb-6">{description}</p>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-center my-8">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          onComplete={onComplete} // onComplete can be triggered automatically
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="space-y-4">
        <Button onClick={handleSubmit} disabled={isLoading || otp.length < 6} className="w-full">
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
        <Button variant="ghost" onClick={onCancel} className="w-full text-neutral-400 hover:text-white">
          Cancel
        </Button>
      </div>
    </>
  );
}
