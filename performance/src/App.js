import './App.css';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import { useEffect, useState } from 'react';

function App() {

  const [ContactPage,setConctactPage] = useState(null);
  const [AboutPage,setAboutPage] = useState(null);

  const loadAbout = ()=>{
    import('./Components/AboutPage')
    .then((module)=>{
      setAboutPage(()=>module.default);
    })
  }

  const laodContact = ()=>{
    import('./Components/ContactPage')
    .then((module)=>{
      setConctactPage(()=>module.default);
    })
  }
  return (
   <BrowserRouter>
      <ul>
            <li>
                <Link to="/" >Home</Link>
            </li>
            <li>
                <Link to='/about' onClick={loadAbout}>About Us</Link>
            </li>
            <li>
                <Link to='/contact' onClick={laodContact}>Contact</Link>
            </li>
        </ul>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/contact' element={ContactPage?<ContactPage/>:<div>...Loading</div>}/>
        <Route path='/about' element={AboutPage?<AboutPage/>:<div>...Loading</div>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
