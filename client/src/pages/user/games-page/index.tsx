import { useContext, useEffect, useState } from "react";
import GamesFilter from "./components/GamesFilter";
import { gameType } from "../../../tools/data-types/gameType";
import { UserContext, UserContextType } from "../../../context/userContext";
import { sendRequest } from "../../../tools/request-method/request";

const Games = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const [games, setGames] = useState<[gameType] | []>([]);

  const getGames = async () => {
    try {
      const res = await sendRequest("GET", "/user/get_games");
      setGames(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="flex flex-col mt-12 gap-12 min-h-[80vh]">
      <h1 className="text-primary text-[48px] self-center">
        CHOOSE YOUR MISSION
      </h1>
      <div className="self-end">
        <GamesFilter />
      </div>
      <div></div>
    </div>
  );
};

export default Games;
