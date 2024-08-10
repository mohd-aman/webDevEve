import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { lazy, Suspense } from "react";

const HomePage = lazy(()=>import('./Components/HomePage'));
const AboutPage = lazy(()=>import('./Components/AboutPage'));
const ContactPage = lazy(()=>import('./Components/ContactPage'))

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
