import React from "react";
import { IoMdClose } from "react-icons/io";
import alex from "../../../../assets/logo.png";
const HintPopup = ({
  hint,
  setOpen,
}: {
  hint: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className=" text-lg ">Here's a hint!</h1>

        <button onClick={() => setOpen(false)} className="text-xl ">
          <IoMdClose />
        </button>
      </div>
      <div className="flex  gap-5  items-center justify-start h-full relative">
        <img
          src={alex}
          className="w-[100px] lg:w-[150px]"
          alt=""
          loading="lazy"
        />
        <h1 className="lg:text-base bg-black/25 p-3 rounded-lg text-sm">
          {hint}
        </h1>
      </div>
    </>
  );
};

export default HintPopup;
