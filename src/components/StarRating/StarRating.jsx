import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import './StarRating.css'

const StarRating = (props) => {

    const numStars = Math.round(props.voteAverage / 2);
    const totalStars = 5;

    const stars = [];

    // Preencher com estrelas cheias
    for (let i = 0; i < numStars; i++) {
        stars.push(<FaStar key={`full-${i}`} />);
    }

    // Preencher com estrelas vazias
    for (let i = numStars; i < totalStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return (
        <div className='movie-rate'>
            {stars}
        </div>
    )
}

export default StarRating