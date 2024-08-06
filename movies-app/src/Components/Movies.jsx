import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import MovieContext from "../Context/MovieContext";
import { useDispatch, useSelector } from "react-redux";
import movieMiddleware from "../redux/Movie/movieMiddleware";

export default function Movies() {
  const { watchList } = useContext(MovieContext);
  const { pageNo } = useSelector((store) => store.paginationState);
  const { movies, loading, error } = useSelector((store) => store.moviesState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieMiddleware(pageNo));
  }, [pageNo]); //it means execute callback on mounting as well as on pageNo updates

  if (loading) {
    return <h1>...Loading</h1>;
  }
  if (error) {
    return <h1>OPS... Error Occured</h1>;
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
      <Pagination />
    </>
  );
}
