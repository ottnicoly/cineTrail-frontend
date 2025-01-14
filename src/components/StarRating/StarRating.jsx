import { FaStar } from "react-icons/fa";
import './StarRating.css'

const StarRating = (props) => {

    const numStars = Math.round(props.voteAverage / 2);

    return (
        <div className='movie-rate'>
            <FaStar />
            <p>{numStars}</p>
        </div>
    )
}

export default StarRating