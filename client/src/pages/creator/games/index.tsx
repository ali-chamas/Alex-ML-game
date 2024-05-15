import { useContext, useState } from "react";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";

import CreatorGameCard from "./components/CreatorGameCard";

import PopupLayout from "../../../common/components/PopupLayout";
import AddGamePopup from "./components/AddGamePopup";

const CreatorGames = () => {
  const { globalGames } = useContext(GamesContext) as GamesContextType;

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-10  w-full">
      <div className="flex justify-between sticky top-0 bg-primary p-5 rounded-lg z-10">
        <h1 className="text-primary text-3xl">Our Games</h1>
        <button
          className="btn-primary-dark"
          onClick={() => setOpenAdd((open) => !open)}
        >
          + Game
        </button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center md:justify-start">
        {globalGames.map((game, i) => (
          <CreatorGameCard game={game} key={i} />
        ))}
      </div>
      {openAdd && (
        <PopupLayout
          children={<AddGamePopup setOpen={setOpenAdd} />}
          open={openAdd}
          setOpen={setOpenAdd}
          title="Add A Game"
        />
      )}
    </div>
  );
};

export default CreatorGames;
