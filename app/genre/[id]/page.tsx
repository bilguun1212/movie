"use client";

import { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import GenreList from "@/app/about/components/GenreList";
import Image from "next/image";
import { useParams } from "next/navigation";
import { discoverMovies, getGenres } from "@/utils/tmdb";

// import { GenreList } from "@/app/about/components/GenreList"

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type Genre = {
  id: number;
  name: string;
};

export default function GenrePage() {
  const params = useParams();
  const genreId = Number(params?.id);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreName, setGenreName] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!genreId) return;

    getGenres().then((data) => {
      const genre = data.genres.find((g: Genre) => g.id === genreId);
      setGenreName(genre?.name || "");
    });
  }, [genreId]);

  useEffect(() => {
    if (!genreId) return;

    discoverMovies(genreId, page).then((data) => {
      if (data?.results) setMovies(data.results);
    });
  }, [genreId, page]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1 pl-88">Search filter</h2>
      <div className="container mx-auto py-8 grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <h2 className="text-lg font-semibold mb-1">Genres</h2>
          <p className="text-sm text-gray-500 mb-4">
            See lists of movies by genre
          </p>
          <div className="">
            <GenreList />
          </div>
        </div>

        <div className="col-span-9">
          <h1 className="text-2xl font-semibold mb-6">
            {movies.length} titles in “{genreName}”
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="group bg-white rounded-xl  overflow-hidden hover:shadow-md transition"
              >
                {/* Poster */}
                {movie.poster_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full object-cover"
                  />
                )}

                {/* Info */}
                <div className="p-3 bg-gray-300">
                  {/* ⭐ Rating */}
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-400">/10</span>
                  </div>

                  {/* Title */}
                  <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                    {movie.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ===== Pagination =====
          <div className="flex justify-center items-center gap-2 mt-10 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-3 py-1 border rounded bg-black text-white">
              {page}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
