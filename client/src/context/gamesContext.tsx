import { createContext, useContext, useEffect, useState } from "react";

import { gameType } from "../tools/data-types/gameType";
import { sendRequest } from "../tools/request-method/request";
import { UserContext, UserContextType } from "./userContext";

export interface GamesContextType {
  globalGames: [gameType] | [];
  approvedGames: [gameType] | [];
  gamesTrigger: boolean;
  setGamesTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatorTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  gamesStateTrigger: boolean;
  getGames: () => void;
}

export const GamesContext = createContext<GamesContextType | null>(null);

const GamesContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { user, token, userTrigger } = useContext(
    UserContext
  ) as UserContextType;

  const [globalGames, setGlobalGames] = useState<[gameType] | []>([]);

  const [approvedGames, setApprovedGames] = useState<[gameType] | []>([]);
  const [gamesTrigger, setGamesTrigger] = useState<boolean>(false);
  const [gamesStateTrigger, setGamesStateTrigger] = useState<boolean>(false);
  const [creatorTrigger, setCreatorTrigger] = useState<boolean>(false);

  const getGames = async () => {
    try {
      const res = await sendRequest("GET", "/user/get_games");
      const { data } = res;

      setGlobalGames(data);
      setGamesTrigger((t: boolean) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  const getApprovedGames = async () => {
    if (globalGames) {
      const games = globalGames.filter(
        (e: gameType) => e.isApproved !== false
      ) as [gameType];

      setApprovedGames(games.sort((a, b) => a.order - b.order));
      setGamesStateTrigger((t) => !t);
    }
  };

  useEffect(() => {
    getGames();
  }, [token]);
  useEffect(() => {
    if (user?.role == "creator" || user?.role == "admin") getGames();
  }, [creatorTrigger]);

  useEffect(() => {
    getApprovedGames();
  }, [user, gamesTrigger, userTrigger]);

  return (
    <GamesContext.Provider
      value={{
        globalGames,
        getGames,
        approvedGames,
        gamesTrigger,
        setGamesTrigger,
        gamesStateTrigger,
        setCreatorTrigger,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
