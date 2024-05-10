import { useContext } from "react";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";
import { Input, Select, Textarea, Option } from "@material-tailwind/react";

const AddGamePopup = () => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  const checkIfOrderIsAvailable = () => {};

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          label="Title"
          className="w-full"
          color={isDarkMode ? "white" : "black"}
        />
        <Input
          label="Hint"
          className="w-full"
          color={isDarkMode ? "white" : "black"}
        />
      </div>
      <Textarea
        label="Description"
        className="w-full border-white dark:text-white"
      />
      <div className="flex gap-2">
        <Input
          label="Order"
          className="w-full"
          type="number"
          color={isDarkMode ? "white" : "black"}
        />
        <Select label="Level">
          <Option>Beginner</Option>
          <Option>Intermediate</Option>
          <Option>Advanced</Option>
        </Select>
      </div>

      <div className="flex gap-2"></div>
    </div>
  );
};

export default AddGamePopup;
