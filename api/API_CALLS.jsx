import {API_CALL} from '../constants/constants';
import {
  trendingMovieEndpoint,
  movieDetailsEndpoint,
  topRatedMovieEndpoint,
  upcomingMovieEndpoint,
  movieCreditsEndpoint,
  movieSimilarEndpoint,
  personDetailsEndpoint,
  personCreditEndpoint,
  searchMovieEndpoint,
} from './API_ENDPOINT';
export const fetchTrendingMovies = () => {
  return API_CALL(trendingMovieEndpoint);
};
export const fetchUpCominggMovies = () => {
  return API_CALL(upcomingMovieEndpoint);
};
export const fetchTopRatedMovies = () => {
  return API_CALL(topRatedMovieEndpoint);
};
export const fetchMoviesDetails = _id => {
  return API_CALL(movieDetailsEndpoint(_id));
};
export const fetchMoviesCredits = _id => {
  return API_CALL(movieCreditsEndpoint(_id));
};
export const fetchSimilarMovies = _id => {
  return API_CALL(movieSimilarEndpoint(_id));
};
export const fetchPersonDetails = _id => {
  return API_CALL(personDetailsEndpoint(_id));
};
export const fetchPersonCredit = _id => {
  return API_CALL(personCreditEndpoint(_id));
};
export const searchMovies = movieName => {
  return API_CALL(searchMovieEndpoint(movieName));
};
