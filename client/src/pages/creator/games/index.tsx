import { useContext } from "react";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import Gamecard from "../../user/games-page/components/Gamecard";
import CreatorGameCard from "./components/CreatorGameCard";

const CreatorGames = () => {
  const { globalGames } = useContext(GamesContext) as GamesContextType;
  return (
    <div className="flex flex-col gap-10 my-10 md:m-10 w-full">
      <div className="flex justify-between">
        <h1 className="text-primary text-3xl">Our Games</h1>
        <button className="btn-primary-dark">+Game</button>
      </div>
      <div className="flex flex-wrap gap-5">
        {globalGames.map((game, i) => (
          <CreatorGameCard game={game} key={i} />
        ))}
      </div>
    </div>
  );
};

export default CreatorGames;
