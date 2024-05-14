import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../context/DarkModeContext";
import { useContext } from "react";

const DarkModeToggler = () => {
  const { isDarkMode, toggleDarkMode } = useContext(
    DarkModeContext
  ) as DarkModeContextType;
  return (
    <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={30} />
  );
};

export default DarkModeToggler;
