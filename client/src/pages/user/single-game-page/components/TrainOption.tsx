import {
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useState } from "react";
import { sendRequest } from "../../../../tools/request-method/request";
import { gameType } from "../../../../tools/data-types/gameType";

import HintPopup from "./HintPopup";
import { MdOutlineQuestionMark } from "react-icons/md";

const TrainOption = ({
  game,
  setTrigger,
}: {
  game: gameType | undefined;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [label, setLabel] = useState<string>("");

  const addLabel = async () => {
    if (label != "") {
      const gameBody = { gameId: game?._id, label: label };
      try {
        const res = await sendRequest("POST", "/user/add_label", gameBody);
        setTrigger((t) => !t);
        setLabel("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-between w-full items-center">
      <button className="rounded-full  bg-primary border p-2 hover:opacity-80">
        <MdOutlineQuestionMark />
      </button>
      <div className="flex gap-2 lg:gap-4 items-center">
        <HintPopup hint={game?.hint} />
        <Popover placement="bottom">
          <PopoverHandler>
            <button
              className="btn-primary-dark disabled-btn-dark"
              disabled={game?.isComplete}
            >
              Add Label
            </button>
          </PopoverHandler>
          <PopoverContent className="bg-primary flex flex-col items-center gap-2">
            <Input
              label="label"
              value={label}
              type="text"
              color="white"
              onChange={(e) => setLabel(e.target.value)}
            />
            <button className="btn-primary-white" onClick={addLabel}>
              Add
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TrainOption;
