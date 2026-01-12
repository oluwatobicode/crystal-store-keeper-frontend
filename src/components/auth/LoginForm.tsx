import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const UserLoginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type LoginFormData = z.infer<typeof UserLoginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({ resolver: zodResolver(UserLoginSchema) });

  const handleLogin: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col justify-center items-center gap-6 w-full max-w-[484px] p-6 h-auto mx-4 bg-white rounded-[20px] shadow-2xl"
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
          htmlFor="username"
          className="text-[12px] font-medium text-[#71717A] tracking-[0.9px] leading-[16.2px]"
        >
          Username / Staff ID
        </label>
        <input
          id="username"
          required
          className={`w-full h-[41px] border outline-none focus:border-[#1A47FE] transition-colors px-3 ${
            errors.username ? "border-red-600" : " border-[#F2F2F2]"
          }`}
          type="text"
          placeholder="username / staff id"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-600 text-xs font-medium">
            {errors.username.message}
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
          required
          type="password"
          placeholder="pin / password"
          className={`w-full h-[41px] border outline-none focus:border-[#1A47FE] transition-colors px-3 ${
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
          className="w-full text-white h-10 cursor-pointer border border-[#F2F2F2] bg-[#1A47FE] hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
