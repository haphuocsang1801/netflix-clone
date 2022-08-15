import _ from "lodash";
import React, { useEffect } from "react";
import { Movie } from "../typings";
import Row from "./Row";

interface Props {
  movies: Movie[];
  onScroll: () => void;
  loading: boolean;
}

const ListMovieSearch = ({ movies, onScroll, loading }: Props) => {
  const handleScroll = _.debounce((e) => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.scrollingElement!.scrollHeight
    ) {
      onScroll();
    }
  }, 500);
  useEffect(() => window.addEventListener("scroll", handleScroll), []);
  return (
    <>
      <div className="py-20 pr-4">
        <Row title="Your result" movies={movies} grid={true} />
      </div>
    </>
  );
};

export default React.memo(ListMovieSearch);
