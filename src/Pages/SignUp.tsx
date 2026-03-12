import SignUpForm from "../components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="hidden md:flex md:w-1/2">
        <img
          src="/sign-up-image.png"
          alt="Sign up illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center overflow-y-auto py-12 px-4">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
