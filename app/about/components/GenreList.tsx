"use client";

import { useEffect, useState } from "react";
import { getGenres } from "@/utils/tmdb";
import Link from "next/link";
import { useParams } from "next/navigation";

type Genre = {
  id: number;
  name: string;
};

export default function GenreList() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const params = useParams();
  const activeId = params?.id; // /genre/[id]

  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {genres.map((genre) => {
        const isActive = String(genre.id) === activeId;

        return (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className={`px-3 py-1 rounded transition
              ${
                isActive
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
          >
            {genre.name}
          </Link>
        );
      })}
    </div>
  );
}
