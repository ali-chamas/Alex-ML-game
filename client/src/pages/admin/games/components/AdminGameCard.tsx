import { IoClose } from "react-icons/io5";
import { apiUrl } from "../../../../tools/api-url/apiUrl";
import { gameType } from "../../../../tools/data-types/gameType";
import { sendRequest } from "../../../../tools/request-method/request";
import { TiTick } from "react-icons/ti";

const AdminGameCard = ({
  game,
  setTrigger,
  alert,
}: {
  game: gameType;
  setTrigger: any;
  alert: (name: string, deleteGame: () => void) => void;
}) => {
  const approveGame = async () => {
    try {
      const res = await sendRequest("PUT", `/admin/approve_game/${game._id}`);

      setTrigger((t: boolean) => !t);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectGame = async () => {
    try {
      const res = await sendRequest("PUT", `/admin/reject_game/${game._id}`);

      setTrigger((t: boolean) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGame = async () => {
    try {
      const res = sendRequest("DELETE", `creator/delete_game/${game._id}`);
      setTrigger((t: boolean) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-md bg-primary  bg-opacity-75 h-[320px] w-[300px] border-2 border-black/10 ">
      <div className="relative">
        <img
          src={`${apiUrl}/${game.image}`}
          alt=""
          className="rounded-t-md h-[150px] w-[300px]"
        />
        {!game.isApproved ? (
          <button
            className="absolute top-0 m-3 right-0 bg-green-500 rounded-full text-white p-3 "
            onClick={approveGame}
          >
            <TiTick />
          </button>
        ) : (
          <button
            className="absolute top-0 m-3 right-0 bg-red-500 rounded-full text-white  p-3 "
            onClick={rejectGame}
          >
            <IoClose />
          </button>
        )}
      </div>
      <div className="px-5  flex flex-col gap-3 items-center">
        <h1 className="font-bold">{game.name}</h1>
        <small className="text-black/70 dark:text-white/70 h-[45px]">
          {game.description}
        </small>
        <button
          className="btn-primary-danger"
          onClick={() => alert(game.name, deleteGame)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminGameCard;
