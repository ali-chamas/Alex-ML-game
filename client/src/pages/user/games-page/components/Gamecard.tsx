import { useContext, useEffect, useState } from "react";
import { gameType } from "../../../../tools/data-types/gameType";
import { apiUrl } from "../../../../tools/api-url/apiUrl";
import { FaFilePdf } from "react-icons/fa6";
import { sendRequest } from "../../../../tools/request-method/request";
import { useNavigate } from "react-router-dom";

import { UserContext, UserContextType } from "../../../../context/userContext";

const Gamecard = ({ game }: { game: gameType | any }) => {
  const { user, setUserTrigger } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const [status, setStatus] = useState<string>("");

  const checkGameStatus = () => {
    if (!user || !user.gamesProgress) return;

    if (!user.currentGame) {
      if (game.order === user.progress + 1) {
        setStatus("ready");
      } else {
        setStatus("locked");
      }
    } else if (user.currentGame._id === game._id) {
      setStatus("in progress");
    } else {
      const lastUserGame = user.gamesProgress[user.gamesProgress.length - 1];
      if (game.order <= lastUserGame.order) {
        setStatus("completed");
      } else if (game.order === lastUserGame.order + 1) {
        setStatus("ready");
      } else {
        setStatus("locked");
      }
    }
  };

  useEffect(() => {
    checkGameStatus();
  }, [user]);

  const startGame = async () => {
    try {
      await sendRequest("POST", "/user/start_game", {
        gameId: game._id,
      });
      setUserTrigger((t) => !t);
      navigate(`/games/${game._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-md bg-primary bg-opacity-75 h-[320px] w-[300px] border-2 border-black/10">
      <div className="relative">
        <img
          src={`${apiUrl}/${game.image}`}
          alt=""
          className="rounded-t-md h-[150px] w-[300px]"
        />
        <button
          className="absolute top-0 right-0 m-3 bg-black/40 rounded-full p-3"
          onClick={() => window.open(`${apiUrl}/${game.solution}`)}
        >
          <FaFilePdf fill="white" />
        </button>
      </div>
      <div className="px-5  flex flex-col gap-3 items-center">
        <h1 className="font-bold">{game.name}</h1>
        <small className="text-black/70 dark:text-white/70">
          {game.description}
        </small>
        {status === "completed" ? (
          <button
            className="btn-primary-white w-[200px]"
            onClick={() => navigate(`/games/${game._id}`)}
          >
            Completed
          </button>
        ) : status === "in progress" ? (
          <button
            className="btn-primary-white w-[200px]"
            onClick={() => navigate(`/games/${game._id}`)}
          >
            Continue
          </button>
        ) : status === "ready" ? (
          <button className="btn-primary-white w-[200px]" onClick={startGame}>
            Start Mission
          </button>
        ) : (
          <button
            className="border-2 rounded-lg p-2 bg-black/25 border-white/40 disabled:opacity-80 w-[200px]"
            disabled
          >
            Locked
          </button>
        )}
      </div>
    </div>
  );
};

export default Gamecard;
