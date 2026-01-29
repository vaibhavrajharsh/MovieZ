import React, { useEffect, useState } from "react";
import SideNav from "./Template/SideNav";
import axios from "../Utils/axios";
import Loader from "./Template/Loader";
import Dropdown from "./Template/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomNav from "./Template/BottomNav";
import Card from "./Template/Card";

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
              <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl
            font-semibold lg:font-bold text-white px-5 pt-6">
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
              <div className="justify-center flex flex-wrap gap-5">
                {people.map((e, i) => (
                  <Card key={i} data={e} title={'person'}/>
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
