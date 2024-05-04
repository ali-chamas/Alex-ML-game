import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import { gameType } from "../../../tools/data-types/gameType";
import Gamecard from "../games-page/components/Gamecard";

const Profile = () => {
  const [currentGame, setCurrentGame] = useState<gameType | null>(null);

  const { user } = useContext(UserContext) as UserContextType;

  const { approvedGames, gamesStateTrigger } = useContext(
    GamesContext
  ) as GamesContextType;

  const [progress, setProgress] = useState<boolean>(false);

  const findCurrentGame = () => {
    const current = user?.games.find(
      (game) => game.isStarted && !game.isComplete
    );

    if (current) {
      setCurrentGame(current);
      setProgress(true);
    } else {
      const unlockedGame = approvedGames[user?.games.length as number];
      if (unlockedGame) {
        if (unlockedGame.isApproved) {
          setCurrentGame(unlockedGame);
        } else {
          setCurrentGame(user?.games.pop() as gameType);
        }
      } else {
        setCurrentGame(user?.games.pop() as gameType);
      }
    }
  };

  const scrollToProfile = () => {
    let offsetTop = document.getElementById("profile")?.offsetTop;
    window.scrollTo({
      top: offsetTop ?? -100,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    findCurrentGame();
  }, [approvedGames?.length, gamesStateTrigger]);

  return (
    currentGame && (
      <div className="mt-10 ">
        <div className="min-h-[80vh] flex flex-col justify-between items-center">
          <div className="flex flex-col items-center gap-4 ">
            <h1 className="text-primary text-2xl">Current mission</h1>
            <Gamecard game={currentGame} user={user} checkProgress={progress} />
          </div>
          <button className="btn-primary-dark" onClick={scrollToProfile}>
            Progress
          </button>
        </div>
        <div
          id="profile"
          className="min-h-[100vh] lg:min-h-[80vh] flex items-center justify-center"
        >
          <div className="bg-primary w-[300px] h-[500px] rounded-lg"></div>
        </div>
      </div>
    )
  );
};

export default Profile;
