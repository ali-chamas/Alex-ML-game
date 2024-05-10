import { useState } from "react";
import { apiUrl } from "../../../../tools/api-url/apiUrl";
import { gameType } from "../../../../tools/data-types/gameType";
import PopupLayout from "../../../../common/components/PopupLayout";
import EditGamePopup from "./EditGamePopup";

const CreatorGameCard = ({ game }: { game: gameType }) => {
  const [openEdit, setOpenEdit] = useState<any | gameType>(false);

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
            <p className="absolute top-0 m-3 right-0 bg-green-500/60 rounded-full text-white p-3 ">
              Yes
            </p>
          ) : (
            <p className="absolute top-0 m-3 right-0 bg-red-500/60 rounded-full text-white px-4 p-3 ">
              No
            </p>
          )}
        </div>
        <div className="px-5  flex flex-col gap-3 items-center">
          <h1 className="font-bold">{game.name}</h1>
          <small className="text-black/70 dark:text-white/70 ">
            {game.description}
          </small>
          <button
            className="btn-primary-white"
            onClick={() => setOpenEdit(game)}
          >
            Edit
          </button>
        </div>
      </div>
      {openEdit && (
        <div className="z-20">
          <PopupLayout
            children={<EditGamePopup game={game} />}
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
