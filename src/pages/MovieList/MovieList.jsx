import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./MovieList.css";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // Função para buscar filmes
    const fetchMovies = async (query) => {
        try {
            const url = query ? `/query/name/${query}` : "/query/trending";
            const response = await api.get(url);
            setMovies(response.data);
            setError("");
        } catch (err) {
            setError("Erro ao carregar filmes. Tente novamente.");
            setMovies([]);
        };

        useEffect(() => {
            fetchMovies("");
        }, []);

        // Função para lidar com a pesquisa
        const handleSearch = (e) => {
            e.preventDefault();
            fetchMovies(search);
        };

        return (
            <div className="movie-list-container">
                <h2>Filmes Populares</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Pesquise um filme..."
                    />
                    <button type="submit">Pesquisar</button>
                </form>

                {error && <p>{error}</p>}  {error}

                <div className="movies">
                    {movies.map((movie) => (
                        <div key={movie.idTmdb} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                                alt={movie.name}
                            />
                            <h3>{movie.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

export default MovieList