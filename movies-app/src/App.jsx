import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css'
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Movies from './Components/Movies'
import Pagination from './Components/Pagination'
import WatchList from './Components/WatchList'

function App() {
  

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
            <Banner/>
            <Movies/>
            <Pagination/>
          </>
        }/>
        <Route path="/watchlist" element={
          <WatchList/>
        }/>
      </Routes>
    </BrowserRouter>
  )
}



export default App
