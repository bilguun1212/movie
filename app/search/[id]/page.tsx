import { searchMovies } from "@/utils/tmdb";
import Link from "next/link";
import { Star } from "lucide-react";
import GenreList from "@/app/about/components/GenreList";
import { DynamicPagination } from "@/app/_components/DynamicPagination";

export default async function SearchResultPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const query = decodeURIComponent(params.id);

  const data = await searchMovies(query);
  const movieResults = (data?.results || []).slice(0, 5);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 min-h-screen">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-black tracking-tight leading-tight">
          Search results
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-start">
        <div className="flex-1 w-full">
          <p className="text-[18px] font-semibold text-black mb-8">
            {movieResults.length} results for "{query}"
          </p>

          {movieResults.length === 0 ? (
            <div className="py-20 text-[#71717A]">No results found.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
              {movieResults.map((m: any) => {
                const posterUrl = m.poster_path
                  ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                  : "/no-poster.png";

                return (
                  <Link key={m.id} href={`/movie/${m.id}`} className="group">
                    <div className="flex flex-col ">
                      <div className="relative aspect-[2/3] w-full bg-[#F4F4F5] rounded-t-xl overflow-hidden">
                        <img
                          src={posterUrl}
                          alt={m.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col bg-[#f4f4f5] rounded-b-xl">
                        <div className="flex items-center gap-1 mb-1">
                          <Star
                            size={14}
                            className="fill-[#FACC15] text-[#FACC15]"
                          />
                          <span className="text-[14px] font-bold text-black">
                            {m.vote_average?.toFixed(1) || "0.0"}
                          </span>
                          <span className="text-[12px] text-[#71717A]">
                            /10
                          </span>
                        </div>
                        <p className="text-[16px] font-medium text-black line-clamp-1">
                          {m.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <div>
            <DynamicPagination totalPage={movieResults.total_pages} />
          </div>
        </div>

        <div className="hidden md:block w-px bg-[#E4E4E7] self-stretch mx-8 lg:mx-12" />

        <div className="w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
          <h2 className="text-[24px] font-bold text-black mb-1">
            Search by genre
          </h2>
          <p className="text-[#71717A] text-[16px] mb-6 font-medium">
            See lists of movies by genre
          </p>
          <div className="flex font-semibold flex-wrap gap-2">
            <GenreList />
          </div>
        </div>
      </div>
    </div>
  );
}
