import { Input } from "@material-tailwind/react";
import { useContext } from "react";

import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";
import { userType } from "../../../../tools/data-types/userType";

const InputPopups = ({
  title,
  value,
  reqTitle,
  setUserInfo,
  userInfo,
}: {
  title: string | undefined;
  value: string | number | undefined;
  reqTitle: string | undefined;
  setUserInfo: any;
  userInfo: userType | any;
}) => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  return (
    <div className="flex gap-2 w-full items-center justify-center mt-2">
      <Input
        label={title}
        type={typeof value == "number" ? "number" : "text"}
        className="w-full"
        color={isDarkMode ? "white" : "black"}
        defaultValue={value}
        onChange={(e) =>
          setUserInfo({ ...userInfo, [reqTitle as string]: e.target.value })
        }
      />
    </div>
  );
};

export default InputPopups;
