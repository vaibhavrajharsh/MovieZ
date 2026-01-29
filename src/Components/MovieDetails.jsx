import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { asyncloadmovie, removemovie } from "./store/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "./Template/SideNav";
import Loader from "./Template/Loader";
import BottomNav from "./Template/BottomNav";

const MovieCard = ({ item }) => (
  <Link
    to={`/movie/details/${item.id}`}
    className="w-35 md:w-45 shrink-0"
  >
    <img
      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
      alt={item.title || item.name}
      className="rounded-lg hover:scale-105 transition cursor-pointer"
    />
    <p className="text-sm mt-2 text-center truncate">
      {item.title || item.name}
    </p>
  </Link>
);

const MovieDetails = () => {
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => dispatch(removemovie());
  }, [id]);

  const trailer = useMemo(() => {
  return info?.videos?.results
    ?.find(
      (vid) =>
        vid.site === "YouTube" && vid.type === "Trailer"
    );
}, [info]);


  console.log(info);

  return (
    <>
      <SideNav />
      <BottomNav />
      {info ? (
        <>
          {/* HERO SECTION */}
          <div
            className=" min-h-screen w-full bg-cover bg-center relative overflow-x-auto pb-12"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
            }}
          >
            <div className=" fixed w-full  inset-0 bg-black/85" />

            <div className="relative z-10 p-6 md:p-12 lg:p-20 text-white">
              <div className="flex flex-col items-center md:flex-row gap-8">
                <div className="w-[70vw] md:w-75 lg:w-100 shrink-0 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${info.details.poster_path}`}
                    className="cover"
                    alt={info.details.title}
                  />
                </div>

                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {info.details.title || info.details.name}
                  </h1>

                  <p className="text-gray-300 mb-4">
                    {info.details.release_date || info.details.first_air_date} •{" "}
                    {info.details.genres?.map((g) => g.name).join(", ")}
                  </p>

                  <p className="max-w-3xl text-gray-200">
                    {info.details.overview}
                  </p>
                  <p className="mt-4 mb-4 ">
                    <span className="font-semibold">⭐</span>{" "}
                    {info.details.vote_average?.toFixed(1)} / 10 (
                    {info.details.vote_count} votes)
                  </p>

                  <a
                    className=" underline"
                    href={info.details.homepage}
                    target="_blank"
                  >
                    official website
                  </a>

                  {/* WATCH PROVIDERS */}
                  <div className="mt-5 mb-5  space-y-1 ">
                    {/* Stream */}
                    {info.watchproviders?.flatrate && (
                      <div>
                        <h2 className="mb-2 text-lg font-semibold">Stream</h2>
                        <div className="flex gap-3">
                          {info.watchproviders.flatrate.map((p) => (
                            <div key={p.provider_id} className="text-center">
                              <img
                                src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}
                                alt={p.provider_name}
                                className="h-10 w-10 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rent */}
                    {info.watchproviders?.rent && (
                      <div>
                        <h2 className="mb-2 text-lg font-semibold">Rent</h2>
                        <div className="flex gap-3">
                          {info.watchproviders.rent.map((p) => (
                            <div key={p.provider_id} className="text-center">
                              <img
                                src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}
                                alt={p.provider_name}
                                className="h-10 w-10 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Buy */}
                    {info.watchproviders?.buy && (
                      <div>
                        <h2 className="mb-2 text-lg font-semibold">Buy</h2>
                        <div className="flex gap-3">
                          {info.watchproviders.buy.map((p) => (
                            <div key={p.provider_id} className="text-center">
                              <img
                                src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}
                                alt={p.provider_name}
                                className="h-10 w-10 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* TRAILER */}
              {trailer && (
                <div className="mt-12 mb-12">
                  <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
                  <iframe
                    className="w-full md:w-[80%] aspect-video rounded-lg"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    allowFullScreen
                  />
                </div>
              )}

              {/* RECOMMENDATIONS */}
              {info.recommendations?.length > 0 && (
                <Link className="mt-10 w-full">
                  <h2 className="text-2xl font-semibold mb-4">Recommended</h2>
                  <div className="flex gap-4 overflow-x-auto">
                    {info.recommendations.map((item) => (
                      <MovieCard key={item.id} item={item} />
                    ))}
                  </div>
                </Link>
              )}

              {/* SIMILAR */}
              {info.similar?.length > 0 && (
                <div className="mt-12 w-full">
                  <h2 className="text-2xl font-semibold mb-4">
                    Similar Movies
                  </h2>
                  <div className="flex gap-4 overflow-x-auto">
                    {info.similar.map((item) => (
                      <MovieCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MovieDetails;
