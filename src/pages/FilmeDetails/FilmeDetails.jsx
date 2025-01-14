import { useEffect, useState } from 'react'

import './FilmeDetails.css'
import api from '../../services/api'
import { useParams } from 'react-router-dom'
import StarRating from '../../components/StarRating/StarRating';
import Favoritar from '../../components/Favoritar/Favoritar';

const Filme = (props) => {

    const [filme, setFilme] = useState("")
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
            setFilme(response.data)
            console.log(response.data)
            setError("");
        } catch (err) {
            setError("Erro ao carregar filmes. Tente novamente.");
            setFilme("");
        }
    }

    useEffect(() => {
        getFilme(id);
    }, []);

    //classificação, genero, tempo

    return (     
        <div className='filme-details'>
            <div className='poster'>
            <img src={`https://image.tmdb.org/t/p/w400${filme.poster}`} alt={filme.name} />
            </div>
            <div className='infos'>
            <h1>{filme.name}</h1>
            <StarRating
                voteAverage={filme.voteAverage} />
            <p>{filme.overview}</p>
            <Favoritar
                idTmdb={filme.idTmdb} />
            </div>
        </div>
    )
}

export default Filme