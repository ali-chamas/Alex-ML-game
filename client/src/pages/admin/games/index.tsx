import { useContext } from "react";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import AdminGameCard from "./components/AdminGameCard";

const AdminGames = () => {
  const { globalGames } = useContext(GamesContext) as GamesContextType;

  return (
    <div className="flex flex-col p-10">
      <h1 className="text-primary text-lg m:text-xl lg:text-2xl">Games</h1>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {globalGames.map((game, i) => (
          <AdminGameCard game={game} key={i} />
        ))}
      </div>
    </div>
  );
};

export default AdminGames;
