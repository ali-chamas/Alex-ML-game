import { useContext, useEffect, useState } from "react";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import AdminGameCard from "./components/AdminGameCard";
import toast, { Toaster } from "react-hot-toast";
import { gameType } from "../../../tools/data-types/gameType";
import { Option, Select } from "@material-tailwind/react";

const AdminGames = () => {
  const { globalGames, setCreatorTrigger, gamesStateTrigger } = useContext(
    GamesContext
  ) as GamesContextType;

  const [filteredGames, setFilteredGames] = useState<gameType[] | []>([]);

  useEffect(() => {
    setFilteredGames(globalGames);
  }, [gamesStateTrigger]);

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

  const filterAprroved = (param: string) => {
    if (param == "approved") {
      const filtered = filteredGames.filter(
        (game: gameType) => game.isApproved
      );
      setFilteredGames(filtered);
    } else if (param == "not approved") {
      const filtered = filteredGames.filter(
        (game: gameType) => !game.isApproved
      );
      setFilteredGames(filtered);
    } else {
      setFilteredGames(globalGames);
    }
  };

  return (
    <div className="flex flex-col gap-5 ">
      <Toaster />
      <div className="flex justify-between sticky top-0 bg-primary p-5 rounded-lg z-10">
        <h1 className="text-primary text-lg lg:text-3xl">Our Games</h1>
        <div>
          <Select label="Status" onChange={(e) => filterAprroved(e as string)}>
            <Option value="all">All</Option>
            <Option value="approved">Approved</Option>
            <Option value="not approved">Not Approved</Option>
          </Select>
        </div>
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
