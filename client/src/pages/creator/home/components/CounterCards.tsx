import { useContext, useEffect, useState } from "react";
import {
  GamesContext,
  GamesContextType,
} from "../../../../context/gamesContext";

import { sendRequest } from "../../../../tools/request-method/request";
import { FaGamepad, FaUser } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { useSelector } from "react-redux";

const CounterCards = ({ type }: { type: string }) => {
  const users = useSelector((state: any) => state.users.users);

  const { globalGames } = useContext(GamesContext) as GamesContextType;

  const [gamesCount, setGamesCount] = useState<number>(0);

  const [creatorsCount, setCreatorsCount] = useState<number>(0);

  const getCreators = async () => {
    try {
      const res = await sendRequest("GET", "/creator/get_creators");
      const creators = res.data;
      setCreatorsCount(creators.length);
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
    <div
      className={`flex flex-col gap-3 ${
        type == "admin" && "lg:flex-row"
      }  items-center justify-evenly`}
    >
      <div className=" bg-primary rounded-lg   w-[250px] h-[120px] flex items-center justify-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl">
            <FaUser />
          </h1>
          <h1 className="text-xl">{users.length} Users</h1>
        </div>
      </div>
      <div className=" bg-primary rounded-lg   w-[250px] h-[120px] flex items-center justify-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl">
            <IoMdColorPalette />
          </h1>
          {creatorsCount == 1 ? (
            <h1 className="text-xl">{creatorsCount} Creator</h1>
          ) : (
            <h1 className="text-xl">{creatorsCount} Creators</h1>
          )}
        </div>
      </div>
      <div className=" bg-primary rounded-lg   w-[250px] h-[120px] flex items-center justify-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl">
            <FaGamepad />
          </h1>
          <h1 className="text-xl">{gamesCount} Games</h1>
        </div>
      </div>
    </div>
  );
};

export default CounterCards;
