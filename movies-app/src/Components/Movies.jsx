import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import MovieContext from "../Context/MovieContext";
import PaginationContext from "../Context/PaginationContext";

export default function Movies() {

  const {watchList} = useContext(MovieContext);
  const {pageNo} =  useContext(PaginationContext);
  const [movies, setMovies] = useState(null);

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
  return (
    <>
      <h1 className="text-center	m-12 text-4xl">Trending Movies</h1>

      <div className="flex flex-wrap justify-evenly	">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              fav={watchList.some((movieObj) => movieObj.id === movie.id)}
              title={movie.title}
              poster={BASE_URL + movie.backdrop_path}
            />
          );
        })}
      </div>
      <Pagination/>
    </>
  );
}
