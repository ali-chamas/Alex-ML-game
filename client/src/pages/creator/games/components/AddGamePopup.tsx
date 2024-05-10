import { useContext } from "react";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";
import { Input } from "@material-tailwind/react";

const AddGamePopup = () => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  return (
    <div className="flex flex-col">
      <Input
        label="Username "
        className="w-full"
        color={isDarkMode ? "white" : "black"}
      />
    </div>
  );
};

export default AddGamePopup;
