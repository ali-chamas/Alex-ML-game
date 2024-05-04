import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import { gameType } from "../../../tools/data-types/gameType";
import Gamecard from "../games-page/components/Gamecard";
import { apiUrl } from "../../../tools/api-url/apiUrl";
import { FaPen } from "react-icons/fa";
import PopupLayout from "../../../common/components/PopupLayout";
import AvatarsPopup from "./components/AvatarsPopup";
import ProgressBar from "@ramonak/react-progress-bar";

const Profile = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const [currentGame, setCurrentGame] = useState<gameType | null>(null);
  const [openAvatars, setOpenAvatars] = useState<boolean>(false);

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

  const countCompletedGames = (games: [gameType] | any): number => {
    return games.reduce((count: number, game: gameType) => {
      return count + (game.isComplete ? 1 : 0);
    }, 0);
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
            My progress
          </button>
        </div>
        <div
          id="profile"
          className="min-h-[100vh] lg:min-h-[80vh] flex items-center justify-center"
        >
          <div className="bg-primary w-[300px] h-[500px] rounded-lg flex flex-col gap-2 items-center p-3">
            <div className="relative rounded-full w-[150px] flex flex-col gap-3 items-center">
              <img
                src={`${apiUrl}/${user?.avatar}`}
                className="rounded-full object-fill "
                alt="avatar"
              />
              <button
                className="bg-white/40 rounded-full text-black p-1 absolute top-0 right-4 hover:opacity-90"
                onClick={() => setOpenAvatars(true)}
              >
                <FaPen />
              </button>
              <h1 className="text-lg">Hi {user?.firstName} !</h1>
            </div>
            <div className="flex gap-3">
              <button className=" btn-primary-white ">edit info</button>
              <button className=" btn-primary-danger ">Logout</button>
            </div>

            <ProgressBar
              completed={`${countCompletedGames(user?.games)}`}
              customLabel={`${countCompletedGames(user?.games)} / ${
                approvedGames.length
              }
              `}
              maxCompleted={approvedGames?.length}
              className=" w-full mt-auto"
              barContainerClassName="bg-black/25 rounded-l-full rounded-r-full border-2 border-white/60 "
              bgColor="white"
              labelAlignment="outside"
            />
          </div>
        </div>
        {openAvatars && (
          <PopupLayout
            open={openAvatars}
            children={
              <AvatarsPopup
                userAvatar={user?.avatar as string}
                setOpen={setOpenAvatars}
              />
            }
          />
        )}
      </div>
    )
  );
};

export default Profile;
