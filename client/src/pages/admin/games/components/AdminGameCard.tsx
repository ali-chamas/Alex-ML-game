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

        <button
          className="absolute top-0 m-3 right-0 bg-red-500 rounded-full text-white  p-3"
          onClick={() => alert(game.name, deleteGame)}
        >
          <IoClose />
        </button>
      </div>
      <div className="px-5  flex flex-col gap-3 items-center">
        <h1 className="font-bold">{game.name}</h1>
        <small className="text-black/70 dark:text-white/70 h-[45px]">
          {game.description}
        </small>
        {game.isApproved == null ? (
          <>
            <button
              className="absolute bottom-0 m-3 right-0 text-green-500 rounded-lg  p-3 "
              onClick={approveGame}
            >
              Accept
            </button>
            <button
              className="absolute bottom-0 m-3 left-0 text-red-500 rounded-lg p-3 "
              onClick={rejectGame}
            >
              Reject
            </button>
          </>
        ) : !game.isApproved ? (
          <button
            className="absolute bottom-0 m-3 right-0 text-green-500 rounded-lg  p-3 "
            onClick={approveGame}
          >
            Accept
          </button>
        ) : (
          <button
            className="absolute bottom-0 m-3 right-0 text-red-500 rounded-lg   p-3 "
            onClick={rejectGame}
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminGameCard;
