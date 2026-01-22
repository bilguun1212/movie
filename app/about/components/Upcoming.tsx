import { Movie } from "./MovieCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Upcoming = ({
  title,
  category,
  movieResults = [],
}: {
  title: string;
  category: string;
  movieResults: Movie[];
}) => {
  return (
    <div className="w-310 flex flex-col gap-8 max-sm:hidden">
      <div className="flex justify-between items-center animate-fade-up">
        <p className="text-[24px] font-semibold">{title}</p>

        <Link href={`/category/${category}`}>
          <button className="flex gap-2 items-center">
            See more <ArrowRight width={16} height={16} />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8">
        {movieResults.slice(0, 10).map((films, index) => (
          <Link href={`/movie/${films.id}`} key={films.id}>
            <div
              style={{ animationDelay: `${index * 80}ms` }}
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
                className="object-cover object-center md:min-h-85 min-h-60"
                src={`https://image.tmdb.org/t/p/original${films.backdrop_path}`}
                alt={films.original_title}
              />

              <div className="bg-gray-300 h-23.75 p-2">
                <div className="flex items-center gap-1">
                  <p className="text-[12px] md:text-[14px] flex items-center">
                    <img src="/Star.png" alt="Star" className="w-3 h-3" />
                    {films.vote_average}
                  </p>
                  <p className="opacity-50 text-[12px]">/10</p>
                </div>
                <p className="text-sm font-medium">{films.original_title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
