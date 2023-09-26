import { useEffect, useState } from "react";
import tmdb from "@/pages/api/tmdb";
import ActionMovieCard from "./ActionMovieCard";
import MovieCard from "./MovieCard";

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const ActionMovieList = (props: any) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        (async () => {
            const response = await tmdb.get('trending/all/week')

            setMovies(response.data.results);
        })()
    }, [])
    console.log("response", movies)
    //className='flex px-4 md:px-12 mt-4 space-y-8' 

    //  className='grid  gap-2'.

    return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar text-md md:text-xl md:px-12 mt-4 mb-4 gap-4">
            {movies.map((card: any, index) => {
                return(
                    <div style={{width:'100%',height:'100%'}}>
                         <ActionMovieCard imageUrl={card.poster_path} />
                    </div>
                )
            })}

    
            </div>
    )
}
export default ActionMovieList;