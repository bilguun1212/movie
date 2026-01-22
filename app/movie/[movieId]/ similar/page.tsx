import { getSimilarMovies } from "@/utils/tmdb";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function SimilarPage({
  params,
  searchParams,
}: {
  params: { movieId: string };
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? "1");
  const { movieId } = params;

  const data = await getSimilarMovies(movieId, page);
  if (!data) notFound();

  const movies = (data.results ?? []).slice(0, 10);

  return (
    <div className="max-w-[1200px] mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">More like this</h1>

      {movies.length === 0 && (
        <p className="text-gray-500">No similar movies found.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {movies.map((m: any) => {
          const posterUrl = m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : "/no-image.png";

          return (
            <Link key={m.id} href={`/movie/${m.id}`}>
              <div className="rounded-lg shadow hover:scale-105 transition">
                <Image
                  src={posterUrl}
                  alt={m.title}
                  width={300}
                  height={450}
                  className="rounded-t-lg"
                />
                <div className="p-2">
                  <p className="text-sm font-medium truncate">{m.title}</p>
                  <p className="text-xs text-gray-500">
                    ⭐ {m.vote_average?.toFixed(1) ?? "N/A"}/10
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-10">
        {page > 1 && (
          <Link
            href={`/movie/${movieId}/similar?page=${page - 1}`}
            className="px-4 py-2 border rounded"
          >
            Previous
          </Link>
        )}

        <Link
          href={`/movie/${movieId}/similar?page=${page + 1}`}
          className="px-4 py-2 border rounded"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
