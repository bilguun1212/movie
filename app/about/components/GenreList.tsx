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
  const params = useParams();
  const activeId = params?.id;

  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-6 max-sm:hidden">
      {genres.map((genre) => {
        const isActive = String(genre.id) === activeId;

        return (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className={`py-1 px-2 flex items-center justify-center text-base font-semibold transition border border-gray-300 rounded-2xl
              ${
                isActive
                  ? "bg-white text-black"
                  : "bg-white hover:text-white hover:bg-black"
              }`}
          >
            {genre.name}
            <ChevronRight width={16} height={16} />
          </Link>
        );
      })}
    </div>
  );
}
