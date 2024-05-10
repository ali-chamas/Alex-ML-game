import { gameType } from "../../../../tools/data-types/gameType";
import GamePopups from "./GamePopups";

const EditGamePopup = ({ game }: { game: gameType }) => {
  const infoArray = [
    { title: "Title", value: game?.name, reqTitle: "name" },
    { title: "Hint", value: game?.hint, reqTitle: "hint" },
    { title: "Description", value: game?.description, reqTitle: "description" },
    { title: "Order", value: game?.order, reqTitle: "order" },
    { title: "Level", value: game?.level, reqTitle: "level" },
  ];

  return (
    <>
      {infoArray.map((info, i) => (
        <GamePopups
          gameId={game._id}
          reqTitle={info.reqTitle}
          title={info.title}
          value={info.value}
          key={i}
        />
      ))}
    </>
  );
};

export default EditGamePopup;
