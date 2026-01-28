export { removemovie } from "../reducers/movieSlice";
import axios from "../../../Utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    let results = {
        details: details.data,
        externalId: externalId.data,
        recommendations: recommendations.data.results,
        similar: similar.data.results,
        videos: videos.data,
        watchproviders: watchproviders.data.results.IN,
    };
    
    dispatch(loadmovie(results));

    console.log(results);
  } catch (error) {
    console.log("Error:", error);
  }
};
