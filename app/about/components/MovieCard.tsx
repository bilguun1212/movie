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
};

export type movieCategory = "popular" | "upcoming" | "top_rated";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const movieApi = async (
  category: string,
  genreId?: number,
): Promise<Results> => {
  const url = genreId
    ? `${TMDB_BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`
    : `${TMDB_BASE_URL}/movie/${category}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const MovieCard = ({ genreId }: { genreId?: number }) => {
  const [upcomingMovie, setUpcomingMovie] = useState<Movie[]>([]);
  const [popularMovie, setPopularMovie] = useState<Movie[]>([]);
  const [topRatedMovie, setTopRatedMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const upcomingData = await movieApi("upcoming", genreId);
      const popularData = await movieApi("popular", genreId);
      const topRatedData = await movieApi("top_rated", genreId);

      setUpcomingMovie(upcomingData.results);
      setPopularMovie(popularData.results);
      setTopRatedMovie(topRatedData.results);
    };

    fetchData();
  }, [genreId]);

  return (
    <div className="flex justify-center flex-col items-center w-full">
      <CarouselPlugin results={popularMovie} />
      <div className="p-5 md:px-20 mb-12.5 gap-8 flex justify-center items-center flex-col w-full">
        {/* Upcoming Section */}
        <Upcoming
          title="Upcoming"
          movieResults={upcomingMovie}
          category="upcoming"
        />

        {/* Popular Section */}
        <Upcoming
          title="Popular"
          movieResults={popularMovie}
          category="popular"
        />

        {/* TopRated Section */}
        <Upcoming
          title="TopRated"
          movieResults={topRatedMovie}
          category="top_rated"
        />
      </div>
    </div>
  );
};
