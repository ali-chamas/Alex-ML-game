import { useContext, useEffect, useState } from "react";
import {
  GamesContext,
  GamesContextType,
} from "../../../../context/gamesContext";

import { sendRequest } from "../../../../tools/request-method/request";

const CounterCards = () => {
  const { globalGames } = useContext(GamesContext) as GamesContextType;

  const [gamesCount, setGamesCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);

  const getCreators = async () => {
    try {
      const res = await sendRequest("GET", "/creator/get_creators");
      const creators = res.data;
      setUsersCount(creators.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setGamesCount(globalGames.length);
  }, [globalGames.length]);

  useEffect(() => {
    getCreators();
  }, []);

  return (
    <div className="flex gap-5 md:gap-10 lg:gap-20">
      <div className="px-10 py-6 bg-primary rounded-lg border lg:text-xl">
        <h1>{usersCount} creators</h1>
      </div>
      <div className="px-10 py-6 bg-primary rounded-lg border lg:text-xl">
        <h1>{gamesCount} games</h1>
      </div>
    </div>
  );
};

export default CounterCards;
