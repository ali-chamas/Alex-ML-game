import {
  exampleType,
  labelType,
  modelType,
} from "../../../../tools/data-types/modelType";
import { IoMdClose } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { sendRequest } from "../../../../tools/request-method/request";

import {
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { gameType } from "../../../../tools/data-types/gameType";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";

const LabelPopup = ({
  label,
  game,
  setOpen,
  gameId,
  setTrigger,
  model,
}: {
  label: labelType | null;
  model: modelType | any;
  setOpen: React.Dispatch<React.SetStateAction<labelType | boolean>>;
  gameId: string | undefined;
  game: gameType | undefined;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  const [example, setExample] = useState<string>("");

  const [examples, setExamples] = useState<[exampleType] | []>([]);

  const getExamples = () => {
    const ex = model.dataset.labels.find(
      (lab: labelType) => lab._id == label?._id
    );
    if (ex) {
      setExamples(ex.examples);
    } else {
      setExamples([]);
    }
  };

  const deleteLabel = async () => {
    const reqBody = { gameId: gameId, labelId: label?._id };

    try {
      const res = await sendRequest("POST", "/user/delete_label", reqBody);
      if (res.status == 200) {
        setTrigger((t) => !t);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addExample = async () => {
    if (example != "") {
      const reqBody = { gameId: gameId, labelId: label?._id, example: example };
      try {
        const res = await sendRequest("POST", "/user/add_example", reqBody);
        if (res.status == 200) {
          setTrigger((t) => !t);
          setExample("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteExample = async (id: string) => {
    const reqBody = {
      gameId: gameId,
      labelId: label?._id,
      exampleId: id,
    };
    try {
      const res = await sendRequest("POST", "/user/delete_example", reqBody);

      if (res.status == 200) {
        setTrigger((t) => !t);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExamples();
  }, [game]);

  return (
    <>
      <div className="flex justify-between w-full">
        <button
          className="bg-red-400/80 rounded-full p-3 hover:opacity-80 disabled:opacity-80"
          onClick={deleteLabel}
        >
          <FaTrash fill="white" />
        </button>
        <Popover placement="bottom">
          <PopoverHandler>
            <button className="btn-primary-white  text-xs sm:text-sm md:text-base  disabled-btn">
              + Example
            </button>
          </PopoverHandler>
          <PopoverContent className="bg-primary flex flex-col items-center gap-2 z-30">
            <Input
              label="example"
              value={example}
              type="text"
              color={isDarkMode ? "white" : "black"}
              onChange={(e) => setExample(e.target.value)}
            />
            <button className="btn-primary-white" onClick={addExample}>
              Add
            </button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap gap-2">
        {examples.map((ex: exampleType, i: number) => (
          <button
            key={i}
            className="btn-primary-dark relative text-xs group flex gap-3 items-center cursor-default"
          >
            {ex.example}
            <button
              className="invisible absolute group-hover:visible -top-3 right-1 bg-red-500 p-1 rounded-full "
              onClick={() => deleteExample(ex._id)}
            >
              <IoMdClose />
            </button>
          </button>
        ))}
      </div>
    </>
  );
};

export default LabelPopup;
