import { useEffect, useState } from "react";
import tmdb from "@/pages/api/tmdb";
import RomanceMovieCard from "./RomanceMovieCard";
import MovieCard from "./MovieCard";

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const RomanceMovieList = (props: any) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        (async () => {
            const response = await tmdb.get('tv/popular')

            setMovies(response.data.results);
        })()
    }, [])
    console.log("response", movies)

    return (<div className="flex flex-nowrap overflow-x-scroll no-scrollbar text-md md:text-xl md:px-12 mt-4 mb-4 gap-4">
         
            {movies.map((card: any, index) => {
                return(
                    <div  >
                         <RomanceMovieCard imageUrl={card.poster_path} />
                    </div>
                )
            })}

    

    </div>)

}
export default RomanceMovieList;