import axios from "../Utils/axios";
import React, { useEffect, useState } from "react";
import SideNav from "./Template/SideNav";
import Trending from "./Template/Trending";
import Popular from "./Template/Popular";
import BottomNav from "./Template/BottomNav";
import { Link } from "react-router-dom";
import Card from "./Template/Card";

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
    <div className="pb-15 lg:pb-0 flex justify-start w-full ">
      <SideNav />
      <BottomNav />

      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
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
              <Card key={i} data={e} />
            ))}

            {!loading && searches.length === 0 && (
              <p className="text-zinc-400 col-span-full text-center">
                No results found
              </p>
            )}
          </div>
        ) : (
          <>
            <div>
              <Trending />
              <Popular />
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
