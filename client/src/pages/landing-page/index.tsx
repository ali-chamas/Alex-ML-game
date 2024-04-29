import alex from "../../assets/marco.png";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
      <div className=" flex flex-col gap-[25px] max-w-[600px]">
        <h1
          className="text-primary text-[96px] flex flex-col gap-0"
          style={{ lineHeight: "1.2" }}
        >
          <span>LET THE</span>
          <span>JOUNEY Begin</span>
        </h1>
        <p className="text-[24px]">
          I’m Alex, your guide through this journey! Create an account if you
          haven’t yet, and let’s start a machine learning journey, full of fun
          and discoveries, with me!{" "}
        </p>
        <div className="flex justify-between gap-5 h-[63px] text-[24px]">
          <button className="btn-primary-white w-full ">Get started</button>
          <button className="btn-primary-dark w-full">Continue</button>
        </div>
      </div>
      <motion.img
        initial={{ y: 0 }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        src={alex}
        alt=""
        className="w-[550px] h-[587px]"
      />
    </div>
  );
};

export default Landing;
