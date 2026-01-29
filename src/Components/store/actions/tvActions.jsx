export { removetv } from "../reducers/tvSlice";
import axios from "../../../Utils/axios";
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    let results = {
        details: details.data,
        externalId: externalId.data,
        recommendations: recommendations.data.results,
        similar: similar.data.results,
        videos: videos.data,
        watchproviders: watchproviders.data.results.IN,
    };
    
    dispatch(loadtv(results));

    console.log(results);
  } catch (error) {
    console.log("Error:", error);
  }
};
