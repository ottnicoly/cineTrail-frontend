// import { Link } from "react-router-dom"
import CampoTexto from '../CampoTexto/CampoTexto'
import './Navegacao.css'

const Navegacao = ({ search, setSearch }) => {
    return (
        <nav className="navbar">
            <h1 className="page-title">CineTrail</h1>
            <CampoTexto 
                tipo="text"
                nome="Pesquise um filme..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
            />
        </nav>
    )
}

export default Navegacao