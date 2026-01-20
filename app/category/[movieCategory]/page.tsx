import { Results } from "@/app/about/components/MovieCard";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
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
    <div className="flex flex-col items-center justify-center">
      <Header />

      <div className="w-360">
        <div className="flex flex-col gap-8 px-20 py-13">
          <p className="text-[24px] font-semibold">{title}</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8">
            {movies.results.map((films) => (
              // 🔥 ЭНД LINK НЭМСЭН
              <Link
                key={films.id}
                href={`/movie/${films.id}`}
                className="block"
              >
                <div
                  className="
                    rounded-lg overflow-hidden
                    shadow-2xl
                    cursor-pointer
                    animate-fade-up
                    transition-transform transition-shadow duration-300
                    hover:scale-[1.03]
                    hover:shadow-xl
                  "
                >
                  <img
                    className="object-cover object-center rounded-t-lg md:min-h-85 min-h-60"
                    src={`https://image.tmdb.org/t/p/original${films.backdrop_path}`}
                    alt={films.original_title}
                  />

                  <div className="bg-gray-200 h-23.75 p-2 rounded-b-lg">
                    <div className="flex items-center gap-1">
                      <Image
                        src="/Star.png"
                        alt="star"
                        width={16}
                        height={16}
                      />
                      <p className="text-[12px] md:text-[14px]">
                        {films.vote_average}
                      </p>
                      <span className="opacity-50 text-[12px]">/10</span>
                    </div>

                    <p className="text-sm font-medium truncate">
                      {films.original_title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
