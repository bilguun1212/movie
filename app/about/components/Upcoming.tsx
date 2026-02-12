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
        <p className="text-[20px] md:text-[24px] font-semibold tracking-tight">
          {title}
        </p>
        <Link href={`/category/${category}`}>
          <button className="flex gap-1 items-center text-sm font-medium opacity-70 hover:opacity-100 transition-all duration-300 hover:translate-x-1 group/btn">
            See more
            <ArrowRight
              width={14}
              height={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
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
            <div className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="relative w-full aspect-2/3 overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="bg-gray-100 p-3 transition-all duration-500 group-hover:bg-gray-200/80 backdrop-blur-sm">
                <div className="flex items-center gap-1 mb-1.5 transform transition-transform duration-500 group-hover:translate-x-1">
                  <img src="/Star.png" alt="star" className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-bold text-gray-800">
                    {movie.vote_average}
                  </span>
                  <span className="opacity-50 text-[11px]">/10</span>
                </div>
                <p className="text-[13px] font-semibold text-gray-900 truncate transition-all duration-500 group-hover:text-indigo-600">
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
