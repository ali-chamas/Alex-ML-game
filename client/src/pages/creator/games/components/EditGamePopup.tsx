import { FileUploader } from "react-drag-drop-files";
import { gameType } from "../../../../tools/data-types/gameType";
import GamePopups from "./GamePopups";
import { useContext, useState } from "react";
import { sendRequest } from "../../../../tools/request-method/request";
import {
  GamesContext,
  GamesContextType,
} from "../../../../context/gamesContext";
import toast, { Toaster } from "react-hot-toast";

const EditGamePopup = ({ game, setOpen }: { game: gameType; setOpen: any }) => {
  const { setCreatorTrigger } = useContext(GamesContext) as GamesContextType;

  const [gameInfo, setGameInfo] = useState({});

  const infoArray = [
    { title: "Title", value: game?.name, reqTitle: "name" },
    { title: "Hint", value: game?.hint, reqTitle: "hint" },
    { title: "Description", value: game?.description, reqTitle: "description" },
    { title: "Order", value: game?.order, reqTitle: "order" },
    { title: "Level", value: game?.level, reqTitle: "level" },
  ];

  const editGame = async (file: any, reqTitle: string) => {
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

  const deleteGame = async () => {
    try {
      const res = sendRequest("DELETE", `creator/delete_game/${game._id}`);
      if ((await res).status == 200) setCreatorTrigger((t) => !t);
      setOpen(false);
    } catch (error) {
      console.log(error);
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

        <button className="btn-primary-white" onClick={saveUpdates}>
          Save
        </button>
        <div className="max-w-[280px] sm:max-w-full flex  gap-3 overflow-hidden">
          <input
            type="file"
            onChange={(file: any) => editGame(file.target.files[0], "image")}
          />
          <input
            type="file"
            onChange={(file: any) => editGame(file.target.files[0], "solution")}
          />
        </div>
        {/* <button className="btn-primary-danger" onClick={deleteGame}>
          Delete
        </button> */}
      </div>
    </>
  );
};

export default EditGamePopup;
