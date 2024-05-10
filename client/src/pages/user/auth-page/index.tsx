import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import authBg from "../../../assets/login-bg.png";
import lightBg from "../../../assets/auth-light.png";
import { motion } from "framer-motion";
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

      <motion.img
        whileInView={{ opacity: 100 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeIn" }}
        src={authBg}
        alt=""
        className="hidden  dark:xl:block xl:w-[600px] xl:h-[500px] 2xl:w-[800px] 2xl:h-[600px] absolute bottom-0 right-0  mt-auto"
      />

      <motion.img
        whileInView={{ opacity: 100 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeIn" }}
        src={lightBg}
        alt="bg"
        className="hidden xl:block dark:xl:hidden w-[600px] 2xl:w-[620px]"
      />
    </section>
  );
};

export default Auth;
