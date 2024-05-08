import { exampleType, labelType } from "../../../../tools/data-types/modelType";
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
}: {
  label: labelType | null;
  setOpen: React.Dispatch<React.SetStateAction<labelType | null>>;
  gameId: string | undefined;
  game: gameType | undefined;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  const [example, setExample] = useState<string>("");

  const [examples, setExamples] = useState<[exampleType] | []>([]);

  const getExamples = () => {
    const ex = game?.model.dataset.labels.find((lab) => lab._id == label?._id);
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
        setOpen(null);
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
      <div className="flex justify-between items-center w-full">
        <button
          className="bg-red-400/80 rounded-full p-2 hover:opacity-80 disabled:opacity-80"
          onClick={deleteLabel}
          disabled={game?.isComplete}
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
            <button
              className="btn-primary-white  text-xs sm:text-sm md:text-base  disabled-btn"
              disabled={game?.isComplete}
            >
              + Example
            </button>
          </PopoverHandler>
          <PopoverContent className="bg-primary flex flex-col items-center gap-2">
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
            className="btn-primary-dark text-xs group flex gap-3 items-center cursor-default"
          >
            {ex.example}
            <small
              className="invisible group-hover:visible bg-red-500 p-1 rounded-full cursor-pointer"
              onClick={() => deleteExample(ex._id)}
            >
              <IoMdClose />
            </small>
          </button>
        ))}
      </div>
    </>
  );
};

export default LabelPopup;
