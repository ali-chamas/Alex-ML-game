import { useContext, useEffect, useState } from "react";
import GamesFilter from "./components/GamesFilter";
import { gameType } from "../../../tools/data-types/gameType";

import { sendRequest } from "../../../tools/request-method/request";
import Gamecard from "./components/Gamecard";
import Loader from "../../../common/components/Loader";
import { UserContext, UserContextType } from "../../../context/userContext";

const Games = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const [games, setGames] = useState<[gameType] | []>([]);
  const [filteredGames, setFilteredGames] = useState<[gameType] | []>(games);
  const [loading, setLoading] = useState<boolean>(false);

  const getGames = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("GET", "/user/get_games");
      setGames(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getFinalGamesArray = () => {
    const gamesWithNoUser = user?.games.filter((userGame) =>
      games.some((game) => game._id === userGame._id)
    );
  };

  useEffect(() => {
    getGames();
  }, []);

  //in a seperate use effect to prevent fetching twice
  useEffect(() => {
    setFilteredGames(games);
  }, [games.length]);

  return (
    <div className="flex flex-col mt-12 gap-12 min-h-[80vh]">
      <h1 className="text-primary text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[48px] self-center">
        CHOOSE YOUR MISSION
      </h1>
      <div className="self-end">
        <GamesFilter setFiltered={setFilteredGames} games={games} />
      </div>
      {loading ? (
        <div className="self-center">
          <Loader />
        </div>
      ) : (
        <div className="self-center">
          {filteredGames.length > 0 ? (
            filteredGames.map((game, i) => <Gamecard key={i} game={game} />)
          ) : (
            <p>No games yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Games;
