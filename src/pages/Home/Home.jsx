import { useEffect, useState } from 'react'
import './Home.css'
import api from '../../services/api'

const Home = () => {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const fetchFilmes = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await api.get("/query/trending", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setFilmes(response.data)
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            }
        };

        fetchFilmes();

    }, []);

    return (
        <div className='container'>
            <ul className='filme-lista'>
                {filmes.map(filme =>
                    <li key={filme.id}>
                        <img src={`https://image.tmdb.org/t/p/w200${filme.poster}`} alt={filme.name} className='filme-poster' />
                        <h3>{filme.name}</h3>
                    </li>
                )}
            </ul>
        </div>
    )
}


export default Home