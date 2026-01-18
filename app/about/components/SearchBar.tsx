"use client";

import { searchMovies } from "@/utils/tmdb";
import useSWR from "swr";
import { ChangeEvent, useState } from "react";
import { Loader, ArrowRight } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const shouldFetch = searchValue.trim().length >= 2;

  const { data, isLoading } = useSWR(
    shouldFetch ? ["search-movie", searchValue] : null,
    () => searchMovies(searchValue)
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="relative w-[577px]">
      <input
        value={searchValue}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full h-9 border rounded-lg bg-white border-[#E4E4E7] text-[14px] pl-4"
      />

      {isLoading && (
        <div className="absolute right-3 top-2">
          <Loader size={16} className="animate-spin" />
        </div>
      )}

      {/* 🔍 No result */}
      {shouldFetch && !isLoading && data?.results?.length === 0 && (
        <div className="absolute w-full bg-white p-4 text-sm text-gray-500 shadow-lg z-50">
          No results found
        </div>
      )}

      {/* ✅ Result list */}
      {shouldFetch && data?.results?.length > 0 && (
        <div className="absolute w-full bg-white rounded-lg shadow-lg z-50 max-h-[500px] overflow-y-auto">
          {data.results.map((movie: Movie) => (
            <div
              key={movie.id}
              className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[67px] h-[100px] object-cover rounded"
                />
              ) : (
                <div className="w-[67px] h-[100px] bg-gray-300 rounded" />
              )}

              <div className="flex-1">
                <p className="text-[16px] font-medium">{movie.title}</p>
                <p className="text-[12px] text-[#09090B] flex items-center gap-2">
                  ⭐ {movie.vote_average}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-[14px] text-gray-500">
                    {movie.release_date}
                  </p>
                  <span className="text-[14px] flex items-center gap-1">
                    See more <ArrowRight width={16} height={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
