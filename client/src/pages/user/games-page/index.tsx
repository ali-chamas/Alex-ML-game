import { useContext, useEffect, useState } from "react";
import GamesFilter from "./components/GamesFilter";
import { gameType } from "../../../tools/data-types/gameType";

import Gamecard from "./components/Gamecard";

import { UserContext, UserContextType } from "../../../context/userContext";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";

const Games = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const { approvedGames, gamesStateTrigger } = useContext(
    GamesContext
  ) as GamesContextType;

  const [filteredGames, setFilteredGames] = useState<[gameType] | []>();

  const [progress, setProgress] = useState<boolean>(false);

  const checkIfGameInProgress = () => {
    user?.games.map((game) => {
      if (game.isStarted && !game.isComplete) {
        setProgress(true);
      }
    });
  };

  useEffect(() => {
    setFilteredGames(approvedGames);
  }, [approvedGames?.length, gamesStateTrigger]);

  useEffect(() => {
    checkIfGameInProgress();
  }, [user]);

  const slides = [
    {
      key: 1,
      content: <img src="https://picsum.photos/800/800/?random" alt="1" />,
    },
    {
      key: 2,
      content: <img src="https://picsum.photos/800/800/?random" alt="2" />,
    },
    {
      key: 3,
      content: <img src="https://picsum.photos/600/800/?random" alt="3" />,
    },
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="flex flex-col mt-12 gap-12 min-h-[80vh] ">
      <h1 className="text-primary text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[48px] self-center">
        CHOOSE YOUR MISSION
      </h1>
      <div className="self-end">
        <GamesFilter setFiltered={setFilteredGames} games={approvedGames} />
      </div>

      {(filteredGames?.length as number) > 0 ? (
        ""
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <p className="text-lg lg:text-2xl">No games yet!</p>
        </div>
      )}
    </section>
  );
};

export default Games;
