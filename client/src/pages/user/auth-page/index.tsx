import { useState } from "react";
import { useParams } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import authBg from "../../../assets/login-bg.png";

const Auth = () => {
  const authType = useParams().type;
  const [type, setType] = useState<string>(authType || "login");

  return (
    <div className="flex justify-center min-h-[85vh] max-h-[90vh] items-center xl:justify-between ">
      {type == "login" ? (
        <Login setType={setType} />
      ) : (
        <Signup setType={setType} />
      )}
      <img
        src={authBg}
        alt=""
        className="hidden xl:block xl:w-[700px] xl:h-[500px] 2xl:w-[800px] 2xl:h-[600px] absolute bottom-0 right-0  mt-auto"
      />
    </div>
  );
};

export default Auth;
