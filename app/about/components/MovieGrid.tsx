// "use client";

// import Image from "next/image";
// import { Movie } from "./MovieCard"; // Хэрвээ type-аа тусад нь хадгалсан бол

// type MovieGridProps = {
//   movies: Movie[];
// };

// export const MovieGrid = ({ movies }: MovieGridProps) => {
//   if (!movies || movies.length === 0) {
//     return (
//       <div className="flex justify-center items-center p-10 text-gray-500">
//         No movies found.
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 p-5">
//       {/* Grid header */}
//       <h2 className="text-2xl font-bold mb-6">Movies</h2>

//       {/* Movies grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
//           >
//             <Image
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               width={300}
//               height={450}
//               className="rounded-lg shadow-md"
//             />
//             <p className="mt-2 text-sm font-medium text-center">{movie.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
