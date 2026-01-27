import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import axios from "../../Utils/axios";
import Card from './Card'

const Trending = () => {
  const [filter, setFilter] = useState("all");
  const [movies, setMovies] = useState([]);

  const options = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "Series", value: "tv" },
  ];

  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setMovies((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMovies =
    filter === "all" ? movies : movies.filter((m) => m.media_type === filter);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div>
        <h1
          className=" text-l
    sm:text-xl
    md:text-3xl
    xl:text-4xl text-white font-bold px-5 pt-6"
        >
          Trending Now
        </h1>
        <div className="flex justify-between items-center mr-5">
          <p className=" text-sm
    sm:text-base
    md:text-lg
    xl:text-xl text-zinc-500 font-semibold px-5 pt-2">
            Top picks people are watching this week
          </p>
          <Dropdown
            placeholder="Filter"
            options={options}
            value={filter}
            onChange={setFilter}
          />
        </div>
      </div>
      <div className="w-full px-5 py-6 flex gap-4 overflow-x-auto scrollbar-hide">
        {filteredMovies.map((e, i) => (
          <Card key={i} data={e} title={e.media_type} />
        ))}
      </div>
    </>
  );
};

export default Trending;
