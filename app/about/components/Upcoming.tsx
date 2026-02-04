"use client";

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
    <div className="w-full max-w-300 mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="text-[20px] md:text-[24px] font-semibold">{title}</p>

        <Link href={`/category/${category}`}>
          <button className="flex gap-1 items-center text-sm opacity-70 hover:opacity-100 transition">
            See more <ArrowRight width={14} height={14} />
          </button>
        </Link>
      </div>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-5
          gap-4
          md:gap-6
        "
      >
        {movieResults.slice(0, 10).map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition">
              <div className="relative w-full aspect-2/3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="bg-gray-100 p-2">
                <div className="flex items-center gap-1 mb-0.5">
                  <img src="/Star.png" alt="star" className="w-3 h-3" />
                  <span className="text-[11px]">{movie.vote_average}</span>
                  <span className="opacity-50 text-[11px]">/10</span>
                </div>

                <p className="text-[12px] font-medium truncate">
                  {movie.original_title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
