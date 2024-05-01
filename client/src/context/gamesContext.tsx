import { createContext, useState } from "react";

import { gameType } from "../tools/data-types/gameType";

export interface GamesContextType {
  globalGames: [gameType] | [];
  setGlobalGames: ({}: [gameType] | []) => void;
}

export const GamesContext = createContext<GamesContextType | null>(null);

const GamesContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [globalGames, setGlobalGames] = useState<[gameType] | []>([]);

  return (
    <GamesContext.Provider value={{ globalGames, setGlobalGames }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
