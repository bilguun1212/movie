"use client";

import { Play } from "lucide-react";
import { useEffect, useState } from "react";

export const TrailerPlayer = ({
  trailerKey,
  backdropPath,
  title,
}: {
  trailerKey: string;
  backdropPath: string;
  title: string;
}) => {
  const [play, setPlay] = useState(false);

  // 🔥 trailer солигдох бүрт reset
  useEffect(() => {
    setPlay(false);
  }, [trailerKey]);

  return (
    <div
      className="relative aspect-video w-full h-full rounded-2xl overflow-hidden 
                 cursor-pointer group shadow-lg transition-all duration-500"
    >
      {!play ? (
        <>
          {/* Backdrop */}
          <img
            src={`https://image.tmdb.org/t/p/original${backdropPath}`}
            alt={title}
            className="w-full h-full object-cover scale-100 
                       group-hover:scale-105 transition-transform duration-700"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t 
                          from-black/70 via-black/30 to-transparent"
          />

          {/* Center play button */}
          <div
            onClick={() => setPlay(true)}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-16 h-16 rounded-full bg-white/90 backdrop-blur 
                         flex items-center justify-center
                         group-hover:scale-110 transition-transform duration-300"
            >
              <Play className="text-black ml-0.5" size={28} />
            </div>
          </div>

          {/* Bottom title */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-lg font-semibold drop-shadow">
              Watch Trailer
            </h3>
            <p className="text-white/70 text-sm truncate">{title}</p>
          </div>
        </>
      ) : (
        <iframe
          key={trailerKey} // 🔥 iframe reset
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
};
