import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import './FavoritoFilme.css'

const FavoritoFilme = () => {
    return (
        <div className="filme-favorito">
            <GoHeartFill />
            <GoHeart />
        </div>
    )
}

export default FavoritoFilme