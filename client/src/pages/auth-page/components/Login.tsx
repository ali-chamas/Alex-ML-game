import { Input, Typography } from "@material-tailwind/react";

const Login = ({ setType }: any) => {
  return (
    <form className=" flex flex-col items-center gap-6 w-[300px] lg:w-[400px]">
      <h1 className="text-primary text-2xl  lg:text-3xl">
        {" "}
        LET'S Continue the jouney!
      </h1>

      <Input label="Username " className="w-full" color="white" />

      <Input label="Password " type="password" color="white" />

      <button className="btn-primary-white w-full">Continue!</button>
      <Typography>
        Doesn't have an account?{" "}
        <button className="text-[#69F2FA]" onClick={() => setType("singup")}>
          SignUp
        </button>
      </Typography>
    </form>
  );
};

export default Login;
