import {API_KEY} from '../constants/constants';
import {BASE_URL} from '../constants/constants';
//Movie's END_POINT
export const trendingMovieEndpoint = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
export const upcomingMovieEndpoint = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`;
export const topRatedMovieEndpoint = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;

//Dynamic END_POINT
export const movieDetailsEndpoint = _id =>
  `${BASE_URL}/movie/${_id}?api_key=${API_KEY}`;
export const movieCreditsEndpoint = _id =>
  `${BASE_URL}/movie/${_id}/credits?api_key=${API_KEY}`;
export const movieSimilarEndpoint = _id =>
  `${BASE_URL}/movie/${_id}/similar?api_key=${API_KEY}`;
export const searchMovieEndpoint = movieName =>
  `${BASE_URL}/search/movie?query=${movieName}&api_key=${API_KEY}`;

//Person END_POINT
export const personDetailsEndpoint = _id =>
  `${BASE_URL}/person/${_id}?api_key=${API_KEY}`;
export const personCreditEndpoint = _id =>
  `${BASE_URL}/person/${_id}/movie_credits?api_key=${API_KEY}`;
