"use client";

import { searchMovies } from "@/utils/tmdb";
import useSWR from "swr";
import { useState, KeyboardEvent, useEffect } from "react";
import { Loader, ArrowRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export const SearchBar = ({ isMobileOpen, onClose }: { isMobileOpen?: boolean; onClose?: () => void }) => {
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
      if (onClose) onClose();
    }
  };

  return (
    <div className={`relative w-full ${isMobileOpen ? "max-sm:flex-1" : "max-w-[350px]"}`}>
      <div className={`flex items-center w-full h-9 bg-white px-3 gap-2 border border-gray-300 rounded-lg`}>
        <Search className="text-gray-400 shrink-0" width={16} height={16} />
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchRedirect()}
          placeholder="Search ..."
          className="flex-1 text-[14px] outline-none"
        />
        {isLoading && <Loader size={14} className="animate-spin text-gray-400" />}
        {isMobileOpen && (
          <button onClick={onClose} className="p-1">
            <X className="text-black" size={14} />
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {shouldFetch && data?.results?.length > 0 && (
        <div className={`absolute top-11 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden
          ${isMobileOpen ? "max-sm:fixed max-sm:inset-x-4 max-sm:top-[70px] max-sm:w-auto" : "w-[400px] right-0"}`}>
          <div className="max-h-96 overflow-y-auto">
            {data.results.slice(0, 8).map((movie: any) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                onClick={() => {
                  setSearchValue("");
                  if (onClose) onClose();
                }}
              >
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    width={40}
                    height={60}
                    className="rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-15 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                    No image
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">
                    {movie.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                  </p>
                </div>
                <ArrowRight size={16} className="text-gray-400 shrink-0" />
              </Link>
            ))}
          </div>
          <button
            onClick={handleSearchRedirect}
            className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-black transition-colors border-t border-gray-100"
          >
            View all results
          </button>
        </div>
      )}
    </div>
  );
};