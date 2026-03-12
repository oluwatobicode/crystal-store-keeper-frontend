import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const NewPasswordSchema = z
  .object({
    password: z.string().min(5, "Password must be at least 5 characters"),
    confirmPassword: z
      .string()
      .min(5, "Password must be at least 5 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type NewPasswordFormData = z.infer<typeof NewPasswordSchema>;

const NewPasswordForm = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const handleResetPassword: SubmitHandler<NewPasswordFormData> = async (
    data,
  ) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    const result = await resetPassword(token, data.password);
    if (result.success) {
      toast.success(result.message);
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <fieldset disabled={isSubmitting} className="contents">
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="flex flex-col justify-center border border-[#E2E4E9] items-center gap-6 w-full max-w-[484px] p-6 h-auto mx-4 bg-white rounded-[20px] shadow-[0px_0px_20px_rgba(0,0,0,0.05)]"
      >
        <div className="flex flex-col w-full items-start">
          <div className="flex w-full mb-5">
            <img
              src="Logo.svg"
              className="h-auto max-w-[150px]"
              alt="crystal-store-keeper-logo"
            />
          </div>

          <div className="flex flex-col space-y-3 mb-[32px]">
            <h1 className="text-[26px] font-bold leading-[21.6px] tracking-normal">
              New Password
            </h1>
            <p className="text-[12px] font-normal text-[#71717A] tracking-normal leading-[23.4px]">
              Please enter your new password
            </p>
          </div>
        </div>

        <div className="w-full space-y-4 flex flex-col">
          <label
            htmlFor="password"
            className="text-[12px] font-medium text-[#71717A] tracking-[0.9px] leading-[16.2px]"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="enter new password"
              className={`w-full h-[41px] placeholder:text-[12px] border rounded-[12px] outline-none transition-colors px-3 pr-10 ${
                errors.password ? "border-red-600" : " border-[#F2F2F2]"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-xs font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="w-full space-y-4 flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-[12px] font-medium text-[#71717A] tracking-[0.9px] leading-[16.2px]"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="confirm new password"
              className={`w-full h-[41px] placeholder:text-[12px] border rounded-[12px] outline-none transition-colors px-3 pr-10 ${
                errors.confirmPassword ? "border-red-600" : " border-[#F2F2F2]"
              }`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-gray-700 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="mt-5 w-full flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white h-10 cursor-pointer border border-[#F2F2F2] bg-[#1A47FE] hover:bg-blue-700 transition-colors rounded-[12px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Resetting...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </fieldset>
  );
};

export default NewPasswordForm;
