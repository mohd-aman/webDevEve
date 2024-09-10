import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { getAllMovies } from '../../api/movie';

function MovieList() {
   const [movies,setMovies] = useState([]);
   

    const tableHeadings = [
        {
            title : "Poster"
        },
        {
            title : "Movie Name",
            dataIndex : 'movieName'
        },
        {
            title : "Description",
            dataIndex : 'description'
        },
        {
            title : "Duration",
            dataIndex: 'duration',
        },
        {
            title : "Genre",
            dataIndex: 'genre',
        },
        {
            title : "Language",
            dataIndex: 'language'
        },
        {
            title : "Release Date",
            dataIndex: 'releaseDate'
        },
        {
            title : "Action"
        },
    ]

    useEffect(()=>{
        const getData = async ()=>{
           const resp = await getAllMovies();
           const allMovies = resp.data;
           setMovies(allMovies);
        }
        getData();
    },[]);

  return (
    <div>
          <Table columns={tableHeadings} dataSource={movies} />
    </div>
  )
}

export default MovieList