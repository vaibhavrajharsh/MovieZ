import React from "react";

const Header = ({ data }) => {
  return (
    <div className="w-full h-[28vh] sm:h-[35vh] md:h-[45vh] lg:h-[450px]">
      <div
        className="
          relative
          w-[95%] sm:w-[96%] lg:w-[97%]
          h-full
          rounded-xl sm:rounded-2xl
          bg-cover bg-center
          overflow-hidden
          mx-auto
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Content */}
        <div
          className="
            absolute
            bottom-4 sm:bottom-6 lg:bottom-10
            left-4 sm:left-6 lg:left-10
            z-10
            max-w-[90%] sm:max-w-[75%] lg:max-w-[45%]
          "
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {data?.name ||
              data?.title ||
              data?.original_name ||
              data?.original_title}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-1">
            {data?.release_date?.slice(0, 4) ||
              data?.first_air_date?.slice(0, 4)}
          </p>

          <p className="line-clamp-1 text-xs md:text-sm lg:text-base text-gray-200 mt-2 lg:line-clamp-3">
            {data?.overview}
          </p>

          <button
            onClick={() =>
              window.open(
                `https://www.youtube.com/results?search_query=${encodeURIComponent(
                  `${data?.title || data?.name || data?.original_title} trailer`,
                )}`,
                "_blank",
              )
            }
            className="
              mt-3
              inline-flex items-center
              rounded-lg
              bg-orange-500
              px-4 sm:px-6
              py-2
              text-xs sm:text-sm font-semibold text-white
              transition
              hover:bg-orange-400
            "
          >
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
