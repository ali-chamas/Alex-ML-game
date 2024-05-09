import { useState } from "react";
import { gameType } from "../../../../tools/data-types/gameType";
import Gamecard from "./Gamecard";
import { userType } from "../../../../tools/data-types/userType";

const CustomCarousel = ({
  games,
  user,
  checkProgress,
}: {
  games: gameType[] | undefined;
  user: userType | null | undefined;
  checkProgress: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="flex flex-wrap overflow-y-hidden h-[320px] gap-3 items-center self-center overflow-hidden">
      <button onClick={() => setCurrentIndex((curr) => curr - 1)}>prev</button>
      <button onClick={() => setCurrentIndex((curr) => curr + 1)} className="">
        neext
      </button>
      {games?.map(
        (game, i) =>
          i < currentIndex + 2 && (
            <Gamecard
              game={game}
              key={i}
              user={user}
              checkProgress={checkProgress}
            />
          )
      )}
    </div>
  );
};

export default CustomCarousel;
