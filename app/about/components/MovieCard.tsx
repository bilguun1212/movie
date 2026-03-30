"use client";

import { useEffect, useState } from "react";
import { CarouselPlugin } from "./Carousel";
import { Upcoming } from "./Upcoming";


export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  interval?: number;
  genreId?: number;
};

export type Results = {
  results: Movie[];
  total_pages?: number; 
};

const TMDB_BASE_URL = "https://api.themoviedb.org/3";


const movieApi = async (
  category: string,
  genreId?: number,
): Promise<Results> => {

  const url = genreId
    ? `${TMDB_BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=1`
    : `${TMDB_BASE_URL}/movie/${category}?language=en-US&page=1`;

  const res = await fetch(url, {
    headers: {
 
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("API Error Status:", res.status);
    return { results: [] };
  }

  return res.json();
};

export const MovieCard = ({ genreId }: { genreId?: number }) => {
  const [upcomingMovie, setUpcomingMovie] = useState<Movie[]>([]);
  const [popularMovie, setPopularMovie] = useState<Movie[]>([]);
  const [topRatedMovie, setTopRatedMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
    
        const [upcomingData, popularData, topRatedData] = await Promise.all([
          movieApi("upcoming", genreId),
          movieApi("popular", genreId),
          movieApi("top_rated", genreId),
        ]);

        setUpcomingMovie(upcomingData.results || []);
        setPopularMovie(popularData.results || []);
        setTopRatedMovie(topRatedData.results || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreId]);

  if (loading) return <div className="p-20 text-center">Loading movies...</div>;

  return (
    <div className="flex justify-center flex-col items-center w-full">
  
      <CarouselPlugin results={{ results: popularMovie, total_pages: 1 }} />

      <div className="p-5 md:px-20 mb-12 gap-8 flex justify-center items-center flex-col w-full">

        <Upcoming
          title="Upcoming"
          movieResults={upcomingMovie}
          category="upcoming"
        />

        <Upcoming
          title="Popular"
          movieResults={popularMovie}
          category="popular"
        />

        <Upcoming
          title="Top Rated"
          movieResults={topRatedMovie}
          category="top_rated"
        />
      </div>
    </div>
  );
};

export default MovieCard;