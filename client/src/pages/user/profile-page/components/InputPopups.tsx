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

  const [input, setInput] = useState<string | number>("");
  const { setUserTrigger } = useContext(UserContext) as UserContextType;

  const updateUser = async () => {
    const reqBody = {
      [reqTitle as string]: input,
    };
    try {
      const res = await sendRequest("PUT", "/user/update_my_info", reqBody);

      setUserTrigger((t) => !t);
      toast.success(`${title} updated succesfully`);
    } catch (error: errorType | any) {
      console.log(error);

      if (error?.response.status == 400) toast.error("username already taken");
      else {
        toast.error("something went wrong");
      }
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
            color="white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn-primary-white" onClick={updateUser}>
            Edit
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InputPopups;
