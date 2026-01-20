const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function getGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
      cache: "force-cache",
    },
  );

  return res.json();
}

export async function searchMovies(query: string) {
  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${query}&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
      cache: "force-cache",
    },
  );

  return res.json(); // ⬅️ заавал results агуулсан object
}

export async function discoverMovies(genreId?: number, page = 1) {
  const url = genreId
    ? `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreId}&page=${page}`
    : `${TMDB_BASE_URL}/discover/movie?language=en&page=${page}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
    cache: "force-cache",
  });

  return res.json();
}

export async function movieApi(category: string, genreId?: number) {
  const url = genreId
    ? `${TMDB_BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`
    : `${TMDB_BASE_URL}/movie/${category}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
    cache: "force-cache",
  });

  return res.json();
}

export async function getMovieDetail(movieId: string) {
  const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
    cache: "force-cache",
  });

  return res.json();
}
export async function getMovieCredits(movieId: string) {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
      cache: "force-cache",
    },
  );

  return res.json();
}

export async function getMovieVideos(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
      cache: "force-cache",
    },
  );

  return res.json();
}
export async function getSimilarMovies(movieId: string, page = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
      cache: "force-cache",
    },
  );

  return res.json();
}
