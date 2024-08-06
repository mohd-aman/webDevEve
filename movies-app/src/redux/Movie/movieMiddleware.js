import axios from "axios";
import movieSlice from "./movieSlice";

const actions = movieSlice.actions;

export default function movieMiddleware(pageNo) {
  return async function (dispatch) {
    try {
      dispatch(actions.setLoading());
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=2634e9f079c604567d18059d526b4346&page=${pageNo}`
      );
      dispatch(actions.setMovies(res.data.results));
    } catch (error) {
      dispatch(actions.setError());
    }
  };
}
