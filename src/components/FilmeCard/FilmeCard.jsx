import './FilmeCard.css'
import { Link } from "react-router-dom"
import StarRating from "../StarRating/StarRating";
import Favoritar from '../Favoritar/Favoritar';
// import StarsRating from "../../components/StarsRating"

const FilmeCard = (props) => {

    return (
        <li className='filme-card' >
            <div className='filme-poster'>
                <img src={`https://image.tmdb.org/t/p/original${props.poster}`} alt={props.name} />
            </div>
            <div className='filme-favorito'>
            </div>
            <div className='filme-info'>
                <h1 className='filme-titulo'>{props.name}</h1>
                <div className='hidden-content'>
                    {/* <StarsRating /> */}
                    <StarRating 
                    voteAverage={props.voteAverage}/>
                    {props.overview && //quando nao tiver o overview nao vai mostrar nada
                        <p className='descricao'>{props.overview.length > 100 ? `${props.overview.substring(0, 100)}...`
                            : props.overview}</p>
                    }
                    <Link to={`/filme/${props.idTmdb}`}><button className="btn-default"> Ver Mais </button></Link>               
                    <Favoritar
                    idTmdb={props.idTmdb} />
                </div>
            </div>
        </li>
    )
}

export default FilmeCard