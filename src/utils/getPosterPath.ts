import { api_key } from '../api';

export const GetPosterPath = (path: string | null) => {
  return 'https://image.tmdb.org/t/p/w92' + path + `?api_key=${api_key}`;
};
