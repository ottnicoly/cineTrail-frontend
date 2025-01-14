import { useEffect, useState } from 'react'
import './ListaFilmes.css'
import api from '../../services/api'
import FilmeCard from '../../components/FilmeCard/FilmeCard'

const ListaFilme = () => {

    const [filmes, setFilmes] = useState([])

    const getFilmes = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get("/query/trending", {
                headers: {
                    Authorization: `Bearer${token}`,
                },
            })
            setFilmes(response.data)
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

       // garante que so vai ser feito 1 requisição na api
       useEffect(() => {
        getFilmes();
    }, []);

    return (
        <ul className='lista-filme'>
            {filmes.map(filme =>
                <FilmeCard 
                    key={filme.id}
                    id={filme.id}
                    name={filme.name}
                    overview={filme.overview}
                    poster={filme.poster}
                    voteAverage={filme.voteAverage}
                />
            )}
        </ul>
    )
}


export default ListaFilme