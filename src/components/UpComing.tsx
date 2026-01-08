

import MovieCard, {Movie} from "./MovieCard";

const movies: Movie[] = [
    {
        id: 1,
        title: "Dear Santa",
        rating: 6.9,
        poster: "/movies/dear-santa.png"
    },
    {
        id: 2,
     title: "How to Train Your Dragon",
     rating: 6.9,
     poster: "/movies/dragon.png",
    },
    {
        id: 3,
        title: "Alien Romulus",
        rating: 6.9,
        poster: "/movies/alien.png",
    },
    {
        id: 4,
        title: "From the Ashes",
        rating: 6.9,
        poster: "/movies/ashes.png",
    },
    {
        id: 5,
        title: "Space Dogg",
        rating: 6.9,
        poster: "/movies/space-dogg.png",
    },
     {
        id: 6,
        title: "The Order",
        rating: 6.9,
        poster: "/movies/order-r.png"
    },
    {
        id: 7,
     title: "Y2K",
     rating: 6.9,
     poster: "/movies/y-2k.png",
    },
    {
        id: 8,
        title: "Solo Leveling",
        rating: 6.9,
        poster: "/movies/solo-leveling.png",
    },
    {
        id: 9,
        title: "Get Away",
        rating: 6.9,
        poster: "/movies/get-away.png",
    },
     {
        id: 10,
        title: "Sonic The Hedgehoc 3",
        rating: 6.9,
        poster: "/movies/sonic-3.png",
    },
    
]

const UpComing = () => {
    return (
        <section className="mx-auto w-screen mt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold ml-18">Upcoming</h2>
                <span className="text-md text-gray-600 mr-18">See More →</span>
            </div>
           
            <div className="flex gap-8 flex-wrap justify-between items-center">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
                
            </div>
            
            
        </section>
    )
};





export default UpComing