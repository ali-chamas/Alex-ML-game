import { Button, Input, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { userType } from "../../../../tools/data-types/userType";
import { UserContext, UserContextType } from "../../../../context/userContext";
import { sendRequest } from "../../../../tools/request-method/request";

const Login = ({ setType }: any) => {
  const [userInfo, setUserInfo] = useState<userType | {}>({});
  const { addUser } = useContext(UserContext) as UserContextType;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | any>("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("POST", "/auth/login", userInfo);
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
    <form className=" flex flex-col items-center gap-6 w-[300px] lg:w-[400px]">
      <h1 className="text-primary text-2xl  lg:text-3xl">
        {" "}
        LET'S CONTINUE THE JOUNEY!!
      </h1>

      <Input
        label="Username "
        className="w-full"
        color="white"
        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
      />

      <Input
        label="Password "
        type="password"
        color="white"
        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
      />

      <Button
        loading={loading}
        onClick={handleLogin}
        className="btn-primary-white w-full"
      >
        Continue!
      </Button>
      {error && <small className="text-red-400">{error}</small>}
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
