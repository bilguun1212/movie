"use client";

import { useEffect, useState } from "react";
import { getGenres } from "@/utils/tmdb";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

type Genre = {
  id: number;
  name: string;
};

export default function GenreList() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const params = useParams();

  const activeId = params?.id;
  const activeIdString = Array.isArray(activeId) ? activeId.join(",") : activeId || "";

  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    if (!activeIdString) {
      setSelectedGenreIds([]);
      return;
    }

    const parsedIds = activeIdString
      .split(",")
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id));

    setSelectedGenreIds(parsedIds);
  }, [activeId]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenreIds((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
  };

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2">
      {genres.map((genre) => {
        const isActive = selectedGenreIds.includes(genre.id);
        const nextIds = isActive
          ? selectedGenreIds.filter((id) => id !== genre.id)
          : [...selectedGenreIds, genre.id];
        const nextIdString = nextIds.join(",");

        return (
          <Link
            key={genre.id}
            href={`/genre/${nextIdString}`}
            onClick={() => toggleGenre(genre.id)}
            className={`
              flex items-center gap-1 px-3 py-1 rounded-full border font-semibold text-[12px] transition-all
              ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-[#E4E4E7] hover:bg-gray-50 active:scale-95"
              }
            `}
          >
            <span className="font-semibold">{genre.name}</span>
            <ChevronRight
              height={14}
              width={14}
              className={isActive ? "text-white" : "text-gray-400"}
            />
          </Link>
        );
      })}
    </div>
  );
}
