import './MovieCard.css'
import { Link } from "react-router-dom"
import StarRating from "../StarRating/StarRating";
import Favorite from '../Favorite/Favorite';

const MovieCard = (props) => {

    console.log("MovieCard props:", props);

    const favoritoTeste = props.favorite
    console.log(`FAVORITO? ` + favoritoTeste)

    return (
        <li className='movie-card' >
            <div className='movie-poster'>
                <img src={`https://image.tmdb.org/t/p/original${props.poster}`} alt={props.name} />
            </div>
            <div className='movie-info'>
                <div className='movie-fav'>
                    <Favorite
                        idTmdb={props.idTmdb} />
                    <h1 className='movie-title'>{props.name}</h1>
                </div>
                <div className='hidden-content'>
                    <StarRating
                        voteAverage={props.voteAverage} />
                    {props.overview && //quando nao tiver o overview nao vai mostrar nada
                        <p className='description'>{props.overview.length > 100 ? `${props.overview.substring(0, 100)}...`
                            : props.overview}</p>
                    }
                    <Link to={`/movie/${props.idTmdb}`}><button className="btn-default"> Ver Mais </button></Link>
                </div>
            </div>
        </li>
    )
}

export default MovieCard