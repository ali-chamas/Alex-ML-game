import { useContext, useState } from "react";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";
import {
  Input,
  Select,
  Textarea,
  Option,
  Button,
} from "@material-tailwind/react";
import { FileUploader } from "react-drag-drop-files";

import { gameType } from "../../../../tools/data-types/gameType";
import { sendRequest } from "../../../../tools/request-method/request";
import {
  GamesContext,
  GamesContextType,
} from "../../../../context/gamesContext";

const AddGamePopup = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>> | any;
}) => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;
  const { setCreatorTrigger } = useContext(GamesContext) as GamesContextType;

  const [game, setGame] = useState<gameType | any>({
    title: "",
    hint: "",
    description: "",
    image: null,
    solution: null,
    level: "",
    type: "text",
    order: 0,
  });

  const handleImageUpload = (file: any) => {
    setGame({ ...game, image: file });
  };
  const handleSolutionUpload = (file: any) => {
    setGame({ ...game, solution: file });
  };

  const addGame = async () => {
    const formData = new FormData();
    formData.append("name", game.title);
    formData.append("description", game.description);
    formData.append("hint", game.hint);
    formData.append("level", game.level);
    formData.append("type", game.type);
    formData.append("order", game.order);
    formData.append("image", game.image);
    formData.append("solution", game.solution);
    try {
      const res = await sendRequest("POST", "/creator/add_game", formData);

      setCreatorTrigger((t) => !t);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <Input
          label="Title"
          className="w-full"
          color={isDarkMode ? "white" : "black"}
          onChange={(e) => setGame({ ...game, title: e.target.value })}
        />
        <Input
          label="Hint"
          className="w-full"
          color={isDarkMode ? "white" : "black"}
          onChange={(e) => setGame({ ...game, hint: e.target.value })}
        />
      </div>
      <Textarea
        label="Description"
        className="w-full  dark:text-white"
        onChange={(e) => setGame({ ...game, description: e.target.value })}
      />
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <Input
          label="Order"
          className="w-full"
          type="number"
          color={isDarkMode ? "white" : "black"}
          onChange={(e) => setGame({ ...game, order: e.target.value })}
        />
        <Select label="Level" onChange={(e) => setGame({ ...game, level: e })}>
          <Option value="beginner">Beginner</Option>
          <Option value="intermediate">Intermediate</Option>
          <Option value="advanced">Advanced</Option>
        </Select>
      </div>

      <div className="max-w-[280px] sm:max-w-full flex flex-col gap-3 overflow-hidden">
        <FileUploader
          name="file"
          label="Image"
          handleChange={handleImageUpload}
        />
        <FileUploader
          name="file"
          label="Solution"
          handleChange={handleSolutionUpload}
        />
      </div>

      <button onClick={addGame} className="btn-primary-white">
        Add
      </button>
    </div>
  );
};

export default AddGamePopup;
