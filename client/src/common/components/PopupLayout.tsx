import { motion } from "framer-motion";
import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

const PopupLayout = ({
  children,
  open,
  setOpen,
  title,
}: {
  children: ReactNode;
  open: boolean | any;
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="popup ">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="popup-child flex flex-col gap-5 "
      >
        <div className="flex justify-between items-center w-full ">
          <h1 className=" text-xl ">Choose your avatar!</h1>

          <button onClick={() => setOpen(false)} className="text-xl ">
            <IoMdClose />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default PopupLayout;
