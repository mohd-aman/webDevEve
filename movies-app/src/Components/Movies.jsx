import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

export default function Movies() {
  const [movies, setMovies] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || []
  );

  const addToWatchList = (movieId) => {
    const newWatchList = [...watchList, movieId];
    setWatchList(newWatchList);
  };

  const removeFromWatchList = (movieId) => {
    const filteredWatchList = watchList.filter((id) => id !== movieId);
    setWatchList(filteredWatchList);
  };

  const handleNext = (e) => {
    console.log(e);
    setPageNo(pageNo + 1);
  };
  const handlePrev = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=2634e9f079c604567d18059d526b4346&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [pageNo]); //it means execute callback on mounting as well as on pageNo updates

  if (!movies) {
    return <h1>...Loading</h1>;
  }
  console.log(watchList);
  return (
    <>
      <h1 className="text-center	m-12 text-4xl">Trending Movies</h1>

      <div className="flex flex-wrap justify-evenly	">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              fav={watchList.includes(movie.id)}
              addToWatchList={addToWatchList}
              removeFromWatchList={removeFromWatchList}
              title={movie.title}
              poster={BASE_URL + movie.backdrop_path}
            />
          );
        })}
      </div>
      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </>
  );
}
