import { DocumentData } from "firebase/firestore";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";

interface Props {
  title?: string;
  movies: Movie[] | DocumentData[];
  grid?: boolean;
}
function Row({ title, movies, grid = false }: Props) {
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        {grid ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-2 lg:grid-cols-4 lg:gap-3">
            {movies.map((movie) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
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
              <SwiperSlide key={movie.id}>
                <Thumbnail movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default Row;
