import { useEffect, useState } from 'react'
import './MovieDetails.css'
import { useParams } from 'react-router-dom'
import StarRating from '../../components/StarRating/StarRating';
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import NavBar from '../../components/NavBar/NavBar';
import { useReducer } from 'react';
import apiService from '../../services/apiService'

const initializeState = {
    movie: "",
    error: ""
};

function reducer(state, action) {
    switch (action.type) {
        case 'movie':
            return {
                ...state,
                movie: action.payload
            }

        case 'error':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

const MovieDetails = () => {

    const [state, dispatch] = useReducer(reducer, initializeState)
    const { id } = useParams();

    const getMovie = async (id) => {
        try {
            const movie = await apiService.getMovieId(id);
            dispatch({ type: "movie", payload: movie })
        } catch (err) {
            dispatch({ type: "error", payload: err.response?.data?.message || "Erro ao buscar o filme" })
        }
    }

    useEffect(() => {
        getMovie(id);
    }, [id]);

    return (
        <div>
            <NavBar />
            <div className='movie-details'>
                <Link className='movie-return' to="/"><FaArrowLeft /></Link>
                <div className='poster'>
                    <img src={`https://image.tmdb.org/t/p/w400${state.movie.poster}`} alt={state.movie.name} />
                </div>

                <div className='infos'>

                    <div className='infos-fav'>
                        <h1>{state.movie.name}</h1>
                    </div>

                    <div className='movie-rating' >
                        <StarRating voteAverage={state.movie.voteAverage} />
                    </div>

                    <p className='movie-runtime'>{state.movie.runtime} min</p>
                    <p className='movie-generos' >
                        {state.movie.genres && state.movie.genres.length > 0
                            ? state.movie.genres.map((genero, index) => (
                                <span key={genero.id}>
                                    {genero.name}
                                    {index < state.movie.genres.length - 1 && ', '}
                                </span>
                            )) : 'Gêneros não disponíveis'}</p>

                    <p className='movie-overview'>{state.movie.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails