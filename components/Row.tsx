import { useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  title: string;
  movies: Movie[];
}
function Row({ title, movies }: Props) {
  const swiper = useSwiper();
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <Swiper
          modules={[Navigation]}
          navigation
          breakpoints={{
            576: {
              // width: 576,
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              // width: 768,
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide>
              <Thumbnail key={movie.id} movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Row;
