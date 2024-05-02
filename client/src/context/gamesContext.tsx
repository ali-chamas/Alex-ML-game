import { createContext, useContext, useEffect, useState } from "react";

import { gameType } from "../tools/data-types/gameType";
import { sendRequest } from "../tools/request-method/request";
import { UserContext, UserContextType } from "./userContext";

export interface GamesContextType {
  globalGames: [gameType] | [];
  approvedGames: [gameType] | [];

  getGames: () => void;
}

export const GamesContext = createContext<GamesContextType | null>(null);

const GamesContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { user } = useContext(UserContext) as UserContextType;

  const [globalGames, setGlobalGames] = useState<[gameType] | []>([]);

  const [approvedGames, setApprovedGames] = useState<[gameType] | []>([]);

  const getGames = async () => {
    try {
      const res = await sendRequest("GET", "/user/get_games");
      const { data } = res;

      setGlobalGames(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getApprovedGames = async () => {
    if (globalGames) {
      const games = globalGames.filter(
        (e: gameType) => e.isApproved !== false
      ) as [gameType];

      const gamesWithNoUser = games.filter(
        (game) => !user?.games.find((userGame) => game._id === userGame._id)
      ) as never[];

      setApprovedGames(user?.games.concat(gamesWithNoUser) as [gameType]);
    } else {
      setApprovedGames(globalGames);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    getApprovedGames();
  }, [globalGames.length]);

  console.log(approvedGames);

  return (
    <GamesContext.Provider value={{ globalGames, getGames, approvedGames }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
