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
import MovieDetails from "./components/MovieDetails.jsx";
import PersonDetails from "./components/PersonDetails.jsx";
import TvDetails from "./components/TvDetails.jsx";

const App = () => {
  return (
    <div className="h-screen w-screen bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/trendings" element={<Trendings />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} />
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
