import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const UserLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type LoginFormData = z.infer<typeof UserLoginSchema>;

const LoginForm = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormData>({ resolver: zodResolver(UserLoginSchema) });

  const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
    const result = await login(data);
    if (result.success) {
      toast.success(result.message);
      navigate("/dashboard");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full max-w-[550px] p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1A1C21]">Login</h2>
        <p className="text-[#71717A] mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      <fieldset disabled={isSubmitting} className="contents">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#71717A]"
            >
              Email / Staff ID
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                size={18}
              />
              <input
                id="email"
                className={`w-full h-11 pl-10 pr-4 border rounded-xl outline-none transition-all ${
                  errors.email
                    ? "border-red-500"
                    : "border-[#E2E4E9] focus:border-[#1A47FE]"
                }`}
                type="text"
                placeholder="email / staff id"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#71717A]"
              >
                PIN / Password
              </label>
              <button
                type="button"
                className="text-[12px] cursor-pointer font-medium text-[#1A47FE] hover:underline"
                onClick={() => navigate("/verify-email")}
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                size={18}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="pin / password"
                className={`w-full h-11 pl-10 pr-10 border rounded-xl outline-none transition-all ${
                  errors.password
                    ? "border-red-500"
                    : "border-[#E2E4E9] focus:border-[#1A47FE]"
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
              <p className="text-red-500 text-xs font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="pt-4 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#1A47FE] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-sm font-normal text-[#71717A]">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-[#1A47FE] cursor-pointer font-medium hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default LoginForm;
