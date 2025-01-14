import './StarRating.css'
import { FaStar } from "react-icons/fa";

const StarRating = (props) => {

    const numStars = Math.round(props.rating/2);

    return (
        <div className='movie-rate'>
            <FaStar />
            <p>{numStars}</p>
        </div>
    )
}

export default StarRating