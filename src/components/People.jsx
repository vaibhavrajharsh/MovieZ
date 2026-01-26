import React, { useEffect, useState } from "react";
import SideNav from "./Template/SideNav";
import axios from "../Utils/axios";
import Loader from "./Template/Loader";
import Dropdown from "./Template/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomNav from "./Template/BottomNav";

const People = () => {
  document.title = "MovieZ | People";
  const [people, setPeople] = useState([]);
  const [duration, setDuration] = useState("day");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const option = [
    { label: "Today", value: "day" },
    { label: "This Week", value: "week" },
  ];

  const getPeople = async () => {
    try {
      const { data } = await axios.get(
        `/trending/person/${duration}?page=${page}`,
      );
      if (data.results.length > 0) {
        // setMovies(data.results);
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      getPeople();
    } else {
      setPage(1);
      setPeople([]);
      getPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [duration]);

  return (
    <>
      <SideNav />
      <BottomNav />
      {people ? (
        <>
          <div
            id="scrollableDiv"
            className="flex flex-col w-full h-full overflow-x-auto"
          >
            <div className="p-2 mb-3 w-full ">
              <h1 className="text-4xl text-white font-bold px-5 pt-6">
                Trending People
              </h1>
              <div className="flex justify-between items-center mr-5">
                <p className="text-xl text-zinc-500 font-semibold px-5 pt-2">
                  Trending People right now
                </p>
                <div className="flex gap-3">
                  <Dropdown
                    options={option}
                    value={duration}
                    onChange={setDuration}
                    placeholder="Duration"
                  />
                </div>
              </div>
            </div>
            <InfiniteScroll
              dataLength={people.length}
              next={getPeople}
              loader={<Loader />}
              hasMore={hasMore}
              scrollableTarget="scrollableDiv"
            >
              <div className="px-5 flex flex-wrap gap-5">
                {people.map((e, i) => (
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
                        className="h-full w-full object-cover transition-transform duration-500 "
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                    </div>

                    <div className="relative p-4">
                      <h1
                        className="truncate text-m font-semibold text-white tracking-wide"
                        title={
                          e.name ||
                          e.title ||
                          e.original_name ||
                          e.original_title
                        }
                      >
                        {e.name ||
                          e.title ||
                          e.original_name ||
                          e.original_title}
                      </h1>

                      {/* META (optional) */}
                      <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                        <span className="text-yellow-400">
                          ⭐ {e.vote_average?.toFixed(1)}
                        </span>
                        <span>•</span>
                        <span>{e.media_type || "Movie"}</span>
                      </div>

                      <div className="mt-3 flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <button
                          // onClick={() =>
                          //   window.open(
                          //     `https://www.youtube.com/results?search_query=${encodeURIComponent(
                          //       `${e.title || e.name} trailer`,
                          //     )}`,
                          //     "_blank",
                          //   )
                          // }
                          className="flex-1 rounded-lg bg-orange-500 py-2 text-xs font-semibold text-white transition"
                        >
                          Know More
                        </button>

                        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
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

export default People;
