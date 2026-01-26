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
        {/* TITLE + RATING */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{movie.title}</h1>
            <p className="text-sm md:text-lg text-gray-400">
              {movie.release_date}
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-xs text-gray-500">Rating</p>
            <div className="flex md:justify-end items-center gap-1 text-lg font-semibold">
              ⭐ {movie.vote_average}
              <span className="text-gray-400 font-normal">/10</span>
            </div>
          </div>
        </div>

        {/* 🎬 TRAILER – ДЭЭР НЬ */}
        {trailer && (
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <TrailerPlayer
              trailerKey={trailer.key}
              backdropPath={movie.backdrop_path}
              title={movie.title}
            />
          </div>
        )}

        {/* POSTER + INFO */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          {/* POSTER */}
          <div className="mx-auto md:mx-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={280}
              height={420}
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* INFO */}
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {genres.map((g: any) => (
                <Badge
                  key={g.id}
                  className="px-3 py-1 rounded-full border bg-white"
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
        </div>

        {/* SIMILAR */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold">
              More like this
            </h2>

            <Link
              href={`/movie/${movieId}/similar?page=1`}
              className="flex items-center gap-1 text-sm"
            >
              See more <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
                      ⭐ {m.vote_average}/10
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

/* 🔹 reusable info row */
const InfoRow = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <>
    <div className="flex flex-col md:flex-row md:gap-20 gap-1">
      <h2 className="font-bold min-w-[90px]">{title}</h2>
      <p className="text-sm md:text-base">{children}</p>
    </div>
    <hr className="border-gray-300" />
  </>
);
