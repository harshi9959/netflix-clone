const getPostURl = (posterpath:any)=> {
    console.log(posterpath)
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath.imageUrl}`
    // return 'https://www.themoviedb.org/t/p/w440_and_h660_face/hw2vi8agaJZ7oeSvS8uEYgOtK32.jpg'
}

const ComedyMovieCard = ( poster_path:any ) => {
    return (
        <div style={{width: '150px'}} >
            <img style={{borderRadius:'10px'  }} 
                src={getPostURl(poster_path)} alt="posterUrl" />
        </div>
    )
}

export default ComedyMovieCard;
