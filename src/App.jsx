import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Popular from "./components/Popular.jsx";
import Movies from "./components/Movies.jsx";
import TvShows from "./components/TvShows.jsx";
import People from "./components/People.jsx";
import Trendings from "./components/Trendings.jsx";
import Contact from "./components/Contact.jsx";
import Explore from "./components/Explore.jsx";
import About from "./components/About.jsx";

const App = () => {
  return (
    <div className="h-screen w-screen bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/trendings" element={<Trendings />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/people" element={<People />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
