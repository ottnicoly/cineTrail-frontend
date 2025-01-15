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
    const [isFavorite, setIsFavorite] = useState(false)

    //se props.idTmdb for assíncrono ou se for passado como undefined inicialmente. 
    // usar um useEffect para sincronizar o estado de idTmdb com props.idTmdb, garantindo que ele seja atualizado quando props.idTmdb mudar.
    useEffect(() => {
        if (props.idTmdb) {
            setIdTmdb(props.idTmdb);
        }
    }, [props.idTmdb]);

    const favorite = async (e) => {
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
            console.log("Resposta do servidor: ", response);
        } catch (err) {
            setError("erro");
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
            console.log("excluido")
            setIsFavorite(false)
        } catch (err) {
            setError("erro ao excluir")
        }
    }

    return (
        <div >
            <IconContext.Provider value={{ size: 20 }}>
                <div className='favorite-icons'>
                    {isFavorite ? (
                        <FaHeart className='favorite-delete' onClick={favoriteDelete} />
                    ) : (
                        <FaRegHeart onClick={favorite} />
                    )}
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default Favorite