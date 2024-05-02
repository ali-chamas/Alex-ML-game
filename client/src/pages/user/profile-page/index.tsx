import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import { gameType } from "../../../tools/data-types/gameType";

const Profile = () => {
  const [currentGame, setCurrentGame] = useState<gameType | null>();

  const { user } = useContext(UserContext) as UserContextType;

  const { globalGames } = useContext(GamesContext) as GamesContextType;

  const [progress, setProgress] = useState<boolean>(false);

  const findCurrentGame = () => {
    const current = user?.games.find(
      (game) => game.isStarted && game.isComplete
    );

    if (current) {
      setCurrentGame(current);
      setProgress(true);
    } else {
      const unlockedGame = globalGames[user?.games.length as number];
      if (unlockedGame) {
        if (unlockedGame.isApproved) {
          setCurrentGame(unlockedGame);
        } else {
          setCurrentGame(user?.games.pop());
        }
      } else {
        setCurrentGame(user?.games.pop());
      }
    }
  };
  console.log(currentGame);

  useEffect(() => {
    findCurrentGame();
  }, [globalGames.length, user]);

  return <div>Profile</div>;
};

export default Profile;
