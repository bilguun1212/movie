import { searchMovies } from "@/utils/tmdb";
import Link from "next/link";
import { Star } from "lucide-react";
import GenreList from "@/app/about/components/GenreList";

export default async function SearchResultPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const query = decodeURIComponent(params.id);

  const data = await searchMovies(query);

  const movieResults = (data?.results || []).slice(0, 5);

  return (
    <div className="max-w-300 mx-auto px-4 py-10 min-h-screen">
      <div>
        <h1 className="text-[32px] font-bold text-black tracking-tighter leading-tight mb-10">
          Search Results
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-1">
        <div className="flex gap-6 flex-col">
          <p className="text-[18px] font-semibold text-[#09090B] mt-1">
            {movieResults.length} results for "{query}"
          </p>
          <div className="flex-1 w-full">
            {movieResults.length === 0 ? (
              <div className="py-20 text-center text-gray-400 italic">
                No results found.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
                {movieResults.map((m: any) => {
                  const posterUrl = m.poster_path
                    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                    : "/no-poster.png";

                  return (
                    <Link key={m.id} href={`/movie/${m.id}`} className="group">
                      <div className="bg-[#f4f4f5] rounded-xl overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
                        <div className="relative aspect-2/3 w-full bg-gray-200 overflow-hidden">
                          <img
                            src={posterUrl}
                            alt={m.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3">
                          <div className="flex items-center gap-1 mb-1">
                            <Star
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />
                            <span className="text-[14px] font-bold text-gray-900">
                              {m.vote_average?.toFixed(1) || "0.0"}
                            </span>
                            <span className="text-[12px] text-gray-400 font-normal">
                              /10
                            </span>
                          </div>
                          <p className="text-[14px] font-bold text-gray-900 line-clamp-1">
                            {m.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:block w-px bg-[#E4E4E7] self-stretch mx-12" />
        <div className="w-full md:w-87.5 shrink-0 mt-10 md:mt-0">
          <div className="sticky top-10">
            <h2 className="text-[24px] font-bold text-black mb-1 leading-none">
              Search by genre
            </h2>
            <p className="text-[#71717A] text-[16px] mb-6 font-medium">
              See lists of movies by genre
            </p>
            <div className="flex flex-wrap gap-2">
              <GenreList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
