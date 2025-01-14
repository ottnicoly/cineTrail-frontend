import './Favoritar.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'

const Favoritar = (props) => {
    const [category, setCategory] = useState("WATCHED")
    const [error, setError] = useState("")
    const [idTmdb, setIdTmdb] = useState("")

    //se props.idTmdb for assíncrono ou se for passado como undefined inicialmente. 
    // usar um useEffect para sincronizar o estado de idTmdb com props.idTmdb, garantindo que ele seja atualizado quando props.idTmdb mudar.
    useEffect(() => { 
        if (props.idTmdb) {
            setIdTmdb(props.idTmdb);
        }
    }, [props.idTmdb]);

    const favoritar = async (e) => {
        e.preventDefault();
        console.log(`enviando dados - id: ${idTmdb} / category:${category}`)
        try {
            const token = localStorage.getItem('token')
            const response = await api.post(`/favorite/save/${idTmdb}/${category}`,{},{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log("Resposta do servidor: ", response); 
        } catch (err) {
            setError("erro");
        }
    } 
    return (
        <div>
            <button className='btn-default' onClick={favoritar}>Favoritar</button>
        </div>
    )
}

export default Favoritar