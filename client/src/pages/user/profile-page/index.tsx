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

import { FaTrophy } from "react-icons/fa6";
import { sendRequest } from "../../../tools/request-method/request";
import { useNavigate } from "react-router-dom";
import EditPopup from "./components/EditPopup";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../context/DarkModeContext";

const Profile = () => {
  const { user, removeUser } = useContext(UserContext) as UserContextType;
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  const navigate = useNavigate();

  const [currentGame, setCurrentGame] = useState<gameType | null>(null);
  const [openAvatars, setOpenAvatars] = useState<boolean>(false);
  const [openInfo, setOpenInfo] = useState<boolean>(false);

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
      const userGames = user?.games;
      const lastGameIndex = userGames?.length
        ? userGames.length - 1
        : undefined;
      const lastGame =
        userGames && lastGameIndex !== undefined
          ? userGames[lastGameIndex]
          : undefined;
      const unlockedGame = approvedGames[user?.games.length as number];
      if (unlockedGame) {
        if (unlockedGame.isApproved) {
          setCurrentGame(unlockedGame);
        } else {
          lastGame && setCurrentGame(lastGame);
        }
      } else {
        lastGame && setCurrentGame(lastGame);
      }
    }
  };

  const logout = async () => {
    try {
      const res = await sendRequest("GET", "/auth/logout");
      removeUser();
      navigate("/auth");
    } catch (error) {
      console.log(error);
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

  const trophyColor = () => {
    if (countCompletedGames(user?.games) == approvedGames.length) {
      return "from-yellow-600/70 to-yellow-800/90";
    } else if (countCompletedGames(user?.games) >= approvedGames.length / 2) {
      return isDarkMode
        ? "from-white/60 to-white/40"
        : "from-gray-400 to-gray-600";
    } else {
      return "from-orange-400/20 to-deep-orange-600/80";
    }
  };

  useEffect(() => {
    findCurrentGame();
  }, [approvedGames?.length, gamesStateTrigger]);

  return (
    currentGame && (
      <section className="mt-10 lg:flex justify-between items-center xl:justify-around xl:gap-10 2xl:mx-10">
        <div className="min-h-[80vh] lg:min-h-0  flex flex-col justify-between items-center">
          <div className="flex flex-col items-center gap-4 ">
            <h1 className="text-primary text-2xl xl:text-4xl">
              Current mission
            </h1>
            <Gamecard game={currentGame} user={user} checkProgress={progress} />
          </div>
          <button
            className="btn-primary-dark lg:hidden"
            onClick={scrollToProfile}
          >
            My Progress
          </button>
        </div>
        <div
          id="profile"
          className="min-h-[100vh] lg:min-h-[80vh] flex items-center justify-center"
        >
          <div className="bg-primary w-[300px] h-[500px] xl:h-[580px] md:w-[450px] xl:w-[680px] 2xl:w-[700px]  rounded-lg flex flex-col gap-2 items-center p-5 justify-between">
            <h1 className="text-primary text-2xl xl:text-5xl">Player Info</h1>
            <div className="flex flex-col items-center xl:flex-row justify-evenly w-full gap-3">
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
                <h1 className="text-lg">Hi {user?.username} !</h1>
              </div>
              <div className="flex xl:flex-col gap-3 xl:w-1/4">
                <button
                  className=" btn-primary-white "
                  onClick={() => setOpenInfo(true)}
                >
                  Edit Info
                </button>
                <button className=" btn-primary-danger " onClick={logout}>
                  Logout
                </button>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row w-full items-center justify-evenly">
              <ProgressBar
                completed={`${countCompletedGames(user?.games)}`}
                customLabel={`${countCompletedGames(user?.games)} / ${
                  approvedGames.length
                }
              `}
                maxCompleted={approvedGames?.length}
                className="w-full xl:w-1/2 "
                barContainerClassName=" bg-gray-400/40 dark:bg-black/25 rounded-l-full rounded-r-full border-2 border-white/60 "
                bgColor={isDarkMode ? "white" : "black"}
                labelAlignment="outside"
                labelColor={isDarkMode ? "white" : "black"}
              />
              <h1
                className={`p-4 rounded-full  bg-gradient-to-tr ${trophyColor()}  text-7xl xl:text-8xl`}
              >
                <FaTrophy fill="white" />
              </h1>
            </div>
          </div>
        </div>
        {openAvatars && (
          <PopupLayout
            title="Choose Your Avatar"
            open={openAvatars}
            children={
              <AvatarsPopup
                userAvatar={user?.avatar as string}
                setOpen={setOpenAvatars}
              />
            }
          />
        )}
        {openInfo && (
          <PopupLayout
            children={<EditPopup setOpen={setOpenInfo} user={user} />}
            open={openInfo}
          />
        )}
      </section>
    )
  );
};

export default Profile;
