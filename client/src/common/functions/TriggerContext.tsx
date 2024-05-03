import { useContext } from "react";
import { GamesContext, GamesContextType } from "../../context/gamesContext";
import { UserContext, UserContextType } from "../../context/userContext";

export const useTriggerContext = () => {
  const gamesContext = useContext(GamesContext) as GamesContextType;
  const userContext = useContext(UserContext) as UserContextType;

  const { setGamesTrigger } = gamesContext;
  const { setUserTrigger } = userContext;

  const triggerContext = () => {
    setGamesTrigger((t) => !t);
    setUserTrigger((t) => !t);
  };

  return { triggerContext };
};
