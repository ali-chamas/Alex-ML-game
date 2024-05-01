import { useEffect, useState } from "react";
import { gameType } from "../../../../tools/data-types/gameType";

import { apiUrl } from "../../../../tools/api-url/apiUrl";
import { FaFilePdf } from "react-icons/fa6";
import { userType } from "../../../../tools/data-types/userType";

const Gamecard = ({
  game,
  user,
}: {
  game: gameType | any;
  user: userType | any;
}) => {
  const [availableOrder, setAvailableOrder] = useState<number>(-1);

  const checkAvailableGame = () => {
    const completedGames = user?.games.filter(
      (game: gameType) => game.isComplete
    );
    if (completedGames?.length == user?.games.length) {
      setAvailableOrder(completedGames?.length + 1);
    }
  };
  useEffect(() => {
    checkAvailableGame();
  }, []);

  console.log(availableOrder);

  return (
    <div className="flex flex-col items-center gap-2 rounded-md bg-[#031C28] bg-opacity-75 h-[320px] w-[300px]">
      <div className="relative">
        <img src={`${apiUrl}/${game.image}`} alt="" className="rounded-t-md" />
        <button
          className="absolute top-0 right-0 m-3 text-red-500 bg-red-500/75 rounded-full p-3"
          onClick={() => window.open(`${apiUrl}/${game.solution}`)}
        >
          <FaFilePdf />
        </button>
      </div>
      <div className="px-5  flex flex-col gap-3 items-center">
        <h1 className="font-bold">{game.name}</h1>
        <small className="text-white/70 ">{game.description}</small>
        {game.isStarted && game.iscomplete ? (
          <button className="btn-primary-white w-[200px]">finished</button>
        ) : game.isStarted && !game.iscomplete ? (
          <button className="btn-primary-white w-[200px]">continue</button>
        ) : !game.isStarted && game.order == availableOrder ? (
          <button className="btn-primary-white w-[200px]">start Mission</button>
        ) : (
          <button
            className="border-2 rounded-lg p-2 bg-black/25 border-white/40 disabled:opacity-80 w-[200px] "
            disabled
          >
            locked
          </button>
        )}
      </div>
    </div>
  );
};

export default Gamecard;
