import React, { useEffect, useState } from "react";
import SideNav from "./Template/SideNav";
import axios from "../Utils/axios";
import Loader from "./Template/Loader";
import Dropdown from "./Template/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomNav from "./Template/BottomNav";
import Card from "./Template/Card";


const Trendings = () => {
  document.title = "Moviez | Trendings";
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const option = [
    { label: "Today", value: "day" },
    { label: "This Week", value: "week" },
  ];

  const options = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "People", value: "person" },
    { label: "Series", value: "tv" },
  ];

  const getMovies = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`,
      );
      if (data.results.length > 0) {
        // setMovies(data.results);
        setMovies((prevState) => [...prevState, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (movies.length === 0) {
      getMovies();
    } else {
      setPage(1);
      setMovies([]);
      getMovies();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);
  return (
    <>
      <SideNav />
      <BottomNav/>
      {movies ? (
        <>
          <div
            id="scrollableDiv"
            className="flex flex-col w-full h-full overflow-x-auto"
          >
            <div className="p-2 mb-3 w-full ">
              <h1 className="text-4xl text-white font-bold px-5 pt-6">
                Trending Now
              </h1>
              <div className="flex justify-between items-center mr-5">
                <p className="text-xl text-zinc-500 font-semibold px-5 pt-2">
                  Top picks people are watching
                </p>
                <div className="flex gap-3">
                  <Dropdown
                    options={option}
                    value={duration}
                    onChange={setDuration}
                    placeholder="Duration"
                  />
                  <Dropdown
                    options={options}
                    value={category}
                    onChange={setCategory}
                    placeholder="Category"
                  />
                </div>
              </div>
            </div>
            <InfiniteScroll
              dataLength={movies.length}
              next={getMovies}
              loader={<Loader />}
              hasMore={hasMore}
              scrollableTarget="scrollableDiv"
            >
              <div className="px-5 flex flex-wrap gap-5">
                {movies.map((e, i) => (
                  <Card key={i} data={e} title={e.media_type} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Trendings;
