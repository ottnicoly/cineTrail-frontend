import TextField from '../TextField/TextField';
import './NavBar.css'
import { Link } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";


const NavBar = ({ search, setSearch }) => {
    return (
        <nav className="navbar">
            <h1 className="page-title">CineTrail</h1>

            <div className='filter'>
                
                <IconContext.Provider value={{ size: 25 }}>
                        <Link className='filter-fav' to='/favorite'> <FaRegHeart /> </Link>
                </IconContext.Provider>

                <TextField
                    type="text"
                    name="Pesquise um filme..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </nav>
    )
}

export default NavBar