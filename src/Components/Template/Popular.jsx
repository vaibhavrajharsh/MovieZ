import { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import Loader from "./Loader";
import Card from "./Card";

const Popular = () => {
  const [movies, setMovies] = useState(null);


  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/tv/popular`);
      setMovies(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };


  useEffect(() => {
    getMovies();
  }, []);

  return movies ? (
    <>
      <div>
        <h1 className="text-4xl text-white font-bold px-5 pt-6">
          Popular Tv Series
        </h1>
        <div className="flex justify-between items-center mr-5">
          
        </div>
      </div>
      <div className="w-full px-5 py-6 flex gap-4 overflow-x-auto scrollbar-hide">
        {movies.map((e, i) => (
          <Card key={i} data={e} title={e.media_type} />
        ))}
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Popular;
