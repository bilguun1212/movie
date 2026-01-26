import { Results } from "@/app/about/components/MovieCard";
import { movieApi } from "@/utils/tmdb";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ movieCategory: string }>;
}) {
  const { movieCategory } = await params;

  const movies: Results = await movieApi(movieCategory);

  const title = movieCategory.includes("popular")
    ? "Popular"
    : movieCategory.includes("upcoming")
      ? "Upcoming"
      : "Top rated";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-[390px] mx-auto md:max-w-[1200px]">
        <div className="flex flex-col gap-8 px-4 py-8">
          <p className="text-[20px] font-semibold">{title}</p>

          <div
            className="
              grid
              grid-cols-2
              gap-8
              md:grid-cols-4
              lg:grid-cols-5
            "
          >
            {movies.results.map((films) => (
              <Link key={films.id} href={`/movie/${films.id}`}>
                <div className="rounded-lg overflow-hidden bg-white shadow-md">
                  <div className="relative w-full aspect-[2/3]">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${films.poster_path}`}
                      alt={films.original_title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  <div className="bg-gray-200 p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Image
                        src="/Star.png"
                        alt="star"
                        width={12}
                        height={12}
                      />
                      <span className="text-[11px]">{films.vote_average}</span>
                      <span className="opacity-50 text-[11px]">/10</span>
                    </div>

                    <p className="text-[12px] font-medium truncate">
                      {films.original_title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
