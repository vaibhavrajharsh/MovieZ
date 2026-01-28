import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Popular from "./Components/Popular.jsx";
import Movies from "./Components/Movies.jsx";
import TvShows from "./Components/TvShows.jsx";
import People from "./Components/People.jsx";
import Trendings from "./Components/Trendings.jsx";
import Contact from "./Components/Contact.jsx";
import Explore from "./Components/Explore.jsx";
import About from "./Components/About.jsx";
import MovieDetails from "./Components/MovieDetails.jsx";
import PersonDetails from "./Components/PersonDetails.jsx";
import TvDetails from "./Components/TvDetails.jsx";

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
