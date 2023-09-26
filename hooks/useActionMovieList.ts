import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useActionMovieList = () => {
  const { data, error, isLoading } = useSwr('/api/Movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useActionMovieList;