import { createContext, useEffect, useState } from "react";
import { userType } from "../tools/data-types/userType";
import { sendRequest } from "../tools/request-method/request";

export interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

const DarkModeContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const localMode = window.localStorage.getItem("dark") || false;

  const [isDarkMode, setIsDarkMode] = useState(localMode === "true");

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (isDarkMode) {
      if (htmlElement) {
        htmlElement.classList.add("dark");
      }
    } else {
      if (htmlElement) {
        htmlElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((dark) => !dark);

    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.classList.toggle("dark");
    }
    window.localStorage.setItem("dark", `${!isDarkMode}`);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContextProvider;
