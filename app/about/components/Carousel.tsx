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

export const CarouselPlugin = ({ results }: Results) => {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));

  const [modal, setModal] = useState<{
    key: string;
    backdrop: string;
    title: string;
  } | null>(null);

  if (!results) return null;

  const handleWatchTrailer = async (movie: any) => {
    const data = await getMovieVideos(movie.id);

    const trailer = data?.results?.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
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
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {results.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="relative w-full h-[75vh] min-h-[600px]"
            >
              {/* Background image */}
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="absolute inset-0 w-full h-full object-cover"
                alt={movie.original_title}
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

              {/* HERO CONTENT */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl px-6 md:px-12 flex flex-col gap-4">

                  {/* Now Playing */}
                  <p className="text-sm text-gray-300 tracking-wide">
                    Now Playing
                  </p>

                  {/* Title */}
                  <h1 className="text-white text-4xl md:text-5xl font-bold max-w-xl">
                    {movie.original_title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <img src="/Star.png" alt="star" className="w-4 h-4" />
                    <span className="text-white font-semibold">
                      {movie.vote_average.toFixed(1)}
                      <span className="text-gray-400 text-sm"> /10</span>
                    </span>
                  </div>

                  {/* Overview */}
                  <p className="text-gray-200 max-w-lg text-sm leading-relaxed line-clamp-3">
                    {movie.overview}
                  </p>

                  {/* Watch Trailer */}
                  <button
                    onClick={() => handleWatchTrailer(movie)}
                    className="mt-4 w-fit flex items-center gap-2 
                               bg-white text-black px-5 py-2.5 
                               rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    ▶ Watch Trailer
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-6 bg-black/50 text-white hover:bg-black/70" />
        <CarouselNext className="right-6 bg-black/50 text-white hover:bg-black/70" />
      </Carousel>

      {/* === FIGMA STYLE TRAILER MODAL === */}
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
