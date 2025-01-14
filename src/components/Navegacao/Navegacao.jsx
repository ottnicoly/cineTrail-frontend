// import { Link } from "react-router-dom"
import CampoTexto from '../CampoTexto/CampoTexto'
import './Navegacao.css'

const Navegacao = () => {
    return (
        <nav className="navbar">
            <h1 className="page-title">CineTrail</h1>
            <CampoTexto />
        </nav>
    )
}

export default Navegacao