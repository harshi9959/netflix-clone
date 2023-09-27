import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/navbar';
import Billboard from '@/components/billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import ActionMovieList from '../../components/ActionMovieList';
import HorrorMovieList from '@/components/HorrorMovieList';
import ComedyMovieList from '@/components/ComedyMovieList';
import RomanceMovieList from '@/components/RomanceMovieList';
import InfoModal from '@/components/infoModal';
import useInfoModal from '@/hooks/useInfoModal';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();


  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}  />
      <Navbar />
      <Billboard />

      <div className='gap-1' >
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
      <div className=' pb-40 '>
        <p className=' text-white font-semibold text-2xl ml-12'>Action Movies  </p>
        < ActionMovieList title="Action Movies" data={movies} />
      {/* <div className="row">
        <h2> Action Movies </h2>
        <div className="row__posters flex" > 

            <img className="" style={{height:"100px" , width:"100px"}} src="https://image.tmdb.org/t/p/original//8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg" />
              <img className="" style={{height:"100px" , width:"100px"}} src="https://image.tmdb.org/t/p/original//c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg" />
                <img className="" style={{height:"100px" , width:"100px"}} src="https://image.tmdb.org/t/p/original//H6j5smdpRqP9a8UnhWp6zfl0SC.jpg" />
                  <img className="" style={{height:"100px" , width:"100px"}} src="https://image.tmdb.org/t/p/original//9m161GawbY3cWxe6txd1NOHTjd0.jpg" />
                                              
                </div>
                                         </div> */}


      {/* <div className='pb-40 '> */}
      <p className='text-white font-semibold text-2xl ml-12'>Comedy Movies  </p>
        < ComedyMovieList title="Comedy Movies" data={movies} />
      {/* </div> */}
      {/* <div className='pb-40'> */}
      <p className='text-white font-semibold text-2xl ml-12'>Horror Movies  </p>
        < HorrorMovieList title="Horror Movies" data={movies} />
      {/* </div> */}
      {/* <div className='pb-40'> */}
      <p className='text-white font-semibold text-2xl ml-12'>Romance Movies  </p>
        < RomanceMovieList title="Romance Movies" data={movies} />
      </div>
    </div>
    </>
  )
}
