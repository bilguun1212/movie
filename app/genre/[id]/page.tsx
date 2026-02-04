"use client";

import { useEffect, useState } from "react";
import { discoverMovies, getGenres } from "@/utils/tmdb";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Star, ChevronRight } from "lucide-react";

export default function GenrePage() {
  const router = useRouter();
  const params = useParams();

  const [movies, setMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    getGenres().then((data) => setAllGenres(data.genres || []));
    if (params.id) {
      setSelectedGenres(decodeURIComponent(params.id as string).split(","));
    }
  }, [params.id]);

  useEffect(() => {
    if (selectedGenres.length > 0) {
      const genreString = selectedGenres.join(",");
      discoverMovies(genreString as any).then((data) => {
        setMovies(data.results || []);
      });
    }
  }, [selectedGenres]);

  const toggleGenre = (id: string) => {
    let newGenres;
    if (selectedGenres.includes(id)) {
      newGenres = selectedGenres.filter((g) => g !== id);
    } else {
      newGenres = [...selectedGenres, id];
    }

    if (newGenres.length > 0) {
      router.push(`/genre/${newGenres.join(",")}`);
    } else {
      router.push("/genre/all");
    }
  };

  return (
    <div className="max-w-300 mx-auto px-4 py-10 min-h-screen">
      <h2 className="text-[24px] font-bold text-black mb-1">Search filter</h2>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-[320px] shrink-0">
          <div className="mt-8">
            <h3 className="text-[18px] font-bold text-black mb-4">Genres</h3>
            <p className="text-gray-500 text-[14px] mb-6 font-medium">
              See lists of movies by genre
            </p>

            <div className="flex flex-wrap gap-2">
              {allGenres.map((g: any) => {
                const isActive = selectedGenres.includes(String(g.id));
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGenre(String(g.id))}
                    className={`
                      flex items-center gap-1 px-3 py-1 rounded-full border text-[12px] transition-all
                      ${
                        isActive
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-[#E4E4E7] hover:border-black"
                      }
                    `}
                  >
                    <span className="font-semibold">{g.name}</span>
                    <ChevronRight
                      size={14}
                      className={isActive ? "text-white" : "text-gray-400"}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="hidden md:block w-px bg-[#E4E4E7] self-stretch" />
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-black">
              {movies.length} titles found
            </h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((m: any) => (
              <Link key={m.id} href={`/movie/${m.id}`} className="group">
                <div className="bg-[#f4f4f5] rounded-xl overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
                  <div className="relative aspect-2/3 w-full">
                    <img
                      src={
                        m.poster_path
                          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                          : "/no-image.png"
                      }
                      alt={m.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <div className="flex items-center gap-1 mb-1 text-[14px]">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="font-bold text-gray-900">
                        {m.vote_average?.toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-[12px]">/10</span>
                    </div>
                    <p className="text-[14px] font-bold text-gray-900 line-clamp-1">
                      {m.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
