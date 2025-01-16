import TextField from '../TextField/TextField';
import './NavBar.css'
import { Link, useLocation } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import Logout from '../Logout/Logout';
import { TiHomeOutline } from "react-icons/ti";

const NavBar = ({ search, setSearch }) => {

    //caminha da url
    const location = useLocation()

    return (
        <nav className="navbar">
            <h1 className="page-title">CineTrail</h1>

            <div className='filter'>

                {location.pathname === "/" &&
                    <>
                        <TextField
                            type="text"
                            name="Pesquise um filme..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </>}
                <IconContext.Provider value={{ size: 25 }}>
                    <Link className='home-icon' to={"/"}><TiHomeOutline /></Link>
                    <Link className='fav-icon' to='/favorite'> <FaRegHeart /> </Link>
                </IconContext.Provider>
                <Logout />
            </div>
        </nav>
    )
}

export default NavBar