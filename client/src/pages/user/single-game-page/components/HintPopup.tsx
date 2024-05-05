import React from "react";
import { IoMdClose } from "react-icons/io";
import alex from "../../../../assets/logo.png";
import { FaLightbulb } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
const HintPopup = ({ hint }: { hint: string | undefined }) => {
  return (
    <>
      <Popover placement="bottom">
        <PopoverHandler>
          <button className="rounded-full  bg-primary border p-2 hover:opacity-80">
            <FaLightbulb />
          </button>
        </PopoverHandler>
        <PopoverContent className="bg-primary flex flex-col items-center gap-2">
          {hint && <p>{hint}</p>}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default HintPopup;
