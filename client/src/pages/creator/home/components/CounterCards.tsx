import { useContext, useEffect, useState } from "react";
import {
  GamesContext,
  GamesContextType,
} from "../../../../context/gamesContext";
import { useSelector } from "react-redux";
import { userType } from "../../../../tools/data-types/userType";

const CounterCards = () => {
  const { globalGames } = useContext(GamesContext) as GamesContextType;

  const usersState = useSelector((state: any) => state.users.users);

  const [gamesCount, setGamesCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);

  const getCreators = () => {
    const creators = usersState.filter(
      (user: userType) => user.role == "creator"
    );
    setUsersCount(creators.length);
  };

  useEffect(() => {
    setGamesCount(globalGames.length);
  }, [globalGames.length]);

  useEffect(() => {
    getCreators();
  }, [usersState.length]);

  return (
    <div className="flex gap-5 md:gap-10 lg:gap-20">
      <div className="px-10 py-6 bg-primary rounded-lg border lg:text-xl">
        {usersCount} creators
      </div>
      <div className="px-10 py-6 bg-primary rounded-lg border lg:text-xl">
        {gamesCount} games
      </div>
    </div>
  );
};

export default CounterCards;
