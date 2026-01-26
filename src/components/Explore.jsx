import axios from "../Utils/axios";
import React, { useEffect, useState } from "react";
import SideNav from "./Template/SideNav";
import Trending from "./Template/Trending";
import Popular from "./Template/Popular";
import BottomNav from "./Template/BottomNav";

const Explore = () => {
  document.title = "Moviez | Explore";

  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSearches = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setSearches([]);
      return;
    }

    const timer = setTimeout(getSearches, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="pb-18 lg:pb-0 flex overflow-hidden justify-start w-full">
      <SideNav />
      <BottomNav />

      <div className="flex-1 flex flex-col overflow-x-auto">
        {/* SEARCH BAR */}
        <div className="w-full p-5 pb-0">
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
          </div>
        </div>

        {/* CONTENT */}
        {query ? (
          <div className="mt-8 px-5 flex flex-wrap justify-center gap-5">
            {searches.map((e, i) => (
              <div
                key={i}
                className="group relative w-[300px] h-min shrink-0 rounded-2xl overflow-hidden bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-[380px] overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${
                      e.poster_path || e.backdrop_path || e.profile_path
                    }`}
                    alt={e.title || e.name}
                    className="h-full w-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                <div className="relative p-4">
                  <h1
                    className="truncate text-m font-semibold text-white tracking-wide"
                    title={
                      e.name || e.title || e.original_name || e.original_title
                    }
                  >
                    {e.name || e.title || e.original_name || e.original_title}
                  </h1>

                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                    <span className="text-yellow-400">
                      ⭐ {e.vote_average?.toFixed(1)}
                    </span>
                    <span>•</span>
                    <span>{e.media_type || "Movie"}</span>
                  </div>
                </div>
              </div>
            ))}

            {!loading && searches.length === 0 && (
              <p className="text-zinc-400 col-span-full text-center">
                No results found
              </p>
            )}
          </div>
        ) : (
          <>
            <Trending />
            <Popular />
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
