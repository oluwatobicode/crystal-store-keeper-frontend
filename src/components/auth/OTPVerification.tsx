import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";

const OTPVerification = () => {
  const { otp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      toast.error("Invalid session. Please sign up again.");
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otpValues.join("");
    if (otpString.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    setIsSubmitting(true);
    const result = await otp({ email, otp: otpString });
    setIsSubmitting(false);

    if (result.success) {
      toast.success(result.message);
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full max-w-[484px] p-8 flex flex-col items-center">
      <div className="flex items-center justify-center w-full mb-5">
        <img
          src="Logo.svg"
          className="h-auto max-w-[150px]"
          alt="crystal-store-keeper-logo"
        />
      </div>

      <div className="w-full mb-8 text-center">
        <h2 className="text-sm font-bold text-[#1A1C21]">Verify your email</h2>
        <p className="text-[#71717A] mt-2">
          We've sent a 6-digit code to{" "}
          <span className="font-semibold text-[#1A1C21]">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="w-full space-y-8">
        <div className="flex justify-between gap-2">
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold border  border-[#E2E4E9] rounded-xl outline-none transition-all "
            />
          ))}
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[300px] max-w-full h-12 bg-[#1A47FE] text-white rounded-full cursor-pointer font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </div>

        <div className="text-center">
          <p className="text-[#71717A] text-sm">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-[#1A47FE] cursor-pointer font-medium hover:underline"
            >
              Resend code
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
