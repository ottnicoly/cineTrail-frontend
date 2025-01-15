import { useEffect, useState } from 'react'
import './MovieList.css'
import api from '../../services/api'
import NavBar from '../../components/NavBar/NavBar'
import MovieCard from '../../components/MovieCard/MovieCard'

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")

    const getMovies = async (query = "") => {
        try {
            const token = localStorage.getItem('token')
            const url = query ? `/query/name/${query}` : "/query/trending";
            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setMovies(response.data)
            setError("");
        } catch (err) {
            setError("Erro ao carregar filmes. Tente novamente.");
            setMovies([]);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        if (search) {
            getMovies(search); 
        } else {
            getMovies(); 
        }
    }, [search]); // A pesquisa é realizada sempre que o `search` mudar

    return (
        <div>
            <NavBar search={search} setSearch={setSearch}/>
            <ul className='movie-list'>
                {movies.map(movie =>
                    <MovieCard
                        key={movie.idTmdb}
                        idTmdb={movie.idTmdb}
                        id={movie.id}
                        name={movie.name}
                        overview={movie.overview}
                        poster={movie.poster}
                        voteAverage={movie.voteAverage}
                    />
                )}
            </ul>
        </div>
    )
}


export default MovieList