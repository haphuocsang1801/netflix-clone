import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ListMovieSearch from "../components/ListMovieSearch";
import { Loading, Spinner } from "../components/Loading";
import Modal from "../components/Modal";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import useDebounce from "../hooks/useDebounce";
import useList from "../hooks/useList";
import { Movie } from "../typings";
import requests from "../utils/requests";
interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const showModal = useRecoilValue(modalState);
  const { loading, user } = useAuth();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [movieSearch, setMovieSearch] = useState<Movie[]>([]);
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 500);
  const pageNumber = useRef(1);
  const list = useList(user?.uid);
  const onSearch = async (query: string) => {
    setMovieSearch([]);
    pageNumber.current = 1;
    setFilter(query);
  };
  const fetchMovie = async () => {
    if (!filterDebounce) setMovieSearch([]);
    else {
      try {
        setLoadingSearch(true);
        const res = await fetch(
          requests.fetchMoviesSearch(filterDebounce, pageNumber.current)
        );
        const { results } = await res.json();
        const currnetMovie = [...movieSearch, ...results];
        setMovieSearch(currnetMovie);
      } catch (error) {
        const _error = error as Error;
        console.log(_error.message);
      } finally {
        pageNumber.current = pageNumber.current + 1;
        setLoadingSearch(false);
      }
    }
  };
  useEffect(() => {
    fetchMovie();
  }, [filterDebounce]);
  if (loading) return <Loading></Loading>;
  return (
    <div className="relative h-screen bg-gradient-to-b  lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="https://rb.gy/ulxxee" />
      </Head>
      <Header onSearch={onSearch} />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 mr-4 md:mr-0">
        {movieSearch.length > 0 ? (
          <ListMovieSearch
            loading={loadingSearch}
            onScroll={fetchMovie}
            movies={movieSearch}
          />
        ) : (
          <>
            <Banner netflixOriginals={netflixOriginals} />
            {
              <section className="md:space-y-24">
                {list.length > 0 && <Row title="My List" movies={list} />}
                <Row key={1} title="Trending Now" movies={trendingNow} />
                <Row key={2} title="Top Rated" movies={topRated} />
                <Row key={3} title="Action Thrillers" movies={actionMovies} />
                <Row key={4} title="Comedies" movies={comedyMovies} />
                <Row key={5} title="Scary Movies" movies={horrorMovies} />
                <Row key={6} title="Romance Movies" movies={romanceMovies} />
                <Row key={7} title="Documentaries" movies={documentaries} />
              </section>
            }
          </>
        )}
        {loading && (
          <div className="py-20 flex items-center justify-center mx-auto">
            <Spinner />
          </div>
        )}
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
