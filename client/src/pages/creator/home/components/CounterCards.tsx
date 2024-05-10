import { useContext, useEffect, useState } from "react";
import {
  GamesContext,
  GamesContextType,
} from "../../../../context/gamesContext";

const CounterCards = () => {
  const { globalGames } = useContext(GamesContext) as GamesContextType;

  const [gamesCount, setGamesCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);

  useEffect(() => {
    setGamesCount(globalGames.length);
  }, [globalGames.length]);

  return (
    <div className="flex gap-5 md:gap-10 lg:gap-20">
      <div className="px-10 py-6 bg-primary rounded-lg border lg:text-xl">
        10 creators
      </div>
      <div className="px-10 py-6 bg-primary rounded-lg border lg:text-xl">
        {gamesCount} games
      </div>
    </div>
  );
};

export default CounterCards;
