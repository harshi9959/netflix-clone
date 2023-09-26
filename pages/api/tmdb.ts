import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        Accept: "application/json"
    },
    params: {
        api_key: '034a07d4f957846841262587b57bb2fd'
    }
})