import { FileUploader } from "react-drag-drop-files";
import { gameType } from "../../../../tools/data-types/gameType";
import GamePopups from "./GamePopups";
import { useContext } from "react";
import { sendRequest } from "../../../../tools/request-method/request";
import {
  GamesContext,
  GamesContextType,
} from "../../../../context/gamesContext";
import toast, { Toaster } from "react-hot-toast";

const EditGamePopup = ({ game, setOpen }: { game: gameType; setOpen: any }) => {
  const { setCreatorTrigger } = useContext(GamesContext) as GamesContextType;

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
      {infoArray.map((info, i) => (
        <GamePopups
          gameId={game._id}
          reqTitle={info.reqTitle}
          title={info.title}
          value={info.value}
          key={i}
        />
      ))}
      <div className="max-w-[280px] sm:max-w-full flex flex-col gap-3 overflow-hidden">
        <FileUploader
          name="file"
          label="Image"
          handleChange={(file: any) => editGame(file, "image")}
        />
        <FileUploader
          name="file"
          label="Solution"
          handleChange={(file: any) => editGame(file, "solution")}
        />
      </div>
      <button className="btn-primary-danger" onClick={deleteGame}>
        Delete
      </button>
    </>
  );
};

export default EditGamePopup;
