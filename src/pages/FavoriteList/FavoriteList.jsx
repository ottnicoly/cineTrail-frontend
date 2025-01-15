import { useEffect, useState } from 'react'
import './FavoriteList.css'
import { FaArrowLeft } from "react-icons/fa";
import api from '../../services/api'
import MovieCard from '../../components/MovieCard/MovieCard'
import { Link } from "react-router-dom"
import NavBar from '../../components/NavBar/NavBar';

const FavoriteList = () => {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState("")

    const getMovies = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get(`/favorite`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setMovies(response.data)
            console.log('Resposta da API:', response.data);
        } catch (err) {
            setError("Erro ao carregar filmes. Tente novamente.");
            setMovies([]);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);


    return (
        <div>
            <NavBar />
            <div className='favorite-movie'>
                <Link className='return' to="/" ><FaArrowLeft /></Link>
                <h1>Filmes Favoritos: </h1>
            </div>
            <ul className='favorite-list'>
                {movies.map(movie =>
                    <MovieCard
                        key={movie.idTmdb}
                        favorite={movie.isFavorite}
                        idTmdb={movie.idTmdb}
                        id={movie.id}
                        name={movie.title}
                        overview={movie.overview}
                        poster={movie.poster}
                        voteAverage={movie.voteAverage}
                    />
                )}
            </ul>
        </div>
    )
}

export default FavoriteList