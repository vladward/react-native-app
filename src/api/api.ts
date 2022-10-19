export const api_key = '365da808b8c3c4b7a04da7eca0d9524e';
const BASE_URL = 'https://api.themoviedb.org/3/';

export const API = {
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
  createRequestToken() {
    return fetch(`${BASE_URL}authentication/token/new?api_key=${api_key}`)
      .then((res) => res.json())
      .then((data) => data);
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