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

  useEffect(() => {
    setPlay(false);
  }, [trailerKey]);

  return (
    <div className="relative  w-full h-full rounded-2xl  bg-black shadow-lg">
      {!play ? (
        <div onClick={() => setPlay(true)} className="w-full h-full">
          <img
            src={`https://image.tmdb.org/t/p/original${backdropPath}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
          />

          <div className="absolute inset-0  from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play className="text-black ml-0.5" size={16} />
            </div>

            <div className="flex  gap-2 text-white">
              <span className="text-[16px] font-bold ">Play trailer</span>
              <span className="text-[14px] text-white flex items-center">
                2:35
              </span>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          key={trailerKey}
          className="w-full h-full border-none"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
};
