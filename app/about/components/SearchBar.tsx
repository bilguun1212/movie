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

      {/* Хайлтын үр дүн чиний өмнөх загвараар */}
      {shouldFetch && data?.results?.length > 0 && (
        <div className={`absolute top-11 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden
          ${isMobileOpen ? "max-sm:fixed max-sm:inset-x-4 max-sm:top-[70px] max-sm:w-auto" : "w-[400px] right-0"}`}>
          {/* ... чиний өмнөх хайлтын жагсаалт харуулдаг код энд байна ... */}
        </div>
      )}
    </div>
  );
};