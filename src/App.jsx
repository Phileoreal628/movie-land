import { useEffect, useState } from 'react';
import AppCSS from './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';

const OMDB_API = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
    const [movies,setMovies] = useState();
    const [searchTerm,setSearchTerm] = useState('');
    const searchMovies = async function (title) {
        const response = await fetch(`${OMDB_API}&s=${title}`);
        const data = await response.json();

        console.log(data.Search);
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('global');
    }, [])
    return (
        <div className='app'>
            <h1>Movie Land</h1>
            <div className='search'>
                <input
                    placeholder='Search for Movies'
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value)}}
                />
                <img
                    src={searchIcon}
                    alt='search'
                    onClick={() => {searchMovies(searchTerm) }}
                />
            </div>
            {movies?.length > 0 ?
                (<div className='container'>
                    {movies.map(mov => (
                        <MovieCard movie={mov} key ={mov.imdbID}/>
                    ))}
                </div>) :
                (
                    <div className='empty'>
                        <h2>No Movie Found !</h2>
                    </div>
                )
            }

        </div>
    );
}
export default App;