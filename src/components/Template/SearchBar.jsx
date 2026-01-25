import { NavLink } from "react-router-dom";
import axios from "../../Utils/axios";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);
  return (
    <div className="searchbar z-50 w-full lg:w-[50%] h-min relative bg-zinc-700 rounded-xl flex items-center">
      <i className="text-3xl text-zinc-400 ri-search-2-line pl-5"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="outline-none border-none text-white placeholder-zinc-400 w-[80%] p-4 bg-zinc-700"
        type="text"
        placeholder="Movies, Shows and more"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="ri-close-circle-line text-xl text-zinc-400 absolute right-5"
        ></i>
      )}
      <div className=" absolute bg-zinc-800 w-[80%] max-h-[50vh] top-full right-15 overflow-y-scroll">
        {searches.map((s, i) => (
          <NavLink
            key={i}
            className="w-full flex items-center p-2 hover:bg-zinc-700 gap-5 text-zinc-500 border-b"
          >
            <img
              className="h-20 w-20 object-cover"
              src={`https://image.tmdb.org/t/p/original/${s.poster_path || s.backdrop_path || s.profile_path}`}
              alt=""
            />
            <div>
              <span className="text-xl font-semibold">
                {s.original_title || s.original_name}{" "}
              </span>
              <p className="text-sm">{s.release_date}</p>
              <p className="capitalize">{s.media_type}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
