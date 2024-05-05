import { IoMdClose } from "react-icons/io";
import { modelType } from "../../../../tools/data-types/modelType";
import { useState } from "react";
import { gameType } from "../../../../tools/data-types/gameType";
import scratchImg from "../../../../assets/Scratch-cat.png";
import { sendRequest } from "../../../../tools/request-method/request";
import { useTriggerContext } from "../../../../common/functions/TriggerContext";

const PlayPopup = ({
  gameId,

  setOpen,

  setTrigger,
  game,
}: {
  gameId: string;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  model: modelType;
  game: gameType;
}) => {
  const { triggerContext } = useTriggerContext();

  const [complete, setComplete] = useState(game.isComplete);

  const toggleComplete = async () => {
    try {
      const res = await sendRequest("PUT", "/user/complete_game", {
        gameId: gameId,
      });
      console.log(res);

      setComplete((c) => !c);
      triggerContext();
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center w-full ">
        <h1 className=" text-lg ">Play with your model</h1>

        <button onClick={() => setOpen(false)} className="text-xl ">
          <IoMdClose />
        </button>
      </div>
      <div className="flex flex-col items-center gap-3 bg-black/25 rounded-md pb-3 m-auto">
        <img
          src={scratchImg}
          className="w-[220px] md:w-[250px] rounded-t-md"
          alt=""
        />
        Scratch!
        <button className="btn-primary-dark">Go!</button>
      </div>
      {complete ? (
        <button
          className="btn-primary-dark self-end mt-auto"
          onClick={toggleComplete}
        >
          Continue
        </button>
      ) : (
        <button
          className="btn-primary-white self-end mt-auto"
          onClick={toggleComplete}
        >
          Complete
        </button>
      )}
    </>
  );
};

export default PlayPopup;
