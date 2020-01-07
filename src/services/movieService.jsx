import httpService from './HttpService';
import config from '../config.json';

const apiEndpoint = `${config.apiEndpoint}/${config.apiMovies}`;

export async function getMovies() {
  const { data } = await httpService.get(apiEndpoint);
  return data;
}

export async function getMovie(id) {
  console.log('getMovie() before', id);
  const { data } = await httpService.get(`${apiEndpoint}/${id}`);
  console.log('getMovie()', id, data);
  return data;
}

export async function saveMovie(movie) {
  let movieResult = null;

  // server expects genreId instead of genre object
  const movieTmp = { ...movie };
  if (movieTmp.genre) {
    movieTmp.genreId = movieTmp.genre._id;
    delete movieTmp.genre;
    delete movieTmp._id; // no _id values allowed
  }

  if (movie._id) {
    movieResult = await httpService.put(
      `${apiEndpoint}/${movie._id}`,
      movieTmp
    );
  } else {
    movieResult = await httpService.post(apiEndpoint, movieTmp);
  }

  return movieResult;
}

export async function deleteMovie(id) {
  let movieInDb = await httpService.delete(`${apiEndpoint}/${id}`);
  return movieInDb;
}
