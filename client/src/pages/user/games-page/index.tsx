import { useContext, useEffect, useState } from "react";
import GamesFilter from "./components/GamesFilter";
import { gameType } from "../../../tools/data-types/gameType";

import Gamecard from "./components/Gamecard";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { GamesContext, GamesContextType } from "../../../context/gamesContext";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Games = () => {
  const { approvedGames, gamesStateTrigger } = useContext(
    GamesContext
  ) as GamesContextType;

  const [filteredGames, setFilteredGames] = useState<[gameType] | []>();

  useEffect(() => {
    setFilteredGames(approvedGames);
  }, [approvedGames?.length, gamesStateTrigger]);

  console.log(approvedGames);

  return (
    <section className="flex flex-col mt-12 gap-12 min-h-[80vh] ">
      <h1 className="text-primary text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[48px] self-center">
        CHOOSE YOUR MISSION
      </h1>
      <div className="self-end">
        <GamesFilter setFiltered={setFilteredGames} games={approvedGames} />
      </div>

      {(filteredGames?.length as number) > 0 ? (
        <Swiper
          style={{
            "--swiper-pagination-color": "cyan",
            "--swiper-navigation-color": "cyan",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "13px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ clickable: true }}
          navigation
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="relative w-full h-[370px]"
        >
          {filteredGames?.map((game, i) => (
            <SwiperSlide key={i} className="w-[300px] relative h-[320px]">
              <Gamecard game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <p className="text-lg lg:text-2xl">No games yet!</p>
        </div>
      )}
    </section>
  );
};

export default Games;
