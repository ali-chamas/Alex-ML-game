import { useEffect, useState } from "react";
import GamesFilter from "./components/GamesFilter";
import { gameType } from "../../../tools/data-types/gameType";

import { sendRequest } from "../../../tools/request-method/request";

const Games = () => {
  const [games, setGames] = useState<[gameType] | []>([]);
  const [filteredGames, setFilteredGames] = useState<[gameType] | []>(games);

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

  //in a seperate use effect to prevent fetching twice
  useEffect(() => {
    setFilteredGames(games);
  }, [games.length]);

  console.log(filteredGames);

  return (
    <div className="flex flex-col mt-12 gap-12 min-h-[80vh]">
      <h1 className="text-primary text-[48px] self-center">
        CHOOSE YOUR MISSION
      </h1>
      <div className="self-end">
        <GamesFilter setFiltered={setFilteredGames} games={games} />
      </div>
      <div></div>
    </div>
  );
};

export default Games;
