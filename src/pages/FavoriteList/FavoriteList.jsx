import { useEffect, useState } from 'react'
import './FavoriteList.css'
import { FaArrowLeft } from "react-icons/fa";
import api from '../../services/api'
import MovieCard from '../../components/MovieCard/MovieCard'

const FavoriteList = () => {

    const [filmes, setFilmes] = useState([])
    const [error, setError] = useState("")

    const getFilmes = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get(`/favorite`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setFilmes(response.data)
            console.log('Resposta da API:', response.data);
        } catch (err) {
            setError("Erro ao carregar filmes. Tente novamente.");
            setFilmes([]);
        }
    }

    useEffect(() => {
        getFilmes();
    }, []);

    return (
        <div>
        <nav className="navbar">
            <h1 className="page-title">CineTrail</h1>
        </nav>
        <div className='favorite-movie'>
            
            <FaArrowLeft />
            <h1>Filmes Favoritos: </h1>
        </div>

        
        <ul className='favorite-list'>
           {filmes.map(filme =>
                <MovieCard
                    key={filme.idTmdb}
                    idTmdb={filme.idTmdb}
                    id={filme.id}
                    name={filme.title}
                    overview={filme.overview}
                    poster={filme.poster}
                    voteAverage={filme.voteAverage}
                />
            )} 
        </ul> 
        </div>
    )
}

export default FavoriteList