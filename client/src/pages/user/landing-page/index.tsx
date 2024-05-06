import { useNavigate } from "react-router-dom";
import alex from "../../../assets/marco.png";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row items-center gap-16 lg:justify-between min-h-[80vh] mt-20 md:mt-10 lg:mt-0 lg:gap-0">
      <div className=" flex flex-col gap-[25px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[650px]">
        <h1
          className="text-primary text-5xl md:text-6xl lg:text-7xl  2xl:text-[96px] "
          style={{ lineHeight: "1.1" }}
        >
          LET THE JOURNEY BEGIN
        </h1>
        <p className="xl:text-[24px]">
          I’m Alex, your guide through this journey! Create an account if you
          haven’t yet, and let’s start a machine learning journey, full of fun
          and discoveries, with me!{" "}
        </p>
        <div className="flex justify-between gap-5 h-[50px] xl:h-[63px] xl:text-[24px]">
          <button
            className="btn-primary-white w-full "
            onClick={() => navigate("/auth/signup")}
          >
            Get Started
          </button>
          <button
            className="btn-primary-dark w-full"
            onClick={() => navigate("/auth/login")}
          >
            Continue
          </button>
        </div>
      </div>
      <motion.img
        initial={{ y: 0 }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        src={alex}
        alt=""
        className=" w-[250px] lg:w-[350px] xl:w-[530px] 2xl:w-[580px] "
      />
    </div>
  );
};

export default Landing;
