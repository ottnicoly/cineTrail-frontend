import { useEffect, useState } from 'react'
import './FavoriteList.css'
import { FaArrowLeft } from "react-icons/fa";
import api from '../../services/api'
import MovieCard from '../../components/MovieCard/MovieCard'
import { Link } from "react-router-dom"
import NavBar from '../../components/NavBar/NavBar';
import { CgSmileSad } from "react-icons/cg";
import { IconContext } from "react-icons";

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
            // console.log('Resposta da API:', response.data);
        } catch (err) {
            setError("Você não possui filmes favoritos!");
            setMovies([]);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    // CALLBACK - atualiza o estado dos filmes sempre que o favorito muda
    const handleFavoriteUpdate = (idTmdb, isFavorite) => {
        //verifica se o idTmdb de cada filme é igual ao idTmdb que foi passado como argumento.
        setMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.idTmdb === idTmdb ? { ...movie, favorite: isFavorite } : movie //spread operator - preserva as propriedades do filme
            )
        );
        refreshMovies()
    };

    const refreshMovies = async () => {
        await getMovies();
    };

    return (
        <div>
            <NavBar />
            <div className='favorite-movie'>
                <h1>Filmes Favoritos: </h1>
            </div>
            
                {movies.length ? <ul className='favorite-list'> {movies.map(movie =>
                    <MovieCard
                        key={movie.idTmdb}
                        favorite={movie.favorite}
                        idTmdb={movie.idTmdb}
                        id={movie.id}
                        name={movie.title}
                        overview={movie.overview}
                        poster={movie.poster}
                        voteAverage={movie.voteAverage}
                        onFavoriteUpdate={handleFavoriteUpdate}
                    />
                )}</ul> : (
                <div className='message-error'>
                <p >{error}
                <IconContext.Provider value={{ size: 35}}>
                    <CgSmileSad className='sad-icon'/>
                    </IconContext.Provider></p>
                    </div>
                )}
            
        </div>
    )
}

export default FavoriteList