import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let currentDate = new Date();
const date = currentDate.setMonth(-1);
let movie = "movie";
let tvshow = "tv";

export const tmdbAPI = createApi({
  reducerPath: "tmdbAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getPopularMovie: builder.query({
      query: (languages) =>
        `movie/popular?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}S&page=1&region=FR`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = movie));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getPopularTvshow: builder.query({
      query: (languages) =>
        `tv/popular?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}S&page=1`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = tvshow));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getTopRatedMovie: builder.query({
      query: (languages) =>
        `movie/top_rated?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}S&page=1&region=FR`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = movie));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getTopRatedTvshow: builder.query({
      query: (languages) =>
        `tv/top_rated?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}S&page=1`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = tvshow));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getAllTrends: builder.query({
      query: (arg) =>
        "trending/all/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f",
      transformResponse: (response, meta, data) => {
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getTrendsTvshow: builder.query({
      query: (arg) =>
        "trending/tv/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f",
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = tvshow));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getLastReleaseMovie: builder.query({
      query: (languages) =>
        `discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=release_date.desc&include_adult=false&include_video=true&page=1&release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = movie));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getLastReleaseTvshow: builder.query({
      query: (languages) =>
        `discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=popularity.asc&air_date.lte=${date}&page=1&timezone=Europe%2FParis&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = tvshow));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getPromotedMovie: builder.query({
      query: (languages, page) =>
        `discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = movie));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getPromotedTvshow: builder.query({
      query: (languages, page) =>
        `discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=vote_average.desc&page=${page}&vote_average.gte=6&vote_count.gte=50&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = tvshow));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getPlayingNowMovie: builder.query({
      query: (languages) =>
        `movie/now_playing?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&page=1&region=US`,
      transformResponse: (response, meta, data) => {
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getUpcomingMovie: builder.query({
      query: (languages) =>
        `movie/upcoming?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&page=1&region=FR`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = movie));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getTvshowOnAir: builder.query({
      query: (languages) =>
        `tv/on_the_air?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&page=1`,
      transformResponse: (response, meta, data) => {
        response.results.map((r) => (r.media_type = tvshow));
        return response.results;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getInfosModal: builder.query({
      query: ({ params }) =>
        `https://api.themoviedb.org/3/${params.media_type}/${params.id}?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${params.languages}`,
      transformResponse: (response, meta, arg) => {
        return response;
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getVideos: builder.query({
      query: ({ params }) =>
        `https://api.themoviedb.org/3/${params.media_type}/${params.id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${params.languages}`,
      transformResponse: (response, meta, data) => response,
      transformErrorResponse: (response, meta, arg) => {
        return response.status;
      },
    }),
    getCredits: builder.query({
      query: ({ params }) =>
        `https://api.themoviedb.org/3/${params.media_type}/${params.id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${params.languages}`,
      transformResponse: (response, meta, data) => response,
      transformErrorResponse: (response, meta, arg) => {
        return response.status;
      },
    }),
    getSimilars: builder.query({
      query: ({ params }) => `
      https://api.themoviedb.org/3/${params.media_type}/${params.id}/recommendations?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${params.languages}&page=1`,
      transformResponse: (response, meta, data) => response.results,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getGenre: builder.query({
      query: ({ params }) =>
        `discover/${params.media_type}?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${params.languages}&sort_by=popularity.desc&page=${params.pageNumber}&timezone=Europe%2FAmerica&with_genres=${params.id}&include_null_first_air_dates=false&watch_region=FR&with_watch_monetization_types=flatrate&with_status=0`,
      transformResponse: (response, meta, { params }) => {
        response.results.map((r) => (r.media_type = params.media_type));
        return response.results;
      },
      transformErrorResponse: (response) => response.status,
    }),
  }),
});

export const {
  useGetPopularMovieQuery,
  useGetPopularTvshowQuery,
  useGetTopRatedMovieQuery,
  useGetTopRatedTvshowQuery,
  useGetAllTrendsQuery,
  useGetTrendsTvshowQuery,
  useGetLastReleaseMovieQuery,
  useGetLastReleaseTvshowQuery,
  useGetPromotedMovieQuery,
  useGetPromotedTvshowQuery,
  useGetPlayingNowMovieQuery,
  useGetUpcomingMovieQuery,
  useGetTvshowOnAirQuery,
  useGetInfosModalQuery,
  useGetVideosQuery,
  useGetCreditsQuery,
  useGetSimilarsQuery,
  useGetGenreQuery,
} = tmdbAPI;
