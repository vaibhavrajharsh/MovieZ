import SideNav from "./Template/SideNav";
import TopNav from "./Template/TopNav";
import Header from "./Template/Header";
import axios from "../Utils/axios";
import Trending from "./Template/Trending";
import { useEffect, useState } from "react";
import Loader from "./Template/Loader";

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
      <div className="h-screen flex overflow-hidden w-full">
        <SideNav />
        <div className="w-[85%] flex flex-col">
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
