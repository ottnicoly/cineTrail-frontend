import { useCallback, useEffect, useState } from 'react'
import './MovieList.css'
import api from '../../services/api'
import NavBar from '../../components/NavBar/NavBar'
import MovieCard from '../../components/MovieCard/MovieCard'
import { useReducer } from 'react';
import apiService from '../../services/apiService'

const initializeState = {
    movies: [],
    error: "",
    search: "",
    favoriteMovies: []
};

function reducer(state, action) {
    switch (action.type) {
        case "movies":
            return {
                ...state,
                movies: action.payload
            }
        case "error":
            return {
                ...state,
                error: action.payload
            }
        case "search":
            return {
                ...state,
                search: action.payload
            }
        case "favoriteMovies":
            return {
                ...state,
                favoriteMovies: action.payload
            }
    }
}

const MovieList = () => {

    const [state, dispatch] = useReducer(reducer, initializeState);

    const getMovies = async (query) => {
        try {
            const movies = await apiService.getMovies();
            const moviesName = await apiService.getMoviesName(query);
            const response = await api.get(query ? moviesName : movies, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // some - verifica se o filme esta na lista de favoritos
            // spread operator - preserva as propriedades do filme
            const updatedMovies = response.data.map(movie => {
                const isFavorite = state.favoriteMovies.some(favMovie => favMovie.idTmdb === movie.idTmdb);
                return { ...movie, isFavorite };
            });
            dispatch({type: "movies", payload: updatedMovies})
        } catch (err) {
            dispatch({type: "error", payload: err.response?.data?.message || "Erro ao garregar filmes"})
        }
    };

    const getFavoriteMovies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get("/favorite", {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({type: "favoriteMovies", payload: response.data})
        } catch (err) {
            dispatch({type: "error", payload: err.response?.data?.message || "Erro ao garregar filmes"})
        }
    };

    useEffect(() => {
        getFavoriteMovies();
    }, []);

    useEffect(() => {
        if (state.favoriteMovies.length > 0) {
            getMovies();
        }
    }, [state.favoriteMovies]);

    //resolver problema quando apaga o nome para voltar ao trending
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay)
        }
    }

    const debounceSearch = useCallback(debounce((query) => getMovies(query), 500), [])

    useEffect(() => {
        if (state.search) {
            debounceSearch(state.search)
        } else {
            getMovies()
        }
    }, [state.search, debounceSearch]);

    return (
        <div>
            <NavBar search={state.search} setSearch={(e) => dispatch({type: "search", payload: e.target.value})} />
            <ul className='movie-list'>
                {state.movies.map((movie) => (
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