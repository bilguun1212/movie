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
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative z-10 w-[90vw] max-w-4xl aspect-video">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white"
        >
          <X size={28} />
        </button>

        <TrailerPlayer
          trailerKey={trailerKey}
          backdropPath={backdropPath}
          title={title}
        />
      </div>
    </div>
  );
};
