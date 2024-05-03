import { motion } from "framer-motion";
import { labelType } from "../../../../tools/data-types/modelType";

const LabelPopup = ({
  label,
  setOpen,
}: {
  label: labelType | null;
  setOpen: React.Dispatch<React.SetStateAction<labelType | null>>;
}) => {
  return (
    <div className="popup ">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: label ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="popup-child"
      >
        {label?.labelName}
        <button onClick={() => setOpen(null)}>X</button>
      </motion.div>
    </div>
  );
};

export default LabelPopup;
