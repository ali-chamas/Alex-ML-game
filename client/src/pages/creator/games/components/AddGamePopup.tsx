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

const AddGamePopup = () => {
  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  const [game, setGame] = useState<gameType | any>({
    name: "",
    hint: "",
    description: "",
    image: null,
    solution: null,
    level: "",
    order: 0,
  });

  const handleImageUpload = (file: any) => {
    setGame({ ...game, image: file });
  };
  const handleSolutionUpload = (file: any) => {
    setGame({ ...game, solution: file });
  };

  const addGame = async () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <Input
          label="Title"
          className="w-full"
          color={isDarkMode ? "white" : "black"}
          onChange={(e) => setGame({ ...game, name: e.target.value })}
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
        className="w-full border-white dark:text-white"
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

      <Button>add</Button>
    </div>
  );
};

export default AddGamePopup;
