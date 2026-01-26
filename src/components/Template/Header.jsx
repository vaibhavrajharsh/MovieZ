import React from "react";

const Header = ({ data }) => {
  return (
    <div className="w-full h-[450px]">
      <div
        className="relative w-[97%] h-full rounded-2xl bg-cover overflow-hidden mx-auto bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

        <div className="absolute bottom-10 left-10 z-10">
          <h1 className="text-4xl font-bold text-white">
            {data?.name ||
              data?.title ||
              data?.original_name ||
              data?.original_title}
          </h1>
          <p className="text-lg text-gray-300">
            {data?.release_date?.slice(0, 4) ||
              data?.first_air_date?.slice(0, 4)}
          </p>
          <p className="text-white text-s">{data?.overview}</p>
          <button
            onClick={() =>
              window.open(
                `https://www.youtube.com/results?search_query=${encodeURIComponent(
                  data.Title ||
                    data?.name ||
                    data?.original_name ||
                    data?.original_title + " trailer",
                )}`,
                "_blank",
              )
            }
            className="flex-1 rounded-lg bg-orange-500 py-2 text-s font-semibold text-white transition hover:bg-orange-400 px-6 mt-3"
          >
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
