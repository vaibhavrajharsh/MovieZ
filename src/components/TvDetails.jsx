import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncloadtv, removetv } from "./store/actions/tvActions";
import Loader from "./Template/Loader";
import SideNav from "./Template/SideNav";
import BottomNav from "./Template/BottomNav";
import { Link } from "react-router-dom";

const TvCard = ({ item }) => (
  <Link
    to={`/tv/details/${item.id}`}
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

const TvDetails = () => {
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => dispatch(removetv());
  }, [id]);

  if (!info) return <Loader />;

  const {
    details,
    // externalId,
    videos,
    watchproviders,
    recommendations,
    similar,
  } = info;

  const trailer = videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  );

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
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
            }}
          >
            <div className=" fixed w-full  inset-0 bg-black/85" />

            <div className="relative z-10 p-6 md:p-12 lg:p-20 text-white">
              <div className="flex flex-col items-center md:flex-row gap-8">
                <div className="w-[70vw] md:w-75 lg:w-100 shrink-0 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                    className="cover"
                    alt={details.title}
                  />
                </div>

                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {details.title || details.name}
                  </h1>

                  <p className="text-gray-300 mb-4">
                    {details.release_date || details.first_air_date} •{" "}
                    {details.genres?.map((g) => g.name).join(", ")}
                  </p>

                  <p className="max-w-3xl text-gray-200">{details.overview}</p>
                  <p className="mt-4 mb-4 ">
                    <span className="font-semibold">⭐</span>{" "}
                    {details.vote_average?.toFixed(1)} / 10 (
                    {details.vote_count} votes)
                  </p>

                  <a
                    className=" underline"
                    href={details.homepage}
                    target="_blank"
                  >
                    official website
                  </a>

                  {/* WATCH PROVIDERS */}
                  <div className="mt-5 mb-5  space-y-1 ">
                    {/* Stream */}
                    {watchproviders?.flatrate && (
                      <div>
                        <h2 className="mb-2 text-lg font-semibold">Stream</h2>
                        <div className="flex gap-3">
                          {watchproviders.flatrate.map((p) => (
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
                    {watchproviders?.rent && (
                      <div>
                        <h2 className="mb-2 text-lg font-semibold">Rent</h2>
                        <div className="flex gap-3">
                          {watchproviders.rent.map((p) => (
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
                    {watchproviders?.buy && (
                      <div>
                        <h2 className="mb-2 text-lg font-semibold">Buy</h2>
                        <div className="flex gap-3">
                          {watchproviders.buy.map((p) => (
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

              {/* Seasons */}
              {details.seasons?.length > 0 && (
                <Link className="mt-10 w-full">
                  <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
                  <div className="flex gap-4 overflow-x-auto">
                    {details.seasons.map((item) => (
                      <TvCard key={item.id} item={item} />
                    ))}
                  </div>
                </Link>
              )}

              {/* RECOMMENDATIONS */}
              {recommendations?.length > 0 && (
                <Link className="mt-10 w-full">
                  <h2 className="text-2xl font-semibold mb-4">Recommended</h2>
                  <div className="flex gap-4 overflow-x-auto">
                    {recommendations.map((item) => (
                      <TvCard key={item.id} item={item} />
                    ))}
                  </div>
                </Link>
              )}

              {/* SIMILAR */}
              {similar?.length > 0 && (
                <div className="mt-10 w-full">
                  <h2 className="text-2xl font-semibold mb-4">Similar Shows</h2>
                  <div className="flex gap-4 overflow-x-auto">
                    {similar.map((item) => (
                      <TvCard key={item.id} item={item} />
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

export default TvDetails;
