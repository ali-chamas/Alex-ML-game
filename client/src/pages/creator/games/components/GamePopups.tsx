import { Input, Option, Select, Textarea } from "@material-tailwind/react";
import { useContext } from "react";

import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";

const GamePopups = ({
  title,
  value,
  setState,
  reqTitle,
}: {
  title: string | undefined;
  value: string | number | undefined;
  setState: any;
  reqTitle: string;
}) => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  return (
    <div className="flex  w-full items-center justify-between ">
      {title == "Description" ? (
        <Textarea
          label="Description"
          value={value}
          className="w-full  dark:text-white"
          onChange={(e) =>
            setState((prev: any) => ({ ...prev, [reqTitle]: e.target.value }))
          }
        />
      ) : title == "Level" ? (
        <Select
          label="Level"
          value={value as string}
          onChange={(e) =>
            setState((prev: any) => ({ ...prev, [reqTitle]: e }))
          }
        >
          <Option value="beginner">Beginner</Option>
          <Option value="intermediate">Intermediate</Option>
          <Option value="advanced">Advanced</Option>
        </Select>
      ) : (
        <Input
          label={title}
          type={typeof value == "number" ? "number" : "text"}
          color={isDarkMode ? "white" : "black"}
          value={input}
          onChange={(e) =>
            setState((prev: any) => ({ ...prev, [reqTitle]: e.target.value }))
          }
        />
      )}
    </div>
  );
};

export default GamePopups;
