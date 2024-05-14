import { useContext, useEffect, useState } from "react";
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
import { UserContext, UserContextType } from "../../../context/userContext";
import Joyride from "react-joyride";

const SingleGame = () => {
  const { gameId } = useParams();

  const { user, setUserTrigger } = useContext(UserContext) as UserContextType;
  const [activeGame, setActiveGame] = useState<gameType | undefined>();

  const [locked, setLocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [openLabel, setOpenLabel] = useState<labelType | any>(false);
  const [openTest, setOpenTest] = useState<boolean>(false);
  const [openPlay, setOpenPlay] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<modelType | any>({});
  const [userGame, setUserGame] = useState<any>();

  const [{ run, steps }] = useState<any>({
    run: true,
    steps: [
      {
        content: <h2 className="text-xl">Let's begin our journey!</h2>,
        locale: { skip: <strong>SKIP</strong> },
        placement: "center",
        target: "body",
      },
      {
        content: (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-xl">Create a label</h1>
            <p className="text-sm">
              Create a label and a clickable label button will show up
            </p>
          </div>
        ),
        placement: "bottom",
        target: "#step-1",
        title: "Labels",
      },
      {
        content: (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-xl">Add labels here</h1>
            <p className="text-sm">
              Create examples for you model using this clickable label
            </p>
          </div>
        ),
        placement: "bottom",
        target: "#step-2",
        title: "Examples",
      },

      {
        content: (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-xl">Train Your Model Here</h1>
            <p className="text-sm">
              Train your model on the dataset you provided!
            </p>
          </div>
        ),
        placement: "bottom",
        target: "#step-4",
        title: "Training",
      },

      {
        content: (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-xl">Play With Your Model Here</h1>
            <p className="text-sm">
              Build something fun in Scratch and play! you can complete the
              mission to unlock the next one
            </p>
          </div>
        ),
        placement: "bottom",
        target: "#step-6",
        title: "Playing",
      },
    ],
  });

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
    const lastUserGame = user?.gamesProgress[user.gamesProgress.length - 1];

    if (
      (activeGame?.order as number) <= (lastUserGame?.order as number) ||
      (activeGame?.order as number) < (user?.progress as number) + 1
    ) {
      setLocked(false);
      setLoading(false);
    } else {
      setLocked(true);
      setLoading(false);
    }

    setLoading(false);
  };

  const getActiveModel = () => {
    user?.gamesProgress.map((game) => {
      if (game._id == gameId) {
        setActiveModel(game.model);
        setUserGame(game);
      }
    });
  };

  //true means disabled in thsese two functions
  const TrainingEligible = () => {
    let count = 0;
    activeModel.dataset?.labels.forEach((label: labelType) => {
      count += label.examples.length;
    });
    if (activeModel.isTrained) {
      return false;
    } else if (count >= 10) return false;
    else return true;
  };

  const PlayingEligible = () => {
    if (activeModel.isTrained) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    getActiveGame();
  }, []);

  useEffect(() => {
    getActiveModel();
  }, [user]);

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
      <Joyride
        run={run}
        steps={steps}
        continuous
        styles={{
          options: {
            arrowColor: "#031C28",
            backgroundColor: "#163748",
            primaryColor: "#000",
            textColor: "white",

            beaconSize: 20,
            zIndex: 1000,
          },
        }}
      />
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

          <TrainOption game={activeGame} setTrigger={setUserTrigger} />

          {activeModel.dataset.labels &&
          activeModel.dataset.labels.length > 0 ? (
            <div className="flex flex-col md:flex-wrap md:flex-row md:items-start  items-center gap-3 h-[300px] max-h-[300px] overflow-y-auto">
              {activeModel.dataset.labels.map((label: labelType, i: number) => (
                <button
                  key={i}
                  className="btn-primary-dark h-[60px] min-h-[60px] w-[160px] lg:h-[70px] lg:w-[180px]   xl:h-[78px] xl:w-[200px]"
                  onClick={() => setOpenLabel(label)}
                  id="step-2"
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
              id="step-4"
            >
              Train
            </button>
            <button
              className=" btn-primary-white disabled-btn"
              onClick={() => setOpenPlay(true)}
              disabled={PlayingEligible()}
              id="step-6"
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
              setTrigger={setUserTrigger}
              model={activeModel}
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
              model={activeModel as modelType}
              setTrigger={setUserTrigger}
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
              model={userGame.model as modelType}
              setTrigger={setUserTrigger}
              game={userGame}
            />
          }
        />
      )}
    </section>
  );
};

export default SingleGame;
