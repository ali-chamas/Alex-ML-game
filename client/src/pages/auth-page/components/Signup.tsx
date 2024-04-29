import { Input, Typography } from "@material-tailwind/react";

const Signup = ({ setType }: any) => {
  return (
    <form className=" flex flex-col items-center gap-6 w-[300px] md:w-[400px] xl:w-[450px]">
      <h1 className="text-primary text-2xl lg:text-3xl">
        {" "}
        LET'S GET YOU STARTED!
      </h1>

      <div className="flex flex-col w-full md:flex-row gap-6 md:gap-2 ">
        <Input
          label="First Name"
          className="md:w-[95%] xl:w-[99%]"
          color="white"
        />
        <Input
          label="Last Name "
          className="md:w-[95%] xl:w-[99%]"
          color="white"
        />
      </div>
      <Input label="Username " className="w-full" color="white" />
      <div className="w-full">
        <Input label="Password " type="password" color="white" />
        <Typography className="mt-2 flex items-center gap-1 font-normal text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-mt-px h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          Use at least 8 characters, one uppercase, one lowercase and one
          number.
        </Typography>
      </div>
      <Input label="Last Name " color="white" />
      <button className="btn-primary-white w-full">Let's Start</button>
      <Typography>
        Already has an account?{" "}
        <button className="text-[#69F2FA]" onClick={() => setType("login")}>
          Login
        </button>
      </Typography>
    </form>
  );
};

export default Signup;
