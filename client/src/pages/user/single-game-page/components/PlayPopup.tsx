import { modelType } from "../../../../tools/data-types/modelType";
import { useContext, useState } from "react";

import scratchImg from "../../../../assets/Scratch-cat.png";
import { sendRequest } from "../../../../tools/request-method/request";

import toast, { Toaster } from "react-hot-toast";
import { UserContext, UserContextType } from "../../../../context/userContext";

const PlayPopup = ({
  gameId,
  model,
  setTrigger,
  game,
}: {
  gameId: string;

  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  model: modelType;
  game: any;
}) => {
  const { token } = useContext(UserContext) as UserContextType;

  const [complete, setComplete] = useState(game.finished);

  const toggleComplete = async () => {
    try {
      const res = await sendRequest("PUT", "/user/complete_game", {
        gameId: gameId,
      });

      setComplete((c: boolean) => !c);

      setTrigger((t) => !t);
      toast.success(
        complete
          ? "Continue training!"
          : "congrats! Note: you can't train you model anymore",
        { className: "dark:bg-blue-gray-900 dark:text-white" }
      );
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", {
        className: "dark:bg-blue-gray-900 dark:text-white",
      });
    }
  };

  return (
    <>
      <Toaster />

      <div className="flex flex-col items-center gap-3 bg-primary border-2 border-black/10 rounded-md pb-3 m-auto">
        <img
          src={scratchImg}
          className="w-[220px] md:w-[250px] rounded-t-md"
          alt=""
        />
        Scratch!
        <button
          className="btn-primary-dark"
          onClick={() =>
            window.open(
              `https://alex-ml1.github.io/alex/scratch?url=${model.modelUrl}&token=${token}`
            )
          }
        >
          Go
        </button>
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
