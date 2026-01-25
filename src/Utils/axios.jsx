import axios from "axios";


const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTRkZDE4OTRhY2U4NTg3ZjMxNWU1ZjMzNTUyOTM2MyIsIm5iZiI6MTc2Mjg0MDM2Ni45MjMsInN1YiI6IjY5MTJjZjJlNDM5ZWM0NmQ3MTlhYzk4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._14EmondWiEVwq1PecGXlLqUtl_ec8S1-Id5HoFjJ-U'

},
});

export default instance;