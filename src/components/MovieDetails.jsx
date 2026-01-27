import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { asyncloadmovie, removemovie } from "./store/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";

const MovieDetails = () => {
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  },[]);

  return (
    <>
      <img src={`https://image.tmdb.org/t/p/original/${info?.details.poster_path}`} className="w-1/2 cover" alt="" />
      <h1 className="text-5xl text-white">{info?.details.title}</h1>
    </>
  );
};

export default MovieDetails;
