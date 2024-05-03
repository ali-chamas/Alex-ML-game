import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import { gameType } from "../../../tools/data-types/gameType";

import TrainOption from "./components/TrainOption";
import Loader from "../../../common/components/Loader";
import LabelPopup from "../games-page/components/LabelPopup";
import { labelType } from "../../../tools/data-types/modelType";

const SingleGame = () => {
  const { gameId } = useParams();

  const { approvedGames, gamesStateTrigger } = useContext(
    GamesContext
  ) as GamesContextType;

  const [activeGame, setActiveGame] = useState<gameType | undefined>();

  const [locked, setLocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [openLabel, setOpenLabel] = useState<labelType | null>(null);

  const getActiveGame = () => {
    if (approvedGames?.length == 1) {
      setActiveGame(approvedGames[0]);
    }
    setActiveGame(approvedGames?.find((game) => game._id == gameId));
  };

  const unlockGame = () => {
    if (activeGame?.isStarted) {
      setLocked(false);
      setLoading(false);
    } else {
      setLocked(true);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getActiveGame();
  }, [approvedGames?.length, gamesStateTrigger]);

  useEffect(() => {
    if (activeGame) {
      unlockGame();
    }
  }, [activeGame]);

  return (
    <div className=" mt-10">
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : locked ? (
        <div className="flex items-center justify-center">
          <h1 className="text-xl lg:text-3xl">Game is not started yet!</h1>
        </div>
      ) : (
        <div className="flex flex-col  min-h-[80vh] items-center gap-10">
          <h1 className="text-primary text-xl">{activeGame?.name}</h1>
          <TrainOption game={activeGame} />
          <div className="flex flex-wrap gap-6">
            {activeGame?.model.dataset.labels.map((label, i) => (
              <button
                key={i}
                className="btn-primary-dark h-[60px] w-[160px] lg:h-[70px] lg:w-[180px]   xl:h-[78px] xl:w-[200px]"
                onClick={() => setOpenLabel(label)}
              >
                {label.labelName}
              </button>
            ))}
          </div>
        </div>
      )}
      {openLabel && <LabelPopup label={openLabel} setOpen={setOpenLabel} />}
    </div>
  );
};

export default SingleGame;
