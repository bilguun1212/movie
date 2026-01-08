import MovieCard, {Movie} from "./MovieCard";


const movies: Movie[] = [
     {
        id: 1,
        title: "Pulp Fiction",
        rating: 6.9,
        poster: "/movies/pulp.png"
    },
    {
        id: 2,
     title: "The Lord of the Rings: Fellowship of the Kings",
     rating: 6.9,
     poster: "/movies/lord-ring.png",
    },
    {
        id: 3,
        title: "The Good, the Bad and the Ugly",
        rating: 6.9,
        poster: "/movies/guud-bad.png",
    },
    {
        id: 4,
        title: "Forrest Gump",
        rating: 6.9,
        poster: "/movies/forrest-gump.png",
    },
    {
        id: 5,
        title: "Fight Club",
        rating: 6.9,
        poster: "/movies/fight-club.png",
    },
     {
        id: 6,
        title: "Savin Private Ryan",
        rating: 6.9,
        poster: "/movies/saving.png"
    },
    {
        id: 7,
     title: "City of God",
     rating: 6.9,
     poster: "/movies/city-of-god.png",
    },
    {
        id: 8,
        title: "The Green Mile",
        rating: 6.9,
        poster: "/movies/green-mile.png",
    },
    {
        id: 9,
        title: "Life is Beautiful",
        rating: 6.9,
        poster: "/movies/beautiful.png",
    },
     {
        id: 10,
        title: "Terminator 2: Judgement Day",
        rating: 6.9,
        poster: "/movies/ter-minii-namtar.png",
    },
    
]

const TopRated = () => {
    return (
        <section className="mx-auto w-screen mt-12 mb-20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold ml-18">Top Rated</h2>
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





export default TopRated