import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const PasswordInput = ({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="w-full text-[13px] bg-[#FAFAFB] h-[43px] rounded-[8px] outline-none transition-colors border border-[#E2E4E9] px-[12px] pr-10 py-[8px] focus:border-[#1A47FE]"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#1D1D1D] transition-colors cursor-pointer"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {error && (
        <span className="text-red-500 text-[10px] mt-1 block">{error}</span>
      )}
    </div>
  );
};
