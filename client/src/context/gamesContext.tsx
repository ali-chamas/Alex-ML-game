import { createContext, useEffect, useState } from "react";

import { gameType } from "../tools/data-types/gameType";
import { sendRequest } from "../tools/request-method/request";

export interface GamesContextType {
  globalGames: [gameType] | [];

  getGames: () => void;
}

export const GamesContext = createContext<GamesContextType | null>(null);

const GamesContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const localGames = window.localStorage.getItem("games");
  const [globalGames, setGlobalGames] = useState<[gameType] | []>(
    JSON.parse(localGames as string)
  );

  const getGames = async () => {
    try {
      const res = await sendRequest("GET", "/user/get_games");
      const { data } = res;

      setGlobalGames(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGames();
  }, []);

  return (
    <GamesContext.Provider value={{ globalGames, getGames }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
