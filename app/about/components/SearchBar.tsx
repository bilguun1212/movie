"use client";

import { searchMovies } from "@/utils/tmdb";
import useSWR from "swr";
import { useState, KeyboardEvent, useEffect } from "react";
import { Loader, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const shouldFetch = searchValue.trim().length >= 2;

  const { data, isLoading } = useSWR(
    shouldFetch ? ["search-movie", searchValue] : null,
    () => searchMovies(searchValue),
  );

  useEffect(() => {
    setSearchValue("");
  }, [pathname]);

  const handleSearchRedirect = () => {
    if (searchValue.trim()) {
      router.push(`/search/${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchRedirect();
    }
  };

  return (
    <div className="relative w-full max-w-87.5">
      <div className="flex items-center justify-center w-full h-9 border rounded-lg bg-white border-gray-300 px-3 gap-2 max-sm:p-0 max-sm:w-9">
        <Search className="text-gray-400 " width={16} height={16} />

        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search ..."
          className="flex-1 text-[14px] outline-none placeholder:text-gray-400 max-sm:hidden"
        />
        {isLoading && (
          <Loader size={14} className="animate-spin text-gray-400" />
        )}
      </div>

      {shouldFetch && data?.results?.length > 0 && (
        <div className="absolute top-11 w-125 -left-18.75 md:left-0 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          <div className="max-h-105 overflow-y-auto">
            {data.results.slice(0, 6).map((movie: any) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                onClick={() => setSearchValue("")}
                className="flex items-center gap-3 p-3 hover:bg-[#f4f4f5] transition-colors border-b border-gray-100 last:border-0"
              >
                <div className="relative w-16.75 h-25 shrink-0 rounded overflow-hidden bg-gray-100">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : "/no-poster.png"
                    }
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-gray-900 truncate">
                    {movie.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-yellow-500 text-[12px]">★</span>
                    <span className="text-[14px] font-bold flex items-center">
                      {movie.vote_average?.toFixed(1)}
                      <span className="text-[12px] text-gray-400 ml-0.5 font-normal">
                        /10
                      </span>
                    </span>
                  </div>
                  <div className="text-[12px] text-gray-500 mt-1">
                    {movie.release_date?.split("-")[0]}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[12px] font-medium text-gray-900 shrink-0 self-center">
                  See more <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={handleSearchRedirect}
            className="w-full p-4 text-[14px] font-bold text-center hover:bg-gray-50 border-t border-gray-100 transition-all"
          >
            See all results for "{searchValue}"
          </button>
        </div>
      )}
    </div>
  );
};
