import { useState } from "react";
import { useParams } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import authBg from "../../assets/login-bg.png";

const Auth = () => {
  const authType = useParams().type;
  const [type, setType] = useState(authType);

  return (
    <div className="flex justify-center min-h-[85vh] max-h-[87vh] items-center xl:justify-between ">
      {type == "login" ? (
        <Login setType={setType} />
      ) : (
        <Signup setType={setType} />
      )}
      <img
        src={authBg}
        alt=""
        className="hidden xl:block xl:w-[700px] xl:h-[500px] 2xl:w-[800px] 2xl:h-[600px] relative  xl:-bottom-28 2xl:-bottom-16 -right-20"
      />
    </div>
  );
};

export default Auth;
