const getPostURl = (posterpath:any)=> {
    console.log(posterpath)
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath.imageUrl}`

    return 'https://www.themoviedb.org/t/p/w440_and_h660_face/kdPMUMJzyYAc4roD52qavX0nLIC.jpg'
}

const HorrorMovieCard = ( poster_path:any ) => {
    return (
        <div style={{width: '150px'}} >
            <img style={{borderRadius:'10px'  }} 
                src={getPostURl(poster_path)} alt="posterUrl" />
        </div>
    )
    //  <div className='group bg-zinc-900 col-span relative h-[12vw]'>
    // //     <img
    //             className='
    //     cursor-pointer
    //     object-center
    //     transition
    //     duration
    //     shadow-xl
    //     rounded-md
    //     group-hover:opacity-90
    //     sm:group-hover:opacity-0
    //     delay-300
    //     w-full
    //     h-full
    //     '
    //             src={getPostURl(poster_path)} alt="posterUrl" />
    //         <div
    //             className='
    //     opacity-0
    //     absolute
    //     top-0
    //     transition
    //     duration-200
    //     z-10
    //     invisible
    //     sm:visible
    //     delay-300
    //     w-full
    //     scale-0
    //     group-hover:scale-110
    //     group-hover:-translate-y-[6vw]
    //     group-hover:translate-x-[2vw]
    //     group-hover:opacity-100
    //     '
    //         >
    //             <img className='
    //       cursor-pointer
    //       object-center
    //       transition
    //       duration
    //       shadow-xl
    //       rounded-t-md
    //       w-full
    //       h-full
    //       '
    //                 src={getPostURl(poster_path)} alt="posterUrl" />
                {/* <div
                    className='
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          '
                >
                </div> */}
            }

export default HorrorMovieCard;
