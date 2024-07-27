import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="flex items-center m-4">
      <img
        className="h-12 "
        src="https://cdn-icons-png.flaticon.com/512/2503/2503508.png"
      />
      <Link className="m-4 text-blue-400 text-4xl font-bold" to="/">
        {" "}
        Movies
      </Link>
      <Link className="text-blue-400 text-4xl font-bold" to="/watchlist">
        WatchList
      </Link>
    </div>
  );
}
