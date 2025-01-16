import { useCallback, useEffect, useState } from 'react'
import './MovieList.css'
import api from '../../services/api'
import NavBar from '../../components/NavBar/NavBar'
import MovieCard from '../../components/MovieCard/MovieCard'
import { useReducer } from 'react';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const getMovies = async (query) => {
        try {
            const token = localStorage.getItem('token');
            const url = query ? `/query/name/${query}` : "/query/trending";
            const response = await api.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // some - verifica se o filme esta na lista de favoritos
            // spread operator - preserva as propriedades do filme
            const updatedMovies = response.data.map(movie => {
                const isFavorite = favoriteMovies.some(favMovie => favMovie.idTmdb === movie.idTmdb);
                return { ...movie, isFavorite };
            });
            setMovies(updatedMovies);
            setError("");
        } catch (err) {
            setError("Erro ao carregar filmes.");
            setMovies([]);
        }
    };

    const getFavoriteMovies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get("/favorite", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavoriteMovies(response.data);
            setError("");
        } catch (err) {
            setError("Erro ao carregar filmes.");
            setFavoriteMovies([]);
        }
    };

    useEffect(() => {
        getFavoriteMovies();
    }, []);

    useEffect(() => {
        if (favoriteMovies.length > 0) {
            getMovies();
        }
    }, [favoriteMovies]);

    //resolver problema quando apaga o nome para voltar ao trending
    function debounce (func, delay) {
       let timeoutId;
       return function (...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay)
       }
    }

    const debounceSearch = useCallback(debounce((query) => getMovies(query), 500),[])

    useEffect(() => {
        if(search){
            debounceSearch(search)
        }else {
            getMovies()
        }
    }, [search, debounceSearch]);

    return (
        <div>
            <NavBar search={search} setSearch={setSearch} />
            <ul className='movie-list'>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.idTmdb}
                        idTmdb={movie.idTmdb}
                        name={movie.name}
                        overview={movie.overview}
                        poster={movie.poster}
                        voteAverage={movie.voteAverage}
                        favorite={movie.isFavorite}
                        getMovies={getMovies}
                    />
                ))}
            </ul>
        </div>
    );
};

export default MovieList