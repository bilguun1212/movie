"use client";

import * as React from "react";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Results } from "./MovieCard";
import { getMovieVideos } from "@/utils/tmdb";
import { TrailerModal } from "./TrailerModal";

export const CarouselPlugin = ({ results }: { results: Results }) => {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));
  const [modal, setModal] = useState<{
    key: string;
    backdrop: string;
    title: string;
  } | null>(null);

  if (!results || !results.results) return null;

  const movies = results.results;

  const handleWatchTrailer = async (movie: any) => {
    const data = await getMovieVideos(movie.id);
    const trailer = data?.results?.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube",
    );
    if (!trailer?.key) return;

    plugin.current.stop();
    setModal({
      key: trailer.key,
      backdrop: movie.backdrop_path,
      title: movie.original_title,
    });
  };

  return (
    <>
      <Carousel
        className="relative w-full overflow-hidden"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        {/* ml-0 нэмснээр утсан дээр хажуу тийш илүү зай гарахгүй */}
        <CarouselContent className="ml-0">
          {movies.map((movie: any) => (
            <CarouselItem key={movie.id} className="relative w-full pl-0">
              
              {/* --- DESKTOP VIEW (Чиний дизайн) --- */}
              <div className="relative w-full h-[70vh] min-h-125 max-sm:hidden">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={movie.original_title}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="px-20 max-w-xl flex flex-col gap-4 text-white">
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-300">Now Playing</p>
                      <h1 className="text-5xl font-bold">
                        {movie.original_title}
                      </h1>
                      <div className="flex items-center gap-2">
                        ⭐ {movie.vote_average?.toFixed(1) || "0.0"}
                        <span className="text-gray-400 text-sm"> /10</span>
                      </div>
                    </div>
                    <p className="text-gray-200 line-clamp-3">
                      {movie.overview}
                    </p>
                    <button
                      onClick={() => handleWatchTrailer(movie)}
                      className="mt-3 w-fit bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      ▶ Watch Trailer
                    </button>
                  </div>
                </div>
              </div>

              {/* --- MOBILE VIEW (Чиний дизайн) --- */}
              <div className="sm:hidden flex flex-col bg-white">
                <img
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  className="w-full h-60 object-cover"
                  alt={movie.original_title}
                />
                <div className="p-4 flex flex-col gap-3">
                  <p className="text-xs text-gray-500">Now Playing</p>
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">
                    {movie.original_title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm">
                    ⭐ {movie.vote_average?.toFixed(1) || "0.0"}
                    <span className="text-gray-500">/10</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {movie.overview}
                  </p>
                  <button
                    onClick={() => handleWatchTrailer(movie)}
                    className="w-35 mt-2 bg-black text-white py-2 rounded-lg text-sm font-semibold active:scale-95 transition-transform"
                  >
                    ▶ Watch Trailer
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows: Утсан дээр харагдахгүй */}
        <CarouselPrevious className="left-6 bg-black/50 text-white hover:bg-black/70 max-sm:hidden border-none" />
        <CarouselNext className="right-6 bg-black/50 text-white hover:bg-black/70 max-sm:hidden border-none" />
      </Carousel>

      {modal && (
        <TrailerModal
          open
          trailerKey={modal.key}
          backdropPath={modal.backdrop}
          title={modal.title}
          onClose={() => {
            setModal(null);
            plugin.current.reset();
          }}
        />
      )}
    </>
  );
};