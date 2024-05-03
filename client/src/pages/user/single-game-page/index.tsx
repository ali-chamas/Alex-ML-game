import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { gameType } from "../../../tools/data-types/gameType";

import TrainOption from "./components/TrainOption";
import Loader from "../../../common/components/Loader";
import LabelPopup from "../games-page/components/LabelPopup";
import { labelType } from "../../../tools/data-types/modelType";
import { sendRequest } from "../../../tools/request-method/request";

const SingleGame = () => {
  const { gameId } = useParams();

  const [activeGame, setActiveGame] = useState<gameType | undefined>();

  const [locked, setLocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [openLabel, setOpenLabel] = useState<labelType | null>(null);
  const [trigger, setTrigger] = useState<boolean>(false);

  const getActiveGame = async () => {
    try {
      const res = await sendRequest("GET", `/user/get_game/${gameId}`);

      if (res.status == 200) {
        setActiveGame(res.data);
      }
    } catch (error) {
      console.log(error);
    }
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
  }, [trigger]);

  useEffect(() => {
    if (activeGame) {
      unlockGame();
    } else {
      setLocked(true);
      setLoading(false);
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
          <TrainOption game={activeGame} setTrigger={setTrigger} />
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
      {openLabel && (
        <LabelPopup
          label={openLabel}
          setOpen={setOpenLabel}
          gameId={gameId}
          setTrigger={setTrigger}
        />
      )}
    </div>
  );
};

export default SingleGame;
