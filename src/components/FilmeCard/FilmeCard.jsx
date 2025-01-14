import StarRating from '../StarRating/StarRating'
import FavoritoFilme from '../FavoritoFilme/FavoritoFilme'
import './FilmeCard.css'

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
                    <StarRating className='filme-nota' rating={props.voteAverage}/>
                    {props.overview && //quando nao tiver o overview nao vai mostrar nada
                    <p className='descricao'>{props.overview.length > 100 ? `${props.overview.substring(0, 100)}...`
                    : props.overview}</p>
                    }
                    <button className="btn-default">Ver Mais</button>
                </div>
            </div>
        </li>
    )
}

export default FilmeCard