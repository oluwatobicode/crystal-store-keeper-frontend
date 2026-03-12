import OTPVerification from "../components/auth/OTPVerification";

const VerifyOTP = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-4">
      <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-xl overflow-hidden">
        <OTPVerification />
      </div>
    </div>
  );
};

export default VerifyOTP;
