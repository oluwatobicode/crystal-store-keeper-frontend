import { Monitor } from "lucide-react";

const MobileBlocker = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="md:hidden min-h-screen flex flex-col items-center justify-center gap-5 bg-[#F8F9FB] p-8 text-center">
        <img
          src="Logo.svg"
          className="h-auto max-w-[140px]"
          alt="crystal-store-keeper-logo"
        />
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#D1E0FF]">
          <Monitor size={26} className="text-[#1A47FE]" />
        </div>
        <h1 className="text-lg font-bold text-[#1A1C21]">Desktop only</h1>
        <p className="text-[#71717A] max-w-[320px]">
          This app is optimized for desktop screens for now. Please open it on a
          laptop or larger device.
        </p>
      </div>
      <div className="hidden md:block">{children}</div>
    </>
  );
};

export default MobileBlocker;
