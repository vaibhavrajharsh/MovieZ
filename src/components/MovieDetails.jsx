import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { asyncloadmovie, removemovie } from "./store/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "./Template/SideNav";
import Loader from "./Template/Loader";
import BottomNav from "./Template/BottomNav";

const MovieCard = ({ item }) => (
  <Link to={`/movie/details/${item.id}`} className="w-[140px] md:w-[180px] shrink-0">
    <img
      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
      alt={item.title || item.name}
      className="rounded-lg hover:scale-105 transition cursor-pointer"
    />
    <p className="text-sm mt-2 text-center">{item.title || item.name}</p>
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

  if (!info) return <Loader />;

  const {
    details,
    externalId,
    videos,
    watchproviders,
    recommendations,
    similar,
  } = info;

  const trailer = videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  );

  console.log(info);

  return (
    <>
      <SideNav />
      <BottomNav />
      {info?(<>
        {/* HERO SECTION */}
        <div
          className=" min-h-screen w-full bg-cover bg-center relative overflow-x-auto"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
          }}
        >
          <div className=" fixed w-full  inset-0 bg-black/85" />

          <div className="relative z-10 p-6 md:p-12 lg:p-20 text-white">
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                className="w-[70vw] md:w-[260px] rounded-lg shadow-lg"
                alt={details.title}
              />

              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {details.title || details.name}
                </h1>

                <p className="text-gray-300 mb-4">
                  {details.release_date || details.first_air_date} •{" "}
                  {details.genres?.map((g) => g.name).join(", ")}
                </p>

                <p className="max-w-3xl text-gray-200">{details.overview}</p>

                {/* EXTERNAL IDS */}
                <div className="flex gap-4 mt-6 text-xl">
                  {externalId?.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${externalId.imdb_id}`}
                      target="_blank"
                    >
                      IMDB
                    </a>
                  )}
                  {externalId?.instagram_id && (
                    <a
                      href={`https://instagram.com/${externalId.instagram_id}`}
                      target="_blank"
                    >
                      INSTA
                    </a>
                  )}
                  {externalId?.twitter_id && (
                    <a
                      href={`https://twitter.com/${externalId.twitter_id}`}
                      target="_blank"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* TRAILER */}
            {trailer && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
                <iframe
                  className="w-full md:w-[80%] aspect-video rounded-lg"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allowFullScreen
                />
              </div>
            )}

            {/* WATCH PROVIDERS */}
            {watchproviders?.IN && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Available On</h2>
                <div className="flex gap-4 flex-wrap">
                  {watchproviders.IN.flatrate?.map((p) => (
                    <img
                      key={p.provider_id}
                      src={`https://image.tmdb.org/t/p/w200/${p.logo_path}`}
                      className="w-12 h-12 rounded"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* RECOMMENDATIONS */}
            {recommendations?.length > 0 && (
              <Link className="mt-12 w-full">
                <h2 className="text-2xl font-semibold mb-4">Recommended</h2>
                <div className="flex gap-4 overflow-x-auto">
                  {recommendations.map((item) => (
                    <MovieCard key={item.id} item={item} />
                  ))}
                </div>
              </Link>
            )}

            {/* SIMILAR */}
            {similar?.length > 0 && (
              <div className="mt-12 w-full">
                <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
                <div className="flex gap-4 overflow-x-auto">
                  {similar.map((item) => (
                    <MovieCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>):(<Loader/>)}
    </>
  );
};

export default MovieDetails;
