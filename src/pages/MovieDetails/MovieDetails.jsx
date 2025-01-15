import { useEffect, useState } from 'react'
import './MovieDetails.css'
import api from '../../services/api'
import { useParams } from 'react-router-dom'
import StarRating from '../../components/StarRating/StarRating';
import Favorite from '../../components/Favorite/Favorite';
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import NavBar from '../../components/NavBar/NavBar';


const MovieDetails = (props) => {

    const [movie, setMovie] = useState("")
    const [error, setError] = useState("")
    const { id } = useParams();

    const getFilme = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const url = `/query/id/${id}`;
            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setMovie(response.data)
        } catch (err) {
            setError("Erro ao carregar filmes. Tente novamente.");
        }
    }
    
    useEffect(() => {
        getFilme(id);
    }, []);

    return (
        <div>
            <NavBar />
            <div className='movie-details'>

                <Link className='movie-return' to="/"><FaArrowLeft /></Link>

                <div className='poster'>
                    <img src={`https://image.tmdb.org/t/p/w400${movie.poster}`} alt={movie.name} />
                </div>

                <div className='infos'>

                    <div className='infos-fav'>
                        <h1>{movie.name}</h1>
                        <Favorite idTmdb={movie.idTmdb} />
                    </div>

                    <div className='movie-rating' >
                        <StarRating voteAverage={movie.voteAverage} />
                    </div>

                    <p className='movie-runtime'>{movie.runtime} min</p>
                    <p className='movie-generos' >
                        {movie.genres && movie.genres.length > 0
                            ? movie.genres.map((genero, index) => (
                                <span key={genero.id}>
                                    {genero.name}
                                    {index < movie.genres.length - 1 && ', '}
                                </span>
                            )) : 'Gêneros não disponíveis'}</p>

                    <p className='movie-overview'>{movie.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails