import { useContext, useEffect, useState } from "react";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import AdminGameCard from "./components/AdminGameCard";
import toast, { Toaster } from "react-hot-toast";
import { gameType } from "../../../tools/data-types/gameType";

const AdminGames = () => {
  const { globalGames, setCreatorTrigger } = useContext(
    GamesContext
  ) as GamesContextType;

  const [filteredGames, setFilteredGames] = useState<gameType[] | []>([]);

  useEffect(() => {
    setFilteredGames(globalGames);
  }, [globalGames.length]);

  const deleteGameAlert = (title: string, method: () => void) => {
    toast((t: any) => (
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-lg">Delete {title} ? </h1>
        <div className="flex  w-full gap-5">
          <button
            className="btn-primary-danger"
            onClick={() => {
              method();
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            className="btn-primary-dark"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  const filterAprroved = (param: boolean) => {
    const filtered = filteredGames.filter(
      (game: gameType) => game.isApproved == param
    );
    setFilteredGames(filtered);
  };

  return (
    <div className="flex flex-col gap-5 ">
      <Toaster />
      <div className="flex justify-between sticky top-0 bg-primary p-5 rounded-lg z-10">
        <h1 className="text-primary text-3xl">Our Games</h1>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {filteredGames.map((game, i) => (
          <AdminGameCard
            game={game}
            setTrigger={setCreatorTrigger}
            alert={deleteGameAlert}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminGames;
