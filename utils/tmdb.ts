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

  return res.json();
}

export async function discoverMovies(genreIds: string, page: number = 1) {
  const url = `${TMDB_BASE_URL}/discover/movie?with_genres=${genreIds}&page=${page}&sort_by=popularity.desc`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
  });
  return res.json();
}
export async function movieApi(
  category: string,
  page: number = 1,
  genreId?: number,
): Promise<any> {
  const url = genreId
    ? `${TMDB_BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
    : `${TMDB_BASE_URL}/movie/${category}?page=${page}`;

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
export async function getSimilarMovies(id: string, page: number = 1) {
  const res = await fetch(`${TMDB_BASE_URL}/movie/${id}/similar?page=${page}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
    cache: "force-cache",
  });
  return res.json();
}
