import { getSimilarMovies, getMovieDetail } from "@/utils/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function SimilarMoviesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [movie, similar] = await Promise.all([
    getMovieDetail(id),
    getSimilarMovies(id),
  ]);

  if (!movie) notFound();

  return (
    <div className="max-w-300 mx-auto px-4 py-10 space-y-8 font-sans bg-white">
      <h1 className="text-3xl  text-black font-semibold">More like</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {similar?.results?.map((m: any) => (
          <Link
            key={m.id}
            href={`/movie/${m.id}`}
            className="group bg-[#f4f4f5] rounded-xl overflow-hidden flex flex-col transition-all hover:shadow-lg"
          >
            <div className="relative aspect-2/3 w-full overflow-hidden bg-gray-100">
              {m.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  alt={m.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                  No Image
                </div>
              )}
            </div>
            <div className="p-3 space-y-1">
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-base font-normal">
                  {m.vote_average?.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">/10</span>
              </div>
              <h3 className="text-sm font-normal text-gray-900 line-clamp-2">
                {m.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
