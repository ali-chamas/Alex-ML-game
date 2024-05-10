import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { gameType } from "../../../tools/data-types/gameType";

import TrainOption from "./components/TrainOption";
import Loader from "../../../common/components/Loader";
import LabelPopup from "./components/LabelPopup";
import { labelType, modelType } from "../../../tools/data-types/modelType";
import { sendRequest } from "../../../tools/request-method/request";
import TestPopup from "./components/TestPopup";
import PlayPopup from "./components/PlayPopup";
import PopupLayout from "../../../common/components/PopupLayout";
import logo from "../../../assets/marco.png";

const SingleGame = () => {
  const { gameId } = useParams();

  const [activeGame, setActiveGame] = useState<gameType | undefined>();

  const [locked, setLocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);

  const [openLabel, setOpenLabel] = useState<labelType | any>(false);
  const [openTest, setOpenTest] = useState<boolean>(false);
  const [openPlay, setOpenPlay] = useState<boolean>(false);

  const getActiveGame = async () => {
    try {
      const res = await sendRequest("GET", `/user/get_game/${gameId}`);

      if (res.status == 200) {
        setActiveGame(res.data);
      }
      console.log("triggered");
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

  //true means disabled in thsese two functions
  const TrainingEligible = () => {
    let count = 0;
    activeGame?.model.dataset.labels.forEach((label) => {
      count += label.examples.length;
    });
    if (activeGame?.model.isTrained) {
      return false;
    } else if (count >= 10) return false;
    else return true;
  };

  const PlayingEligible = () => {
    if (activeGame?.model.isTrained) {
      return false;
    } else {
      return true;
    }
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
    <section className=" mt-10 min-h-[80vh]">
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
          <h1 className="text-primary text-2xl lg:text-4xl">
            {activeGame?.name}
          </h1>

          <TrainOption game={activeGame} setTrigger={setTrigger} />

          {activeGame?.model.dataset.labels &&
          activeGame?.model.dataset.labels.length > 0 ? (
            <div className="flex flex-col md:flex-wrap md:flex-row md:items-start  items-center gap-3 h-[300px] max-h-[300px] overflow-y-auto">
              {activeGame?.model.dataset.labels.map((label, i) => (
                <button
                  key={i}
                  className="btn-primary-dark h-[60px] min-h-[60px] w-[160px] lg:h-[70px] lg:w-[180px]   xl:h-[78px] xl:w-[200px]"
                  onClick={() => setOpenLabel(label)}
                >
                  {label.labelName}
                </button>
              ))}
            </div>
          ) : (
            <h1 className=" h-[300px] flex flex-col lg:text-2xl justify-center items-center text-xl">
              No labels yet
              <img src={logo} alt="" className="w-[150px] lg:w-[200px]" />
            </h1>
          )}
          <div className="flex justify-between w-full ">
            <button
              className="btn-primary-white disabled-btn"
              disabled={TrainingEligible()}
              onClick={() => setOpenTest(true)}
            >
              Test Your Model
            </button>
            <button
              className=" btn-primary-white disabled-btn"
              onClick={() => setOpenPlay(true)}
              disabled={PlayingEligible()}
            >
              Play
            </button>
          </div>
        </div>
      )}
      {openLabel && (
        <PopupLayout
          setOpen={setOpenLabel}
          title={openLabel.labelName}
          children={
            <LabelPopup
              label={openLabel}
              gameId={gameId}
              setTrigger={setTrigger}
              game={activeGame}
              setOpen={setOpenLabel}
            />
          }
          open={openLabel}
        />
      )}
      {openTest && (
        <PopupLayout
          open={openTest}
          setOpen={setOpenTest}
          title="Test your model"
          children={
            <TestPopup
              gameId={gameId as string}
              model={activeGame?.model as modelType}
              setTrigger={setTrigger}
            />
          }
        />
      )}
      {openPlay && (
        <PopupLayout
          open={openPlay}
          setOpen={setOpenPlay}
          title="Try your model and complete!"
          children={
            <PlayPopup
              gameId={gameId as string}
              model={activeGame?.model as modelType}
              setTrigger={setTrigger}
              game={activeGame as gameType}
            />
          }
        />
      )}
    </section>
  );
};

export default SingleGame;
