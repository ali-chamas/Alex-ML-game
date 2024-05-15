import { gameType } from "../../../../tools/data-types/gameType";
import GamePopups from "./GamePopups";
import { useContext, useState } from "react";
import { sendRequest } from "../../../../tools/request-method/request";

import toast, { Toaster } from "react-hot-toast";
import { apiUrl } from "../../../../tools/api-url/apiUrl";
import { FaPen } from "react-icons/fa6";
import {
  GamesContext,
  GamesContextType,
} from "../../../../context/gamesContext";

const EditGamePopup = ({ game, setOpen }: { game: gameType; setOpen: any }) => {
  const [gameInfo, setGameInfo] = useState({});
  const { setCreatorTrigger } = useContext(GamesContext) as GamesContextType;

  const infoArray = [
    { title: "Title", value: game?.name, reqTitle: "name" },
    { title: "Hint", value: game?.hint, reqTitle: "hint" },
    { title: "Description", value: game?.description, reqTitle: "description" },
    { title: "Order", value: game?.order, reqTitle: "order" },
    { title: "Level", value: game?.level, reqTitle: "level" },
  ];

  const editGame = async (file: any, reqTitle: string) => {
    if (file) {
      const formData = new FormData();
      formData.append(reqTitle, file);
      try {
        const res = await sendRequest(
          "PUT",
          `/creator/update_game/${game._id}`,
          formData
        );
        setCreatorTrigger((t) => !t);
        toast.success("updated", {
          className: "dark:bg-blue-gray-900 dark:text-white",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveUpdates = async () => {
    try {
      const res = await sendRequest(
        "PUT",
        `/creator/update_game/${game._id}`,
        gameInfo
      );

      toast.success(`edited`, { className: "dark:bg-blue-gray-900" });

      setCreatorTrigger((t) => !t);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message, {
        className: "dark:bg-blue-gray-900 dark:text-white",
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center gap-3">
        {infoArray.map((info, i) => (
          <GamePopups
            setState={setGameInfo}
            reqTitle={info.reqTitle}
            title={info.title}
            value={info.value}
            key={i}
          />
        ))}

        <div className="max-w-[280px] flex-col md:flex-row sm:max-w-full flex  gap-3 overflow-hidden">
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={(file: any) => editGame(file.target.files[0], "image")}
          />
          <div className="relative group">
            <img
              src={`${apiUrl}/${game.image}`}
              className="w-[250px] h-[150px] "
              alt="game image"
            />
            <label
              className="bg-white/50 w-full h-full absolute top-0  hidden group-hover:flex justify-center items-center cursor-pointer"
              htmlFor="image"
            >
              <p className="text-xl text-black">
                <FaPen />
              </p>
            </label>
          </div>
          <input
            type="file"
            id="solution"
            className="hidden"
            onChange={(file: any) => editGame(file.target.files[0], "solution")}
          />

          <div className="relative group">
            <embed
              src={`${apiUrl}/${game.solution}`}
              type="application/pdf"
              width="250"
              height="150"
            />
            <label
              className="bg-white/50 w-full h-full absolute top-0  hidden group-hover:flex justify-center items-center cursor-pointer"
              htmlFor="solution"
            >
              <p className="text-xl text-black">
                <FaPen />
              </p>
            </label>
          </div>
        </div>
        <button className="btn-primary-white" onClick={saveUpdates}>
          Save
        </button>
      </div>
    </>
  );
};

export default EditGamePopup;
