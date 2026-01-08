

import React from "react"

export interface Movie {
  id: number
  title: string
  rating: number
  poster: string
}

interface Props {
  movie: Movie
}

const MovieCard = ({ movie }: Props) => {
    return (
      
        <div className="w-[260.73px] bg-[#f4f4f5] dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ml-20 mr-20 md:grid-cols-2">
            
           
            <div className="aspect-[2/3] w-[305px] overflow-hidden">
                <img 
                    src={movie.poster}
                    alt={movie.title} 
                    className="w-[260.73px] h-[470px] object-cover transition-transform hover:scale-105 duration-300"
                />
            </div>

          
            <div className="p-3 space-y-1">
              
                <div className="flex items-center gap-1">
                    <span className="text-sm">⭐</span>
                    <p className="text-black dark:text-white text-md font-medium">
                        {movie.rating} <span className="opacity-50 text-[10px]">/10</span>
                    </p>
                </div>

              
                <h3 className="text-xl font-inter text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug">
                    {movie.title}
                </h3>
            </div>
        </div>
    )
}

export default MovieCard


// import image from "next/image"
// import React from "react"

// export interface Movie {
//   id: number
//   title: string
//   rating: number
//   poster: string
// }

// interface Props {
//   movie: Movie
// }

// const MovieCard = ({movie}: Props) => {
//     return (
//         <div className="w-[300.73px] h-[470px] bg-[#f4f4f5] rounded-xl overflow-hidden shadow-2xl">
//             <img 
//             src={movie.poster}
//              alt={movie.title} 
//              className="w-full h-[470px] object-cover"
//              />

//              <div className="p-3">
//                 <p className="text-black text-sm">⭐  {movie.rating} <span className="opacity-50 text-xs">/10</span></p>
//                 <h3 className="text-sm font-medium line-clamp-2">
//                     {movie.title}
//                     </h3>
//              </div>
//         </div>
        
//     )
// }


// export default MovieCard