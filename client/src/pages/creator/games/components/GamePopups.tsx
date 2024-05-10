import {
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { sendRequest } from "../../../../tools/request-method/request";
import { UserContext, UserContextType } from "../../../../context/userContext";
import toast, { Toaster } from "react-hot-toast";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";

const GamePopups = ({
  title,
  value,
  reqTitle,
  gameId,
}: {
  title: string | undefined;
  value: string | number | undefined;
  reqTitle: string | undefined;
  gameId: string | undefined;
}) => {
  interface errorType {
    status: number;
  }

  const [input, setInput] = useState<string | number>("");
  const { setUserTrigger } = useContext(UserContext) as UserContextType;
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  const updateGame = async () => {
    try {
      const res = await sendRequest("PUT", `/creator/update_game/${gameId}`, {
        reqTitle: input,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2 w-full items-center justify-between mt-2">
      <Toaster />
      <p>{title}</p>
      <Popover placement="bottom">
        <PopoverHandler>
          <button className="btn-primary-dark disabled-btn-dark">
            {value}
          </button>
        </PopoverHandler>
        <PopoverContent className="bg-primary flex flex-col items-center gap-2">
          <Input
            label={title}
            type={typeof value == "number" ? "number" : "text"}
            color={isDarkMode ? "white" : "black"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn-primary-white" onClick={updateGame}>
            Edit
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GamePopups;
