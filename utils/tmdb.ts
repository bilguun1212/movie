const TMDB_BASE_URL = "https://api.themoviedb.org/3";
// .env файл доторх нэршил заавал NEXT_PUBLIC_TMDB_API_KEY байх ёстой
const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const getHeaders = {
  accept: 'application/json',
  Authorization: `Bearer ${TMDB_TOKEN}`,
};

export async function getGenres() {
  const res = await fetch(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
    headers: getHeaders,
    cache: "force-cache",
  });
  return res.json();
}

export async function searchMovies(query: string) {
  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
    {
      headers: getHeaders,
      cache: "no-store", 
    }
  );
  return res.json();
}

export async function discoverMovies(genreIds: string, page: number = 1) {
  // Convert comma-separated IDs to pipe-separated format required by TMDB API
  const formattedIds = genreIds.split(",").filter(Boolean).join("|");
  const url = `${TMDB_BASE_URL}/discover/movie?with_genres=${formattedIds}&page=${page}&sort_by=popularity.desc`;
  const res = await fetch(url, { headers: getHeaders, cache: "no-store" });
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
    headers: getHeaders,
    next: { revalidate: 3600 }, 
  });

  return res.json();
}

export async function getMovieDetail(movieId: string) {
  const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?language=en-US`, {
    headers: getHeaders,
    cache: "force-cache",
  });
  return res.json();
}

export async function getMovieCredits(movieId: string) {
  const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/credits?language=en-US`, {
    headers: getHeaders,
    cache: "force-cache",
  });
  return res.json();
}

export async function getMovieVideos(movieId: string) {
  const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`, {
    headers: getHeaders,
    cache: "force-cache",
  });
  return res.json();
}

export async function getSimilarMovies(id: string, page: number = 1) {
  const res = await fetch(`${TMDB_BASE_URL}/movie/${id}/similar?page=${page}`, {
    headers: getHeaders,
    cache: "force-cache",
  });
  return res.json();
}