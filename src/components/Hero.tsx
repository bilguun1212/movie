

import { useState, useEffect } from 'react';

const MOVIES = [
  
     {
        id: 1,
        title: "Robin Hood",
        rating: "7.0",
        description: "A war-hardened Crusader and a Moorish commander mount an audacious revolt against the corrupt English crown. Returning to find his home in ruins, Robin of Loxley becomes 'The Hood,' leading a gritty, high-speed rebellion to reclaim justice for the oppressed.",
        image: "movie.jpg"
    },
     {
        id: 2,
        title: "Stranger Things 5 ",
        rating: "8.9",
        description: "Hawkins will fall, or a hero will rise. As the Upside Down consumes the world, Eleven and the gang must reunite for one final, desperate mission to destroy Vecna. The gate is open, the clock is ticking, and the end is here.",
        image: "stranger.jpg"
    },
     {
        id: 3,
        title: "Avatar Fire and Ash",
        rating: "7.2",
        description: "After surviving the battle against the Sky People, Jake Sully and Neytiri face a new, darker threat from within Pandora itself. To protect their world, they must encounter the 'Ash People'—a fierce, aggressive Na'vi clan consumed by hatred and fire. In a world scarred by war, the line between hero and villain blurs as the very elements of Pandora turn to ash.",
        image: "avatar.jpg"
    },
     {
        id: 4,
        title: "Demon Slayer: Kimetsu No Yaiba",
        rating: "9.2",
        description: "The final hunt begins. Trapped inside the endless maze of the Infinity Castle, Tanjiro and the Hashira must face Muzan Kibutsuji in a desperate struggle for survival. No more running. No more hiding. Only the steel of the blade will decide the fate of mankind.",
        image: "kimetsu.jpg"
    }
  
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === MOVIES.length - 1 ? 0 : prev + 1));
        }, 2000);
        return () => clearInterval(timer);
    }, []);
    return (
        <section className="relative w-full h-[100svh] md:h-[800px] lg:h-[900px] overflow-hidden lg:rounded-xl">
          
            <div className="absolute inset-0">
                <img 
                    src={MOVIES[currentIndex].image}    
                    alt={MOVIES[currentIndex].title} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 scale-105"
                />
              
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/100 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/20 md:to-transparent" />
            </div>

          
            <div className="relative z-10 h-full flex items-end md:items-center px-6 sm:px-12 md:px-20 lg:ml-20">
                <div className="max-w-xl text-white space-y-4 mb-16 md:mb-0">
                    <div className="space-y-2">
                        <p className="text-sm md:text-lg font-light opacity-80 uppercase tracking-[0.2em]">Now Playing</p>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                            {MOVIES[currentIndex].title}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-3 text-lg md:text-xl font-medium">
                        <span className="text-yellow-400">⭐ {MOVIES[currentIndex].rating}</span>
                        <span className="opacity-50 text-base md:text-lg">/ 10</span>
                    </div>

                    <p className="text-sm font-light sm:text-base md:text-lg opacity-90 leading-relaxed max-w-md line-clamp-3 md:line-clamp-none">
                        {MOVIES[currentIndex].description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                            <span className="text-xl">▶</span> Watch Trailer
                        </button>
                    
                    </div>
                </div>
            </div>

           
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-20 md:translate-x-0 flex space-x-3 z-20">
                {MOVIES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${
                            index === currentIndex ? "w-10 bg-white" : "w-5 bg-white/30 hover:bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

export default Hero;