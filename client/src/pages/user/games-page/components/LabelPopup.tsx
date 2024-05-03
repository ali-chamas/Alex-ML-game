import { motion } from "framer-motion";
import { labelType } from "../../../../tools/data-types/modelType";
import { IoMdClose } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { sendRequest } from "../../../../tools/request-method/request";
import { useTriggerContext } from "../../../../common/functions/TriggerContext";
import {
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useState } from "react";

const LabelPopup = ({
  label,
  setOpen,
  gameId,
  setTrigger,
}: {
  label: labelType | null;
  setOpen: React.Dispatch<React.SetStateAction<labelType | null>>;
  gameId: string | undefined;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { triggerContext } = useTriggerContext();

  const [example, setExample] = useState<string>("");

  const [examples, setExamples] = useState<any>(label?.examples);

  const deleteLabel = async () => {
    const reqBody = { gameId: gameId, labelId: label?._id };

    try {
      const res = await sendRequest("POST", "/user/delete_label", reqBody);
      setTrigger((t) => !t);
      setOpen(null);
    } catch (error) {
      console.log(error);
    }
  };

  const addExample = async () => {
    const reqBody = { gameId: gameId, labelId: label?._id, example: example };
    try {
      const res = await sendRequest("POST", "/user/add_example", reqBody);
      triggerContext();
      setExamples([...examples, { example: example }]);
      setExample("");
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExample = async () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="popup ">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: label ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="popup-child flex flex-col gap-5"
      >
        <div className="flex justify-between items-center w-full">
          <button
            className="bg-red-400/80 rounded-full p-2 hover:opacity-80"
            onClick={deleteLabel}
          >
            <FaTrash />
          </button>

          <h1 className=" text-lg ">{label?.labelName}</h1>

          <button onClick={() => setOpen(null)} className="text-xl ">
            <IoMdClose />
          </button>
        </div>
        <div className="self-end">
          <Popover placement="bottom">
            <PopoverHandler>
              <button className="btn-primary-white  text-xs sm:text-sm md:text-base  ">
                example +
              </button>
            </PopoverHandler>
            <PopoverContent className="bg-primary flex flex-col items-center gap-2">
              <Input
                label="example"
                value={example}
                type="text"
                color="white"
                onChange={(e) => setExample(e.target.value)}
              />
              <button className="btn-primary-white" onClick={addExample}>
                add
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-wrap gap-2">
          {examples.map((ex: { example: string }, i: number) => (
            <button
              key={i}
              className="btn-primary-dark text-xs group flex gap-3 items-center "
            >
              {ex.example}
              <small className="invisible group-hover:visible bg-red-500 p-1 rounded-full">
                <FaTrash />
              </small>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LabelPopup;
