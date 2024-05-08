import { Option, Select } from "@material-tailwind/react";
import { gameType } from "../../../../tools/data-types/gameType";

const GamesFilter = ({
  setFiltered,
  games,
}: {
  setFiltered: any;
  games: [gameType] | [];
}) => {
  const filterGames = (filter: string) => {
    if (filter !== "all") {
      setFiltered(games.filter((game) => game.level === filter));
    } else {
      setFiltered(games);
    }
  };

  return (
    <Select
      color="blue-gray"
      label="Select level"
      className="bg-primary"
      onChange={(e) => filterGames(e)}
    >
      <Option value="all">All</Option>
      <Option value="beginner">Beginner</Option>
      <Option value="intermediate">Intermediate</Option>
      <Option value="advanced">Advanced</Option>
    </Select>
  );
};

export default GamesFilter;
