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

const InputPopups = ({
  title,
  value,
  reqTitle,
}: {
  title: string | undefined;
  value: string | number | undefined;
  reqTitle: string | undefined;
}) => {
  interface errorType {
    status: number;
  }

  const [input, setInput] = useState<string | number>(value);
  const { setUserTrigger } = useContext(UserContext) as UserContextType;
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  const updateUser = async () => {
    const reqBody = {
      [reqTitle as string]: input,
    };
    try {
      const res = await sendRequest("PUT", "/user/update_my_info", reqBody);

      setUserTrigger((t) => !t);
      toast.success(`${title} updated succesfully`, {
        className: "dark:bg-blue-gray-900 dark:text-white",
      });
    } catch (error: errorType | any) {
      console.log(error);

      if (error?.response.status == 400)
        toast.error("username already taken", {
          className: "dark:text-white dark:bg-blue-gray-900",
        });
      else {
        toast.error("something went wrong", {
          className: "dark:bg-blue-gray-900",
        });
      }
    }
  };

  return (
    <div className="flex gap-2 w-full items-center justify-center mt-2">
      <Toaster />

      <Input
        label={title}
        type={typeof value == "number" ? "number" : "text"}
        className="w-full"
        color={isDarkMode ? "white" : "black"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default InputPopups;
