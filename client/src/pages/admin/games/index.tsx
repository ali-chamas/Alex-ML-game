import { useContext } from "react";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import AdminGameCard from "./components/AdminGameCard";
import toast, { Toaster } from "react-hot-toast";

const AdminGames = () => {
  const { globalGames, setCreatorTrigger } = useContext(
    GamesContext
  ) as GamesContextType;

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

  return (
    <div className="flex flex-col gap-5 ">
      <Toaster />
      <h1 className="text-primary text-lg m:text-xl lg:text-2xl">Games</h1>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {globalGames.map((game, i) => (
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
