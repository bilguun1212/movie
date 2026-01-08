

import { useState, useEffect } from 'react';


interface Movie {
    id: number;
    title: string;
}

const GENRES = ["Action", "Drama", "Comedy", "Fantasy", "Animation", "Horror", "Sci-Fi", "Adventure", "Biography", "Crime", "Documentary", "Drama", "Family", "Film-Noir", "Game-Show", "Histoy", "Music", "Musical", "Mystery", "News", "Reality-TV", "Romance", "Short", "Sport", "Talk-Show", "Thriller", "War", "Western"];

const Hero2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [results, setResults] = useState<Movie[]>([]); 
    const [history, setHistory] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        setHistory(savedHistory);
    }, []);

    useEffect(() => {
        if (searchTerm.length > 0) {
            const fetchMovies = async () => {
                try {
                    const API_KEY = "YOUR_TMDB_API_KEY"; 
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
                    );
                    const data = await response.json();
                    setResults(data.results?.slice(0, 5) || []);
                } catch (error) {
                
                    const mockMovies: Movie[] = [
                        { id: 1, title: "Robin Hood" },
                        { id: 2, title: "Stranger Things 5" },
                        { id: 3, title: "Avatar Fire and Ash" }
                    ].filter(m => m.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
                    setResults(mockMovies);
                }
            };
            fetchMovies();
            setShowResults(true);
        } else {
            setResults([]);
            setShowResults(false);
        }
    }, [searchTerm]);

    const handleSearchClick = (title: string) => {
        if (!history.includes(title)) {
            const newHistory = [title, ...history].slice(0, 5);
            setHistory(newHistory);
            localStorage.setItem("searchHistory", JSON.stringify(newHistory));
        }
        setSearchTerm(title);
        setShowResults(false);
    };

    return (
              <div className="relative z-50 flex flex-wrap md:flex-nowrap items-center justify-between px-4 md:px-16 py-4 pt-6 md:pt-10 text-white gap-4">
    
            <div className="flex items-center gap-2 font-bold cursor-pointer">
                <img className="w-5 h-5 md:w-6 md:h-6 object-contain" src="vector.png" alt="Logo" />
                <span className="text-indigo-600 text-lg md:text-2xl font-black tracking-tighter">Movie Z</span>
            </div>

       
            <div className="flex flex-1 items-center justify-end gap-2 md:gap-4 order-3 md:order-2 w-full md:w-auto">
                <div className="flex items-center gap-2 w-full md:w-auto">
         
                    <div className="relative">
                        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 bg-white text-black px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold shadow-2xl">
                            Genre <span className={isOpen ? 'rotate-180' : ''}>▼</span>
                        </button>
                        {isOpen && (
                            <div className="absolute top-[120%] left-0 w-[280px] md:w-[400px] bg-white text-black rounded-2xl shadow-2xl p-6 z-[60]">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {GENRES.map(g => (
                                        <div key={g} className="px-3 py-2 hover:bg-indigo-600 hover:text-white rounded-xl cursor-pointer text-xs transition-all">
                                            {g}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

             
                    <div className="flex-1 md:flex-none relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setShowResults(true)}
                            placeholder="Search..." 
                            className="pl-10 pr-4 py-2.5 w-full md:w-[300px] text-xs md:text-sm text-black outline-none bg-white rounded-lg shadow-xl border border-gray-200"
                        />

                
                        {showResults && (searchTerm || history.length > 0) && (
                            <div className="absolute top-[110%] left-0 w-full bg-white text-black rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-[70]">
                           
                                {results.length > 0 && (
                                    <div className="p-2 border-b">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 px-3 mb-1">Movies</p>
                                        {results.map(movie => (
                                            <div 
                                                key={movie.id} 
                                                onClick={() => handleSearchClick(movie.title)}
                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm rounded-lg flex items-center gap-2"
                                            >
                                                <span>🔍</span> {movie.title}
                                            </div>
                                        ))}
                                    </div>
                                )}

                        
                                {history.length > 0 && (
                                    <div className="p-2">
                                        <div className="flex justify-between px-3 mb-1">
                                            <p className="text-[10px] uppercase font-bold text-gray-400">Recent Searches</p>
                                            <button onClick={() => {setHistory([]); localStorage.removeItem("searchHistory")}} className="text-[10px] text-red-500 hover:underline">Clear</button>
                                        </div>
                                        {history.map((h, i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => setSearchTerm(h)}
                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-600 rounded-lg flex items-center gap-2"
                                            >
                                                <span className="opacity-50">🕒</span> {h}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

   
            <div className="order-2 md:order-3 p-2.5 bg-white text-black rounded-lg cursor-pointer hover:bg-gray-100 shadow-xl border border-gray-200">
                <img src="sar.png" alt="Toggle" className="w-5 h-5" />
            </div>

    
            {(isOpen || showResults) && <div className="fixed inset-0 z-[45]" onClick={() => {setIsOpen(false); setShowResults(false)}} />}
        </div>   
    );
};
export default Hero2;