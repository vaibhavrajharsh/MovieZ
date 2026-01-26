import SideNav from "./Template/SideNav";
import TopNav from "./Template/TopNav";
import Header from "./Template/Header";
import axios from "../Utils/axios";
import Trending from "./Template/Trending";
import { useEffect, useState } from "react";
import Loader from "./Template/Loader";
import BottomNav from "./Template/BottomNav";

const Home = () => {
  document.title = "MovieZ | Home";
  const [poster, setPoster] = useState(null);
  const getPoster = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomImage =
        data.results[(Math.random() * data.results.length).toFixed()];

      setPoster(randomImage);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getPoster();
  }, []);

  return (
    <>
      <div className=" pb-18 lg:pb-0 flex overflow-hidden justify-center w-full">
        <SideNav />
        <BottomNav />
        <div className="w-full lg:w-[85vw] p-2 lg:p-0 flex flex-col">
          <div className="shrink-0">
            <TopNav />
          </div>

          {poster ? (
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <Header data={poster} />
              <Trending />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
