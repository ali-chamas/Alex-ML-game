import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import authBg from "../../../assets/login-bg.png";
import lightBg from "../../../assets/auth-light.png";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../context/DarkModeContext";

const Auth = () => {
  const authType = useParams().type;
  const [type, setType] = useState<string>(authType || "login");

  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  return (
    <section className="flex justify-center min-h-[85vh] max-h-[90vh] items-center xl:justify-between ">
      {type == "login" ? (
        <Login setType={setType} isDark={isDarkMode} />
      ) : (
        <Signup setType={setType} isDark={isDarkMode} />
      )}
      {isDarkMode ? (
        <img
          src={authBg}
          alt=""
          className="hidden xl:block xl:w-[600px] xl:h-[500px] 2xl:w-[800px] 2xl:h-[600px] absolute bottom-0 right-0  mt-auto"
        />
      ) : (
        <img
          src={lightBg}
          alt="bg"
          className="hidden xl:block w-[600px] 2xl:w-[620px]"
        />
      )}
    </section>
  );
};

export default Auth;
