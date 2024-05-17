import { useContext, useState } from "react";
import { apiUrl } from "../../../../tools/api-url/apiUrl";
import { gameType } from "../../../../tools/data-types/gameType";
import PopupLayout from "../../../../common/components/PopupLayout";
import EditGamePopup from "./EditGamePopup";
import { sendRequest } from "../../../../tools/request-method/request";
import {
  GamesContext,
  GamesContextType,
} from "../../../../context/gamesContext";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";

const CreatorGameCard = ({ game }: { game: gameType }) => {
  const [openEdit, setOpenEdit] = useState<any | gameType>(false);
  const { setCreatorTrigger } = useContext(GamesContext) as GamesContextType;
  const deleteGame = async () => {
    try {
      const res = sendRequest("DELETE", `creator/delete_game/${game._id}`);
      if ((await res).status == 200) setCreatorTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 rounded-md bg-primary  bg-opacity-75 h-[320px] w-[300px] border-2 border-black/10 ">
        <div className="relative">
          <img
            src={`${apiUrl}/${game.image}`}
            alt=""
            className="rounded-t-md h-[150px] w-[300px]"
          />
          {game.isApproved ? (
            <p className="absolute top-0 m-3 right-0 bg-green-500 rounded-full text-white p-3 ">
              <TiTick />
            </p>
          ) : game.isApproved == null ? (
            <p className="absolute top-0 m-3 right-0 bg-blue-gray-300 rounded-full text-white p-3 ">
              <MdOutlineWatchLater />
            </p>
          ) : (
            <p className="absolute top-0 m-3 right-0 bg-red-500 rounded-full text-white p-3 ">
              <IoClose />
            </p>
          )}
        </div>
        <div className="px-5  flex flex-col gap-3 items-center">
          <h1 className="font-bold">{game.name}</h1>
          <small className="text-black/70 dark:text-white/70 h-[45px]">
            {game.description}
          </small>
          <div className="flex gap-5">
            <button
              className="btn-primary-white"
              onClick={() => setOpenEdit(game)}
            >
              Edit
            </button>
            <button className="btn-primary-danger" onClick={deleteGame}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {openEdit && (
        <div className="z-20">
          <PopupLayout
            children={<EditGamePopup game={game} setOpen={setOpenEdit} />}
            open={openEdit}
            setOpen={setOpenEdit}
            title="Edit Game"
          />
        </div>
      )}
    </>
  );
};

export default CreatorGameCard;
