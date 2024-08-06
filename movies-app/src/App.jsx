import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import WatchList from "./Components/WatchList";

import MovieContext from "./Context/MovieContext";

function App() {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || []
  );

  const addToWatchList = (movieToAdd) => {
    const newWatchList = [...watchList, movieToAdd];
    setWatchList(newWatchList);
  };

  const removeFromWatchList = (movieToRemove) => {
    const filteredWatchList = watchList.filter(
      (movieObj) => movieObj.id !== movieToRemove.id
    );
    setWatchList(filteredWatchList);
  };

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  return (
    <BrowserRouter>
      <Navbar />
      <MovieContext.Provider
        value={{ watchList, addToWatchList, removeFromWatchList, setWatchList }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                {/* <PaginationContext.Provider
                  value={{ pageNo, handleNext, handlePrev }}
                > */}
                  <Movies
                  // watchList={watchList}
                  // addToWatchList={addToWatchList}
                  // removeFromWatchList={removeFromWatchList}
                  // pageNo={pageNo}
                  // handleNext={handleNext}
                  // handlePrev={handlePrev}
                  />
                {/* </PaginationContext.Provider> */}
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
              // movies = {watchList}
              // removeFromWatchList={removeFromWatchList}
              // setWatchList = {setWatchList}
              />
            }
          />
        </Routes>
      </MovieContext.Provider>
    </BrowserRouter>
  );
}

export default App;
