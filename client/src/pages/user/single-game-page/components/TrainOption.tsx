import {
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { sendRequest } from "../../../../tools/request-method/request";
import { gameType } from "../../../../tools/data-types/gameType";

import HintPopup from "./HintPopup";
import { MdOutlineQuestionMark } from "react-icons/md";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";
import JoyrideComponent from "../../../../common/components/JoyrideComponent";
import { UserContext, UserContextType } from "../../../../context/userContext";

const TrainOption = ({
  game,
  setTrigger,
  setOpenJoyride,
}: {
  game: gameType | undefined;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenJoyride: React.Dispatch<React.SetStateAction<Object>>;
}) => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;
  const [label, setLabel] = useState<string>("");
  const { user } = useContext(UserContext) as UserContextType;

  const [{ run, steps }, setState] = useState<any>({
    run: false,
    steps: [
      {
        content: <h2 className="text-xl">You Added your first Label!</h2>,
        locale: { skip: <strong>SKIP</strong> },
        placement: "center",
        target: "body",
      },
      {
        content: (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-xl">Click Here!</h1>
            <p className="text-sm">
              Click this label to add examples for your model
            </p>
          </div>
        ),
        placement: "bottom",
        target: "#step-2",
        title: "Labels",
      },
    ],
  });

  const addLabel = async () => {
    if (label != "") {
      const gameBody = { gameId: game?._id, label: label };
      try {
        const res = await sendRequest("POST", "/user/add_label", gameBody);
        setTrigger((t) => !t);
        setLabel("");

        if (
          game?.order == 1 &&
          user?.gamesProgress[0]?.model.dataset.labels.length == 0
        ) {
          setState((prev: any) => ({ ...prev, run: true }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <JoyrideComponent run={run} steps={steps} setState={setState} />

      <div className="flex justify-between w-full items-center">
        <button
          className="rounded-full  bg-primary border p-2 hover:opacity-80"
          onClick={() => setOpenJoyride((prev) => ({ ...prev, run: true }))}
        >
          <MdOutlineQuestionMark />
        </button>
        <div className="flex gap-2 lg:gap-4 items-center">
          <HintPopup hint={game?.hint} />
          <Popover placement="bottom">
            <PopoverHandler>
              <button
                className="btn-primary-dark disabled-btn-dark"
                id="step-1"
              >
                Add Label
              </button>
            </PopoverHandler>
            <PopoverContent className="bg-primary flex flex-col items-center gap-2">
              <Input
                label="label"
                value={label}
                type="text"
                color={isDarkMode ? "white" : "black"}
                onChange={(e) => setLabel(e.target.value)}
              />
              <button className="btn-primary-white" onClick={addLabel}>
                Add
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default TrainOption;
