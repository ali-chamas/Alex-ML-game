import { IoSettings } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa";
import {
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useState } from "react";
import { sendRequest } from "../../../../tools/request-method/request";
import { gameType } from "../../../../tools/data-types/gameType";
import PopupLayout from "../../../../common/components/PopupLayout";
import HintPopup from "./HintPopup";

const TrainOption = ({
  game,
  setTrigger,
}: {
  game: gameType | any;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [label, setLabel] = useState<string>("");
  const [openHint, setOpenHint] = useState<boolean>(false);

  const addLabel = async () => {
    const gameBody = { gameId: game._id, label: label };
    try {
      const res = await sendRequest("POST", "/user/add_label", gameBody);
      setTrigger((t) => !t);
      setLabel("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between w-full items-center">
      <button className="rounded-full  bg-primary border p-2 hover:opacity-80">
        <IoSettings />
      </button>
      <div className="flex gap-2 lg:gap-4 items-center">
        <button
          className="rounded-full  bg-primary border p-2 hover:opacity-80"
          onClick={() => setOpenHint(true)}
        >
          <FaLightbulb />
        </button>
        <Popover placement="bottom">
          <PopoverHandler>
            <button className="btn-primary-dark">add label</button>
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
              add
            </button>
          </PopoverContent>
        </Popover>
      </div>
      {openHint && (
        <PopupLayout
          children={<HintPopup setOpen={setOpenHint} hint={game.hint} />}
          open={openHint}
        />
      )}
    </div>
  );
};

export default TrainOption;
