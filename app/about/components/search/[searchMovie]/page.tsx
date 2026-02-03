// import { notFound } from "next/navigation";
// // import { fetcher } from "@/utils/fetcher";

// type Props = { searchParams: { query: string } };

// export default async function SearchPage({ searchParams }: Props) {
//   const query = searchParams.query;

//   if (!query) return notFound();

//   const data = await fetcher(
//     `${process.env.TMDB_BASE_URL}/search/movie?query=${query}&language=en-US&page=1`
//   );

//   return (
//     <div className="p-4">
//       <h1 className="text-xl mb-4">Search Results for "{query}"</h1>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {data.results.map((movie: any) => (
//           <div key={movie.id}>
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="rounded-md"
//             />
//             <h2 className="mt-2 text-sm">{movie.title}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// app/about/components/search/[searchMovie]/page.tsx

export default async function SearchPage({ params }: { params: Promise<{ searchMovie: string }> }) {
  const { searchMovie } = await params;
  
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Search results for: {decodeURIComponent(searchMovie)}</h1>
    </div>
  );
}