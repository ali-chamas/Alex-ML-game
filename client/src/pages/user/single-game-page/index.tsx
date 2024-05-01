import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import { gameType } from "../../../tools/data-types/gameType";

const SingleGame = () => {
  const { gameId } = useParams();

  const { globalGames } = useContext(GamesContext) as GamesContextType;

  const [activeGame, setActiveGame] = useState<gameType | any>();

  const getActiveGame = () => {
    if (globalGames.length == 1) {
      setActiveGame(globalGames[0]);
    }
    setActiveGame(globalGames.find((game) => game._id == gameId));
  };

  console.log(activeGame);

  useEffect(() => {
    getActiveGame();
  }, []);

  return <div>index</div>;
};

export default SingleGame;
