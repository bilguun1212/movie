"use client";

import { X } from "lucide-react";
import { TrailerPlayer } from "./TrailerPlayer";

type Props = {
  open: boolean;
  onClose: () => void;
  trailerKey: string;
  backdropPath: string;
  title: string;
};

export const TrailerModal = ({
  open,
  onClose,
  trailerKey,
  backdropPath,
  title,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative z-10 w-200 max-w- bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-linear-to-b from-black/80 to-transparent z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-bold text-lg truncate px-2">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="aspect-video w-full">
          <TrailerPlayer
            trailerKey={trailerKey}
            backdropPath={backdropPath}
            title={title}
          />
        </div>
      </div>
    </div>
  );
};
