import { useEffect, useState } from 'react'
import './MovieList.css'
import api from '../../services/api'
import NavBar from '../../components/NavBar/NavBar'
import MovieCard from '../../components/MovieCard/MovieCard'

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const getMovies = async (query = "") => {
        try {
            const token = localStorage.getItem('token');
            const url = query ? `/query/name/${query}` : "/query/trending";
            const response = await api.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // some - verifica se o filme esta na lista de favoritos
            // spread operator - preserva as propriedades do filme
            const updatedMovies = response.data.map(movie => {
                const isFavorite = favoriteMovies.some(favMovie => favMovie.idTmdb === movie.idTmdb);
                return { ...movie, isFavorite }; 
            });
            setMovies(updatedMovies);  
            setError("");  
        } catch (err) {
            setError("Erro ao carregar filmes.");
            setMovies([]);  
        }
    };

    const getFavoriteMovies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get("/favorite", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavoriteMovies(response.data); 
            setError("");  
        } catch (err) {
            setError("Nenhum filme favorito encontrado.");
            setFavoriteMovies([]);  
        }
    };

    useEffect(() => {
        getFavoriteMovies();
    }, []); 

    useEffect(() => {
        if (favoriteMovies.length > 0) {
            getMovies(); 
        }
    }, [favoriteMovies]);

    useEffect(() => {
        if (search) {
            getMovies(search);
        } else {
            getMovies();
        }
    }, [search]); 

    return (
        <div>
            <NavBar search={search} setSearch={setSearch} />
            <ul className='movie-list'>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie.idTmdb}
                            idTmdb={movie.idTmdb}
                            name={movie.name}
                            overview={movie.overview}
                            poster={movie.poster}
                            voteAverage={movie.voteAverage}
                            favorite={movie.isFavorite}
                            getMovies={getMovies}
                        />
                    ))
                ) : (
                    <p>{error}</p>
                )}
            </ul>
        </div>
    );
};

export default MovieList