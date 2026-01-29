import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { asyncloadperson, removeperson } from "./store/actions/personActions";
import Loader from "./Template/Loader";
import SideNav from "./Template/SideNav";
import BottomNav from "./Template/BottomNav";
import MovieCard from "./MovieDetails.jsx";

const PersonCard = ({ item }) => (
  <Link
    to={`/person/details/${item.id}`}
    className="w-35 md:w-45 shrink-0"
  >
    <img
      src={`https://image.tmdb.org/t/p/w500/${item.poster_path ||item.backdrop_path}`}
      alt={item.title || item.name}
      className="rounded-lg hover:scale-105 transition cursor-pointer"
    />
    <p className="text-sm mt-2 text-center truncate">
      {item.title || item.name}
    </p>
  </Link>
);

const PersonDetails = () => {
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => dispatch(removeperson());
  }, [id]);


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
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.details.profile_path})`,
            }}
          >
            <div className=" fixed w-full  inset-0 bg-black/85" />

            <div className="relative z-10 p-6 md:p-12 lg:p-20 text-white">
              <div className="flex flex-col items-center md:flex-row gap-8">
                <div className="w-[70vw] md:w-75 lg:w-100 shrink-0 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${info.details.profile_path}`}
                    className="cover"
                    alt={info.details.title}
                  />
                </div>

                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {info.details.title || info.details.name}
                  </h1>

                  <p className="text-gray-300 mb-4">
                    {info.details.place_of_birth} • {info.details.known_for_department} •{" "}
                    {info.details.gender === 1 ? " Female" : " Male"}
                  </p>

                  <p className="max-w-3xl text-gray-200">{info.details.biography}</p>
                  <p className="mt-4 mb-4 ">
                    Also known as:{" "}
                    {info.details.also_known_as?.map((g) => g).join(",  ")}
                  </p>
                  {/* EXTERNAL IDS */}
                  <div className="flex gap-4 mt-4">
                    {info.externalId.facebook_id && (
                      <a
                        href={`https://www.facebook.com/${info.externalId.facebook_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Facebook
                      </a>
                    )}
                    {info.externalId.twitter_id && (
                      <a
                        href={`https://www.twitter.com/${info.externalId.twitter_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                    {info.externalId.instagram_id && (
                      <a
                        href={`https://www.instagram.com/${info.externalId.instagram_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:underline"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {!info.movieCredits.cast && !info.movieCredits.cast ? (
                <div className="mt-12 w-full">
                  <h2 className="text-2xl font-semibold mb-4">Combined Credits</h2>
                  <div className="flex gap-4 overflow-x-auto">
                    {info.movieCredits.cast.map((item) => (
                      <PersonCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ) : null} 
             
              
              {info.movieCredits.cast?.length > 0 && (
                <div className="mt-12 w-full">
                  <h2 className="text-2xl font-semibold mb-4">Movie Credits</h2>
                  <div className="flex gap-4 overflow-x-auto">
                    {info.movieCredits.cast.map((item) => (
                      <PersonCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
              
              {info.tvCredits.cast?.length > 0 && (
                <div className="mt-12 w-full">
                  <h2 className="text-2xl font-semibold mb-4">TV Credits</h2>
                  <div className="flex gap-4 overflow-x-auto">
                    {info.tvCredits.cast.map((item) => (
                      <PersonCard key={item.id} item={item} />
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

export default PersonDetails;
