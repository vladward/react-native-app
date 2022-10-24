import { api_key, BASE_URL } from '../constants';
import { SortType } from '../types/types';

export const API = {
  getCurrentUser(session_id: string) {
    return fetch(`${BASE_URL}account?api_key=${api_key}&session_id=${session_id}`).then((res) =>
      res.json().then((data) => data)
    );
  },
  getMovie(movieId: string | number, language?: string) {
    return fetch(`${BASE_URL}movie/${movieId}?api_key=${api_key}&language=${language || 'en-US'}`)
      .then((res) => res.json())
      .then((data) => data);
  },
  getNowPlaying(page: string | number, language?: string) {
    return fetch(
      `${BASE_URL}movie/now_playing?api_key=${api_key}&language=${language || 'en-US'}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => data);
  },
  getFavoriteMovies(
    account_id: number,
    session_id: string,
    sortedBy: SortType,
    page: number,
    language?: string
  ) {
    return fetch(
      `${BASE_URL}account/${account_id}/favorite/movies?api_key=${api_key}&session_id=${session_id}&language=${
        language || 'en-US'
      }&sort_by=${sortedBy || 'created_at.asc'}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => data);
  },
  searchMovies(page: number, value: string, language?: string) {
    return fetch(
      `${BASE_URL}search/movie?api_key=${api_key}&language=${
        language || 'en-US'
      }&query=${value}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => data);
  },
  createRequestToken() {
    return fetch(`${BASE_URL}authentication/token/new?api_key=${api_key}`)
      .then((res) => res.json())
      .then((data) => data);
  },
  markAsFavorite(
    media_id: string,
    isFavorite: boolean,
    account_id: string | number,
    session_id: string
  ) {
    return fetch(
      `${BASE_URL}account/${account_id}/favorite?api_key=${api_key}&session_id=${session_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          media_type: 'movie',
          media_id: media_id,
          favorite: isFavorite,
        }),
      }
    ).then((res) => res.json());
  },
  validateUser(username: string, password: string, token: string) {
    return fetch(`${BASE_URL}authentication/token/validate_with_login?api_key=${api_key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        request_token: token,
      }),
    }).then((res) => res.json());
  },
  makeSession(token: string) {
    return fetch(`${BASE_URL}authentication/session/new?api_key=${api_key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ request_token: token }),
    }).then((res) => res.json());
  },
  deleteSession(sessionId: string) {
    return fetch(`https://api.themoviedb.org/3/authentication/session?api_key=${api_key}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: sessionId }),
    }).then((res) => res.json());
  },
};
