import React, { useEffect, useState } from "react";
import SideNav from "./Template/SideNav";
import axios from "../Utils/axios";
import Dropdown from "./Template/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Template/Loader";
import BottomNav from "./Template/BottomNav";
import Card from "./Template/Card";

const Popular = () => {
  document.title = "MovieZ | Popular";
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState("movie");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const options = [
    { label: "Movies", value: "movie" },
    { label: "People", value: "person" },
    { label: "Series", value: "tv" },
  ];

  const getPopularMovies = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        // setMovies(data.results);
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopularMovies();
    } else {
      setPage(1);
      setPopular([]);
      getPopularMovies();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return (
    <>
      <SideNav />
      <BottomNav />
      {popular ? (
        <>
          <div
            id="scrollableDiv"
            className="flex flex-col w-full h-full overflow-x-auto"
          >
            <div className="p-2 mb-3 w-full ">
              <h1 className="text-4xl text-white font-bold px-5 pt-6">
                {`Popular ${category}`}
              </h1>
              <div className="flex justify-between items-center mr-5">
                <p className="text-xl text-zinc-500 font-semibold px-5 pt-2">
                  Popular all time
                </p>
                <div className="flex gap-3">
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
              dataLength={popular.length}
              next={getPopularMovies}
              loader={<Loader />}
              hasMore={hasMore}
              scrollableTarget="scrollableDiv"
            >
              <div className="px-5 flex flex-wrap gap-5">
                {popular.map((e, i) => (
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

export default Popular;
