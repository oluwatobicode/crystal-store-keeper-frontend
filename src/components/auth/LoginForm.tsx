import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";

const UserLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type LoginFormData = z.infer<typeof UserLoginSchema>;

const LoginForm = () => {
  const { login } = useAuth();

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
    <fieldset disabled={isSubmitting} className="contents">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col justify-center border border-[#E2E4E9] items-center gap-6 w-full max-w-[484px] p-6 h-auto mx-4 bg-white rounded-[20px] shadow-[0px_0px_20px_rgba(0,_0,_0,_0.05)]"
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
              Login
            </h1>
            <p className="text-[12px] font-normal text-[#71717A] tracking-normal leading-[23.4px]">
              Enter your credentials to access your account
            </p>
          </div>
        </div>

        <div className="w-full space-y-4 flex flex-col">
          <label
            htmlFor="email"
            className="text-[12px] font-medium text-[#71717A] tracking-[0.9px] leading-[16.2px]"
          >
            Email / Staff ID
          </label>
          <input
            id="email"
            className={`w-full h-[41px] placeholder:text-[12px] border outline-none rounded-[12px] transition-colors px-3 ${
              errors.email ? "border-red-600" : " border-[#F2F2F2]"
            }`}
            type="text"
            placeholder="email / staff id"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-xs font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="w-full space-y-4 flex flex-col">
          <label
            htmlFor="password"
            className="text-[12px] font-medium text-[#71717A] tracking-[0.9px] leading-[16.2px]"
          >
            PIN / Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="pin / password"
            className={`w-full h-[41px] placeholder:text-[12px] border rounded-[12px] outline-none transition-colors px-3 ${
              errors.password ? "border-red-600" : " border-[#F2F2F2]"
            }`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-xs font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mt-5 w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white h-10 cursor-pointer border border-[#F2F2F2] bg-[#1A47FE] hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        </div>
      </form>
    </fieldset>
  );
};

export default LoginForm;
