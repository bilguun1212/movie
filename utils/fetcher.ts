// const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// export async function searchMovies(query: string) {
//   const res = await fetch(
//     `${TMDB_BASE_URL}/search/movie?query=${query}&language=en-US&page=1`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Search failed");
//   }

//   return res.json();
// }
