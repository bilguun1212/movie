import { getSimilarMovies, getMovieDetail } from "@/utils/tmdb";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default async function SimilarMoviesPage({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;

  if (!movieId || isNaN(Number(movieId))) {
    notFound();
  }

  const movie = await getMovieDetail(movieId);
  const similar = await getSimilarMovies(movieId);

  const results = similar?.results ?? [];

  return (
    <div className="flex flex-col items-center">
      <Header />

      <div className="w-[1028px] py-12 flex flex-col gap-8">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold">
            More like {movie.title}
          </h1>
          <p className="text-gray-500 mt-1">
            Similar movies you might enjoy
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-6">
          {results.map((m: any) => (
            <Link key={m.id} href={`/movie/${m.id}`}>
              <div className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition">
                <div className="relative w-full h-[280px]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                    alt={m.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-3">
                  <p className="text-sm font-semibold truncate">
                    {m.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ⭐ {m.vote_average.toFixed(1)} / 10
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
