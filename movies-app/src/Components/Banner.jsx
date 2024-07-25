import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';


export default function Banner(){
    const [trendingMovie,setTrendingMovie] = useState(null);
   
    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=2634e9f079c604567d18059d526b4346')
        .then(function(res){
            let randomMovie = res.data.results[Math.floor(Math.random()*20)];
            
            setTrendingMovie(randomMovie);
        })
    },[]);// only execute the callback on mounting 

    if(!trendingMovie){
        return <h1>...Loading</h1>
    }

    return(
            <div className="relative">
                <img className="h-[35rem] w-screen" src={BASE_URL+trendingMovie.backdrop_path}/>
                <p className="absolute left-[50%] text-4xl bottom-4	left-4 text-white translate-x-[-50%]">{trendingMovie.title}</p>
            </div>
    )
}