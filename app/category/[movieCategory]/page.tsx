import { Results } from "@/app/about/components/MovieCard";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { movieApi } from "@/utils/tmdb";
import Image from "next/image";
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
            {movies.results.map((films) => {
              return (
                <div
                  key={films.id}
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
                    className="object-cover object-center rounded-t-lg  md:min-h-85 min-h-60"
                    src={`https://image.tmdb.org/t/p/original${films.backdrop_path}`}
                  />
                  <div className="bg-gray-200 h-23.75 p-2 rounded-b-lg ">
                    <div className="flex">
                      <p className="text-[12px] flex md:text-[14px]">
                        <Image
                          src="/Star.png"
                          alt="star"
                          width={16}
                          height={16}
                        />
                        {films.vote_average}
                      </p>
                      <p className="opacity-50 text-[12px] flex items-center">
                        /10
                      </p>
                    </div>
                    <p>{films.original_title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
