import MovieCard, {Movie} from "./MovieCard";


const movies: Movie[] = [
    
   
     {
        id: 11,
        title: "The Shawshank Redemption",
        rating: 6.9,
        poster: "/movies/the-shawshank.png"
    },
    {
        id: 12,
     title: "The GodFather",
     rating: 6.9,
     poster: "/movies/god-father.png",
    },
    {
        id: 13,
        title: "The Dark Knight",
        rating: 6.9,
        poster: "/movies/dark-knight.png",
    },
    {
        id: 14,
        title: "12 Angry Men",
        rating: 6.9,
        poster: "/movies/12-angryman.png",
    },
    {
        id: 15,
        title: "The Lord of the Rings: The  Return of the King",
        rating: 6.9,
        poster: "/movies/the-hobit.png",
    },
     {
        id: 16,
        title: "Internstellar",
        rating: 6.9,
        poster: "/movies/internstellar.png"
    },
    {
        id: 17,
     title: "Se7en",
     rating: 6.9,
     poster: "/movies/seven.png",
    },
    {
        id: 18,
        title: "It's a Wonderful Life",
        rating: 6.9,
        poster: "/movies/wonderful-life.png",
    },
    {
        id: 19,
        title: "Seven Samurai",
        rating: 6.9,
        poster: "/movies/seven-samurai.png",
    },
    {
        id: 20,
        title: "The Silence Of The Lambs",
        rating: 6.9,
        poster: "/movies/silence.png",
    },
]
const Popular = () => {
    return (
        <section className="mx-auto w-screen mt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold ml-18">Popular</h2>
                <span className="text-md text-gray-600 mr-18">See More →</span>
            </div>
           
            <div className="flex gap-8 flex-wrap justify-between">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
                
            </div>
            
            
        </section>
    )
};

export default Popular
