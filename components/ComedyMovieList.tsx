import { useEffect, useState } from "react";
import tmdb from "@/pages/api/tmdb";
import ComedyMovieCard from "./ComedyMovieCard";
import MovieCard from "./MovieCard";

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const ComedyMovieList = (props: any) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        (async () => {
            const response = await tmdb.get('tv/popular')

            setMovies(response.data.results);
        })()
    }, [])
    console.log("response", movies)

    return (
        <div className="flex flex-nowrap overflow-x-scroll no-scrollbar text-md md:text-xl md:px-12 mt-4 mb-4 gap-4" >
         
            {movies.map((card: any, index) => {
                return(
                    <div style={{width:'100%',height:'100%'}}>
                         <ComedyMovieCard imageUrl={card.poster_path} />
                    </div>
                )
            })}

    

    </div>)

}
export default ComedyMovieList;