"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Moon, ChevronUp, ChevronDown, ChevronRight, Film } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchBar } from "../about/components/SearchBar";
import { getGenres } from "@/utils/tmdb";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);

  // TMDB-ээс genre татах
  useEffect(() => {
    getGenres().then((data) => {
      if (data && Array.isArray(data.genres)) {
        setGenres(data.genres);
      } else {
        setGenres([]); // хамгаалалт
      }
    });
  }, []);

  return (
    <div className="flex w-full justify-between items-center pt-11.5 px-20 pb-11.5  max-sm:p-4.5">
      {/* Logo */}
      <div className="flex gap-1 items-center">
        <Film color="#4338CA" />
        <div className="text-[#4338CA] text-base flex font-bold max-sm:p-0 max-sm:flex-row">
          MovieZ
        </div>
      </div>

      {/* Genre + Search */}
      <div className="flex items-start relative">
        <Button
          className=" bg-white text-black border border-gray-300 max-sm:hidden"
          onClick={toggle}
        >
          {isOpen ? <ChevronDown /> : <ChevronUp />}
          <div className="max-sm:hidden max-sm:rounded-2xl">Genre</div>
        </Button>

        {/* Animated dropdown */}
        <div
          className={`
    absolute top-full left-0 mt-1 w-[577px] bg-white rounded-lg shadow-lg border border-gray-300 z-50 p-5
    transform origin-top-left transition-all duration-700 ease-in-out 
    ${isOpen ? "opacity-100 scale-x-100 scale-y-100" : "opacity-0 scale-x-95 scale-y-95 pointer-events-none max-sm:hidden"}
  `}
        >
          <h3 className="text-2xl font-semibold mb-1 ">Genres</h3>
          <p className="text-base font-normal mb-4 text-[#09090B]">
            See lists of movies by genre
          </p>
          <div className="w-full h-0 mb-4 border border-gray-300"></div>
          <div className="flex gap-3 flex-wrap">
            {genres.map((genre) => (
              <Badge
                key={genre.id}
                className="bg-white border border-gray-300 text-black cursor-pointer hover:bg-black hover:text-white"
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/genre/${genre.id}`);
                }}
              >
                {genre.name} <ChevronRight />
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex max-sm:gap-2">
          <div>
            <SearchBar />
          </div>
          <div className="w-9 h-9 border border-gray-300 rounded-lg flex items-center justify-center">
            <Moon width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
