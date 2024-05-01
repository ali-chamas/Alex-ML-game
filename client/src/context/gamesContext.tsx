import { createContext, useState } from "react";

import { gameType } from "../tools/data-types/gameType";

export interface GamesContextType {
  globalGames: [gameType] | [];
  setGlobalGames: ({}: [gameType] | []) => void;
  addGames: (games: [gameType] | []) => void;
}

export const GamesContext = createContext<GamesContextType | null>(null);

const GamesContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const localGames = window.localStorage.getItem("games");
  const [globalGames, setGlobalGames] = useState<[gameType] | []>(
    JSON.parse(localGames as string)
  );

  const addGames = (games: [gameType] | []) => {
    setGlobalGames(games);
    window.localStorage.setItem("games", JSON.stringify(games));
  };

  return (
    <GamesContext.Provider value={{ globalGames, setGlobalGames, addGames }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
