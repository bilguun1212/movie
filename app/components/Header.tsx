"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Moon, ChevronUp, ChevronDown, ChevronRight, Film } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchBar } from "../about/components/SearchBar";
import { getGenres } from "@/utils/tmdb";

type Genre = {
  id: number;
  name: string;
};

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
    <div className="flex md:flex w-full justify-between items-center pt-11.5 pl-20 pb-11.5 pr-20 ">
      {/* Logo */}
      <div className="flex gap-1 items-center">
        <Film color="#4338CA" />
        <div className="text-[#4338CA] text-sm font-bold md:text-base">
          Movie Z
        </div>
      </div>

      {/* Genre + Search */}
      <div className="flex gap-2 items-start relative">
        <Button
          className=" bg-white text-black border border-gray-300 "
          onClick={toggle}
        >
          {isOpen ? <ChevronDown /> : <ChevronUp />} Genre
        </Button>

        {/* Animated dropdown */}
        <div
          className={`
    absolute top-full left-0 mt-1 w-[577px] bg-white rounded-lg shadow-lg border border-gray-300 z-50 p-5
    transform origin-top-left transition-all duration-700 ease-in-out 
    ${isOpen ? "opacity-100 scale-x-100 scale-y-100" : "opacity-0 scale-x-95 scale-y-95 pointer-events-none"}
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

        <div className="w-[300px]">
          <SearchBar />
        </div>
      </div>

      {/* Theme */}
      <div className="w-9 h-9 rounded-md flex justify-center items-center bg-white border border-gray-300">
        <Moon className="w-5 h-5" />
      </div>
    </div>
  );
};
