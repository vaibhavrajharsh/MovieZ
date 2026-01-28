import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data, title }) => {
  return (
    <Link to={`/${data.media_type || title}/details/${data.id}`} className="group relative w-[260px] shrink-0 rounded-2xl overflow-hidden bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-[380px] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${
            data.poster_path || data.backdrop_path || data.profile_path
          }`}
          alt={data.title || data.name}
          className="h-full w-full object-cover transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      </div>
      <div className="relative p-4">
        <h1
          className="truncate text-m font-semibold text-white tracking-wide"
          title={
            data.name || data.title || data.original_name || data.original_title
          }
        >
          {data.name || data.title || data.original_name || data.original_title}
        </h1>

        {/* META (optional) */}
        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
          <span className="text-yellow-400">
            ⭐ {data.vote_average?.toFixed(1)}
          </span>
          <span>•</span>
          <span className="capitalize">
            {data.media_type || title}
          </span>
        </div>

        <div className="mt-3 flex gap-2 lg:opacity-0 lg:translate-y-2 lg:transition-all lg:duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={() =>
              window.open(
                `https://www.youtube.com/results?search_query=${encodeURIComponent(
                  `${data.title || data.name} trailer`,
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
        </div>
      </div>
    </Link>
  );
};

export default Card;
