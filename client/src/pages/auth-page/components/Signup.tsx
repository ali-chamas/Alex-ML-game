import { Button, Input, Typography } from "@material-tailwind/react";
import { userType } from "../../../tools/data-types/userType";
import { useContext, useState } from "react";
import { sendRequest } from "../../../tools/request-method/request";
import { UserContext, UserContextType } from "../../../context/userContext";

const Signup = ({ setType }: any) => {
  const [userInfo, setUserInfo] = useState<userType | {}>({});
  const { addUser } = useContext(UserContext) as UserContextType;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | any>("");

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("POST", "/auth/register", userInfo);
      if (res.status == 200) {
        addUser(res.data.token, res.data.user);
        console.log(res.data);
        setError("");
      } else {
        console.log(res.data);
        setError(res.data);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response.data || "something went wrong");
    }
    setLoading(false);
  };

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
          onChange={(e) =>
            setUserInfo({ ...userInfo, firstName: e.target.value })
          }
        />
        <Input
          label="Last Name "
          className="md:w-[95%] xl:w-[99%]"
          color="white"
          onChange={(e) =>
            setUserInfo({ ...userInfo, lastName: e.target.value })
          }
        />
      </div>
      <Input
        label="Username "
        className="w-full"
        color="white"
        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
      />
      <div className="w-full">
        <Input
          label="Password "
          type="password"
          color="white"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
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
      <Input
        label="Age"
        type="number"
        color="white"
        onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
      />

      <Button
        type="button"
        loading={loading}
        className="btn-primary-white w-full"
        onClick={handleRegister}
      >
        Let's Start
      </Button>
      {error && <small className="text-red-400">{error}</small>}
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
