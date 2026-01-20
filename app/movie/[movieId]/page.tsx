import {
  getMovieDetail,
  getMovieCredits,
  getSimilarMovies,
  getMovieVideos,
} from "@/utils/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
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
  if (!movieId || isNaN(Number(movieId))) {
    notFound();
  }

  const movie = await getMovieDetail(movieId);
  const credits = await getMovieCredits(movieId);
  const similar = await getSimilarMovies(movieId);
  const videos = await getMovieVideos(movieId);

  if (!movie) {
    notFound();
  }

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
    <div className="flex flex-col items-center">
      <Header />

      <div className="w-[1028px] flex flex-col pt-13 pb-28 gap-8">
        {/* TITLE + RATING */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-lg text-gray-400">{movie.release_date}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Rating</p>
            <div className="flex items-center gap-1 text-lg font-semibold">
              ⭐ {movie.vote_average}
              <span className="text-gray-400 font-normal">/10</span>
            </div>
          </div>
        </div>

        {/* POSTER + TRAILER */}
        <div className="grid grid-cols-[290px_1fr] gap-6">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={290}
            height={428}
            className="rounded-xl shadow-lg"
          />

          {trailer && (
            <TrailerPlayer
              trailerKey={trailer.key}
              backdropPath={movie.backdrop_path}
              title={movie.title}
            />
          )}
        </div>

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

          <p className="text-base text-[#09090B]">{movie.overview}</p>

          <div className="flex gap-20">
            <h2 className="font-bold">Director</h2>
            <p>{directors.map((d: any) => d.name).join(", ")}</p>
          </div>
          <hr className="border-gray-300" />

          <div className="flex gap-20">
            <h2 className="font-bold">Writers</h2>
            <p>{writers.map((w: any) => w.name).join(", ")}</p>
          </div>
          <hr className="border-gray-300" />

          <div className="flex gap-20">
            <h2 className="font-bold">Stars</h2>
            <p>
              {stars.map((s: any) => `${s.name} (${s.character})`).join(", ")}
            </p>
          </div>
          <hr className="border-gray-300" />
        </div>

        {/* SIMILAR */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">More like this</h2>

            {/* ✅ ОДОО ЭНЭ LINK 100% АЖИЛЛАНА */}
            <Link
              href={`/movie/${movieId}/similar?page=1`}
              className="flex items-center gap-1 text-sm"
            >
              See more <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {similarResults.slice(0, 5).map((m: any) => (
              <Link key={m.id} href={`/movie/${m.id}`}>
                <div className="rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-[260px]">
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

      <Footer />
    </div>
  );
}
