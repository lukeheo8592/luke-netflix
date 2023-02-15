
const API_KEY = "7b12967fb62dd9e20c2646bc875ac8e7";
const BASE_URL = "https://api.themoviedb.org/3";

export interface IMovie {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  title?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  first_air_date?: string;
}

export interface IGetVideosProps {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetVideoDetail {
  data: object;
  name?: string;
  first_air_date?: string;
  origin_country?: string[];
  original_name?: string;
  dataUpdatedAt: number;
  errorUpdatedAt: number;
  failureCount: number;
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: [
      {
        id: string;
        iso_639_1: string;
        iso_3166_1: string;
        key: string;
        name: string;
        official: boolean;
        published_at: string;
        site: string;
        size: number;
        type: string;
      }
    ];
  };
}

export interface IVideoCredit {
  cast: ICast[];
  crew: ICrew[];
  id: number;
}

interface ICast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface ICrew {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface ISimilarProps {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ISearchMovie {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ITvProps {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetTvProps {
  page: number;
  results: ITvProps[];
  total_pages: number;
  total_results: number;
}
export function getMoviesPage1() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getMoviesPage2() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=3`
  ).then((response) => response.json());
}

export function getMoviesPage3() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=5`
  ).then((response) => response.json());
}

export function getMoviesPage4() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=10`
  ).then((response) => response.json());
}

export function getMoviesPage5() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=12`
  ).then((response) => response.json());
}

export function getMoviesPage6() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=14`
  ).then((response) => response.json());
}

export function topRateMoviePage1() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}
export function topRateMoviePage2() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=3`
  ).then((response) => response.json());
}
export function topRateMoviePage3() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=5`
  ).then((response) => response.json());
}

export function topRateMoviePage4() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=7`
  ).then((response) => response.json());
}
export function topRateMoviePage5() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=9`
  ).then((response) => response.json());
}
export function topRateMoviePage6() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=11`
  ).then((response) => response.json());
}

export function getVideoDetail(format: string, id: string) {
  return fetch(
    `${BASE_URL}/${format}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());
}

export function getVideoCredit(format: string, id: string) {
  return fetch(
    `${BASE_URL}/${format}/${id}/credits?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}

export function getSearchVideo(format: string, id: string) {
  return fetch(
    `${BASE_URL}/search/${format}?api_key=${API_KEY}&query=${id}&page=1`
  ).then((response) => response.json());
}

export function getTvOnAir(page: number) {
  return fetch(
    `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`
  ).then((response) => response.json());
}

export function getSimilarData(format: string, id: string) {
  return fetch(
    `
    ${BASE_URL}/${format}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getUpcommingData(page: number) {
  return fetch(
    `
   ${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
  ).then((response) => response.json());
}

export function getTopRatedTvData(page: number) {
  return fetch(
    `
    ${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
  ).then((response) => response.json());
}

export function getPopularTvData(page: number) {
  return fetch(
    `
   ${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  ).then((response) => response.json());
}

export function getAiringTodayTvData(page: number) {
  return fetch(
    `
    ${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`
  ).then((response) => response.json());
}