import './Favorite.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IconContext } from "react-icons";


const Favorite = (props) => {
    const [category, setCategory] = useState("WATCHED")
    const [error, setError] = useState("")
    const [idTmdb, setIdTmdb] = useState("")

    const [isFavorite, setIsFavorite] = useState(props.favorite)

    // sincronizar o estado de idTmdb com props.idTmdb, para que ele seja atualizado sempre que props.idTmdb mudar.
    useEffect(() => {
        if (props.idTmdb) {
            setIdTmdb(props.idTmdb);
        }
    }, [props.idTmdb]);
    
    useEffect(() => {
        setIsFavorite(props.favorite);
    }, [props.favorite]);

    const favoriteSave = async (e) => {
        e.preventDefault();
        console.log(`enviando dados - id: ${idTmdb} / category:${category}`)
        try {
            const token = localStorage.getItem('token')
            const response = await api.post(`/favorite/save/${idTmdb}/${category}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsFavorite(true)
            props.onFavoriteUpdate(idTmdb, true); //informa que o filme foi adicionado aos favoritos
            console.log("Resposta do servidor: ", response);
        } catch (err) {
            setError("Este filme já está como favorito");
        }
    }

    const favoriteDelete = async (e) => {
        e.preventDefault();
        console.log(`excluindo dados - id: ${idTmdb}`)
        try {
            const token = localStorage.getItem('token')
            const response = await api.delete(`/favorite/remove/${idTmdb}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("Resposta do servidor: ", response);
            props.onFavoriteUpdate(idTmdb, false);
            setIsFavorite(false)
        } catch (err) {
            setError("filme não encontrado")
        }
    }

    return (
        <div >
            <IconContext.Provider value={{ size: 20 }}>
                <div className='favorite-icons'>
                    {isFavorite ? (
                        <FaHeart className='favorite-delete' onClick={favoriteDelete}/>
                    ) : (
                        <FaRegHeart onClick={favoriteSave} />
                    )}
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default Favorite