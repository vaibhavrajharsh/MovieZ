import { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import Loader from "./Loader";

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
          <div
            key={i}
            className="group relative w-[260px] shrink-0 rounded-2xl overflow-hidden bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative h-[380px] overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  e.poster_path || e.backdrop_path || e.profile_path
                }`}
                alt={e.title || e.name}
                className="h-full w-full object-cover transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            <div className="relative p-4">
              <h1
                className="truncate text-m font-semibold text-white tracking-wide"
                title={e.name || e.title || e.original_name || e.original_title}
              >
                {e.name || e.title || e.original_name || e.original_title}
              </h1>

              {/* META (optional) */}
              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                <span className="text-yellow-400">
                  ⭐ {e.vote_average?.toFixed(1)}
                </span>
                <span>•</span>
                <span className="capitalize">
                  {e.media_type === "tv" ? "Series" : "Movie"}
                </span>
              </div>
              {/* <div className="mt-3 flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/results?search_query=${encodeURIComponent(
                        `${e.title || e.name} trailer`,
                      )}`,
                      "_blank",
                    )
                  }
                  className="flex-1 rounded-lg bg-orange-500 py-2 text-xs font-semibold text-white transition hover:bg-orange-400"
                >
                  Watch Now
                </button>

                <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10">
                  +
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Popular;
