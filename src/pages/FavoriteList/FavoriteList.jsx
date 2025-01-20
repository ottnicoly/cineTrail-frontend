import { useEffect, useState } from 'react'
import './FavoriteList.css'
import apiService from '../../services/apiService'
import MovieCard from '../../components/MovieCard/MovieCard'
import NavBar from '../../components/NavBar/NavBar';
import { CgSmileSad } from "react-icons/cg";
import { IconContext } from "react-icons";
import { useReducer } from 'react';

const initializeState = {
    movies: [],
    error: ""
}

function reducer(state, action) {
    switch (action.type) {
        case 'movies':
            return {
                ...state,
                movies: action.payload
            }
        case 'error':
            return {
                ...state,
                error: action.payload
            }
    }
}

const FavoriteList = () => {

    const [state, dispatch] = useReducer(reducer, initializeState);

    const getFavoriteMovies = async () => {
        try {
            const favoriteMovies = await apiService.getFavoriteMovies();
            console.log(favoriteMovies)
            dispatch({type: "movies", payload: favoriteMovies})
        } catch (error) {
            dispatch({type: "error", payload: error.response?.data?.message || "Erro ao buscar filmes" })
        }
    }

    useEffect(() => {
        getFavoriteMovies();
    }, []);

    return (
        <div>
            <NavBar />
            <div className='favorite-movie'>
                <h1>Filmes Favoritos: </h1>
            </div>
            {state.movies.length ? <ul className='favorite-list'> {state.movies.map(movie =>
                <MovieCard
                    key={movie.idTmdb}
                    favorite={movie.favorite}
                    idTmdb={movie.idTmdb}
                    id={movie.id}
                    name={movie.title}
                    overview={movie.overview}
                    poster={movie.poster}
                    voteAverage={movie.voteAverage}

                />
            )}</ul> : (
                <div className='message-error'>
                    <p >{state.error}
                        <IconContext.Provider value={{ size: 35 }}>
                            <CgSmileSad className='sad-icon' />
                        </IconContext.Provider></p>
                </div>
            )}

        </div>
    )
}

export default FavoriteList