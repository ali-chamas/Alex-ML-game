import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../tools/request-method/request";
import { gameType } from "../../tools/data-types/gameType";

const GameLayout = ({ children }: { children: ReactNode }) => {
  const { gameId } = useParams();

  const [activeGame, setActiveGame] = useState<gameType | undefined>();

  const [locked, setLocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
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

  return <div>GameLayout</div>;
};

export default GameLayout;
