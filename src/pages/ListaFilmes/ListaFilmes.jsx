import { useEffect, useState } from 'react'
import './ListaFilmes.css'
import api from '../../services/api'
import FilmeCard from '../../components/FilmeCard/FilmeCard'
import Navegacao from '../../components/Navegacao/Navegacao'

const ListaFilme = () => {
    const [filmes, setFilmes] = useState([])
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")

    const getFilmes = async (query = "") => {
        try {
            const token = localStorage.getItem('token')
            const url = query ? `/query/name/${query}` : "/query/trending";
            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setFilmes(response.data)
            setError("");
        } catch (err) {
            setError("Erro ao carregar filmes. Tente novamente.");
            setFilmes([]);
        }
    };

    useEffect(() => {
        getFilmes();
    }, []);

    useEffect(() => {
        if (search) {
            getFilmes(search); 
        } else {
            getFilmes(); 
        }
    }, [search]); // A pesquisa é realizada sempre que o `search` mudar

    return (
        <div>
            <Navegacao search={search} setSearch={setSearch}/>
            <ul className='lista-filme'>
                {filmes.map(filme =>
                    <FilmeCard
                        key={filme.idTmdb}
                        idTmdb={filme.idTmdb}
                        id={filme.id}
                        name={filme.name}
                        overview={filme.overview}
                        poster={filme.poster}
                        voteAverage={filme.voteAverage}
                    />
                )}
            </ul>
        </div>
    )
}


export default ListaFilme