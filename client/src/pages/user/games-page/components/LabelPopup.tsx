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
    <div className="popup">
      <motion.div>{label?.labelName}</motion.div>;
    </div>
  );
};

export default LabelPopup;
