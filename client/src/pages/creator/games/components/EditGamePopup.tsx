import { FileUploader } from "react-drag-drop-files";
import { gameType } from "../../../../tools/data-types/gameType";
import GamePopups from "./GamePopups";
import { useState } from "react";

const EditGamePopup = ({ game }: { game: gameType }) => {
  const infoArray = [
    { title: "Title", value: game?.name, reqTitle: "name" },
    { title: "Hint", value: game?.hint, reqTitle: "hint" },
    { title: "Description", value: game?.description, reqTitle: "description" },
    { title: "Order", value: game?.order, reqTitle: "order" },
    { title: "Level", value: game?.level, reqTitle: "level" },
  ];

  const editGame = async () => {};

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
      <div className="max-w-[280px] sm:max-w-full flex flex-col gap-3 overflow-hidden">
        <FileUploader
          name="file"
          label="Image"
          handleChange={(file: any) => editGame(file)}
        />
        <FileUploader
          name="file"
          label="Solution"
          handleChange={(file: any) => editGame(file)}
        />
      </div>
    </>
  );
};

export default EditGamePopup;
