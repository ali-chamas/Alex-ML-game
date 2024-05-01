import { createContext, useState } from "react";

import { gameType } from "../tools/data-types/gameType";

export interface GamesContextType {
  games: [gameType] | [];
  setGames: ({}: [gameType] | []) => void;
}

export const GamesContext = createContext<GamesContextType | null>(null);

const UserContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [games, setGames] = useState<[gameType] | []>([]);

  return (
    <GamesContext.Provider value={{ games, setGames }}>
      {children}
    </GamesContext.Provider>
  );
};

export default UserContextProvider;
