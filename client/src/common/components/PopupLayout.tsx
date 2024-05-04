import { motion } from "framer-motion";
import { ReactNode } from "react";

const PopupLayout = ({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean | any;
}) => {
  return (
    <div className="popup ">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="popup-child flex flex-col gap-5 "
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PopupLayout;
