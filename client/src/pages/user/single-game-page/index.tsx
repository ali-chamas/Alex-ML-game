import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import { gameType } from "../../../tools/data-types/gameType";

import TrainOption from "./components/TrainOption";

const SingleGame = () => {
  const { gameId } = useParams();

  const { globalGames } = useContext(GamesContext) as GamesContextType;

  const [activeGame, setActiveGame] = useState<gameType | undefined>();

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

  return (
    <div className="flex flex-col  min-h-[80vh] items-center gap-5 mt-10">
      <h1 className="text-primary text-xl">{activeGame?.name}</h1>
      <TrainOption />
    </div>
  );
};

export default SingleGame;
