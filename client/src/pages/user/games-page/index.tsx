import GamesFilter from "./components/GamesFilter";

const Games = () => {
  return (
    <div className="flex flex-col mt-12 gap-12 min-h-[80vh]">
      <h1 className="text-primary text-[48px] self-center">
        CHOOSE YOUR MISSION
      </h1>
      <div className="self-end">
        <GamesFilter />
      </div>
    </div>
  );
};

export default Games;
