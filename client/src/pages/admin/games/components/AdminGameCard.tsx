import { apiUrl } from "../../../../tools/api-url/apiUrl";
import { gameType } from "../../../../tools/data-types/gameType";

const AdminGameCard = ({
  game,
  setTrigger,
}: {
  game: gameType;
  setTrigger: any;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md bg-primary  bg-opacity-75 h-[320px] w-[300px] border-2 border-black/10 ">
      <div className="relative">
        <img
          src={`${apiUrl}/${game.image}`}
          alt=""
          className="rounded-t-md h-[150px] w-[300px]"
        />
        {!game.isApproved ? (
          <button className="absolute top-0 m-3 right-0 bg-green-500 rounded-full text-white p-3 ">
            Yes
          </button>
        ) : (
          <button className="absolute top-0 m-3 right-0 bg-red-500 rounded-full text-white px-4 p-3 ">
            No
          </button>
        )}
      </div>
      <div className="px-5  flex flex-col gap-3 items-center">
        <h1 className="font-bold">{game.name}</h1>
        <small className="text-black/70 dark:text-white/70 ">
          {game.description}
        </small>
        <button className="btn-primary-danger">Delete</button>
      </div>
    </div>
  );
};

export default AdminGameCard;
