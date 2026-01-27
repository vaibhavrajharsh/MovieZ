import { useEffect, useState } from "react";
import SideNav from "./Template/SideNav";
import axios from "../Utils/axios";
import Loader from "./Template/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./Template/Dropdown";
import BottomNav from "./Template/BottomNav";
import Card from "./Template/Card";

const TvShows = () => {
  const [tvseries, setTvseries] = useState([]);
  const [category, setCategory] = useState("popular");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const options = [
    { label: "Airing Today", value: "airing_today" },
    { label: "On The Air", value: "on_the_air" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
  ];

  const getTvseries = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        // setMovies(data.results);
        setTvseries((prevState) => [...prevState, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (tvseries.length === 0) {
      getTvseries();
    } else {
      setPage(1);
      setTvseries([]);
      getTvseries();
    }
  };

  useEffect(() => {
    document.title = "MovieZ | TV Shows";
    refreshHandler();
  }, [category]);

  return (
    <>
      <SideNav />
      <BottomNav />
      {tvseries ? (
        <>
          <div
            id="scrollableDiv"
            className="flex flex-col w-full h-full overflow-x-auto"
          >
            <div className="p-2 mb-3 w-full ">
              <h1 className="text-4xl text-white font-bold px-5 pt-6">
                TV Series
              </h1>
              <div className="flex justify-between items-center mr-5">
                <p className="text-xl text-zinc-500 font-semibold px-5 pt-2">
                  All you favourate series and shows are here
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
              dataLength={tvseries.length}
              next={getTvseries}
              loader={<Loader />}
              hasMore={hasMore}
              scrollableTarget="scrollableDiv"
            >
              <div className="px-5 flex flex-wrap gap-5">
                {tvseries.map((e, i) => (
                  <Card key={i} data={e} title={"tv"} />
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

export default TvShows;
