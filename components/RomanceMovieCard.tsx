const getPostURl = (posterpath:any)=> {
    console.log(posterpath)
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath.imageUrl}`
    // return 'https://www.themoviedb.org/t/p/w440_and_h660_face/w46Vw536HwNnEzOa7J24YH9DPRS.jpg'
}

const RomanceMovieCard = ( poster_path:any ) => {
    return (
        <div style={{width: '150px'}} >
            <img style={{borderRadius:'16px', minWidth:'100%', height:'auto'  }} 
                src={getPostURl(poster_path)} alt="posterUrl" />
         </div>
    )
}

export default RomanceMovieCard;
