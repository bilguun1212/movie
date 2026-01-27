import {
  getMovieDetail,
  getMovieCredits,
  getSimilarMovies,
  getMovieVideos,
} from "@/utils/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrailerPlayer } from "@/app/about/components/TrailerPlayer";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  if (!movieId || isNaN(Number(movieId))) notFound();

  const movie = await getMovieDetail(movieId);
  const credits = await getMovieCredits(movieId);
  const similar = await getSimilarMovies(movieId);
  const videos = await getMovieVideos(movieId);

  if (!movie) notFound();

  const genres = movie.genres ?? [];
  const crew = credits?.crew ?? [];
  const cast = credits?.cast ?? [];
  const similarResults = similar?.results ?? [];

  const directors = crew.filter((c: any) => c.job === "Director");
  const writers = crew.filter((c: any) =>
    ["Writer", "Screenplay", "Story"].includes(c.job),
  );
  const stars = cast.slice(0, 5);

  const videoResults = videos?.results ?? [];
  const trailer =
    videoResults.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube",
    ) ||
    videoResults.find((v: any) => v.type === "Teaser" && v.site === "YouTube");

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-[1028px] flex flex-col gap-8 py-10 md:py-16">
        {/* TITLE + RATING (UNCHANGED DESKTOP) */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <div>
            <h1 className="text-xl md:text-4xl font-bold">{movie.title}</h1>
            <p className="text-sm md:text-lg text-gray-400">
              {movie.release_date}
            </p>

            <div className="flex items-center gap-1 mt-2 font-semibold md:hidden">
              <span className="text-yellow-400">★</span>
              {movie.vote_average.toFixed(1)}
              <span className="text-gray-400 font-normal text-sm">/10</span>
            </div>
          </div>

          <div className="hidden md:block md:text-right">
            <p className="text-xs text-gray-500">Rating</p>
            <div className="flex md:justify-end items-center gap-1 text-lg font-semibold">
              ⭐ {movie.vote_average.toFixed(1)}
              <span className="text-gray-400 font-normal">/10</span>
            </div>
          </div>
        </div>

        {/* 🎬 TRAILER — MOBILE TOP */}
        {trailer && (
          <div className="md:hidden">
            <TrailerPlayer
              trailerKey={trailer.key}
              backdropPath={movie.backdrop_path}
              title={movie.title}
            />
          </div>
        )}

        {/* POSTER + TRAILER DESKTOP / POSTER + INFO MOBILE */}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-[280px_1fr]">
          {/* POSTER + MOBILE INFO */}
          <div className="flex gap-4 md:block">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="w-28 sm:w-36 md:w-[280px] rounded-2xl shadow-md object-cover"
            />

            {/* MOBILE INFO SIDE */}
            <div className="flex-1 md:hidden space-y-2 text-sm">
              <div className="flex gap-2 flex-wrap">
                {genres.map((g: any) => (
                  <Badge key={g.id} className="text-xs px-2 py-1">
                    {g.name}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-500 line-clamp-4">{movie.overview}</p>
            </div>
          </div>

          {/* 🎬 TRAILER — DESKTOP RIGHT */}
          {trailer && (
            <div className="hidden md:block">
              <TrailerPlayer
                trailerKey={trailer.key}
                backdropPath={movie.backdrop_path}
                title={movie.title}
              />
            </div>
          )}
        </div>

        {/* DESKTOP INFO SECTION */}
        <div className="space-y-4 hidden md:block">
          <div className="flex gap-2 flex-wrap">
            {genres.map((g: any) => (
              <Badge
                key={g.id}
                className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs"
              >
                {g.name}
              </Badge>
            ))}
          </div>

          <p className="text-sm md:text-base text-[#09090B]">
            {movie.overview}
          </p>

          <InfoRow title="Director">
            {directors.map((d: any) => d.name).join(", ")}
          </InfoRow>

          <InfoRow title="Writers">
            {writers.map((w: any) => w.name).join(", ")}
          </InfoRow>

          <InfoRow title="Stars">
            {stars.map((s: any) => `${s.name} (${s.character})`).join(", ")}
          </InfoRow>
        </div>

        {/* 🍿 SIMILAR */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-2xl font-semibold">
              More like this
            </h2>
            <Link
              href={`/movie/${movieId}/similar?page=1`}
              className="flex items-center gap-1 text-sm"
            >
              See more <ArrowRight size={16} />
            </Link>
          </div>

          {/* MOBILE GRID */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {similarResults.slice(0, 6).map((m: any) => (
              <Link key={m.id} href={`/movie/${m.id}`}>
                <div className="relative aspect-[100/148] rounded-xl overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                    alt={m.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm mt-2 font-medium line-clamp-1">
                  {m.title}
                </p>
              </Link>
            ))}
          </div>

          {/* DESKTOP GRID (UNCHANGED) */}
          <div className="hidden md:grid grid-cols-5 gap-4">
            {similarResults.slice(0, 5).map((m: any) => (
              <Link key={m.id} href={`/movie/${m.id}`}>
                <div className="rounded-lg shadow-md overflow-hidden">
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                      alt={m.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2 bg-gray-100">
                    <p className="text-sm font-medium truncate">{m.title}</p>
                    <p className="text-xs text-gray-500">
                      ⭐ {m.vote_average.toFixed(1)}/10
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

/* INFO ROW */
const InfoRow = ({ title, children }: any) => (
  <div className="border-b pb-3">
    <p className="font-semibold text-sm">{title}</p>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
);
