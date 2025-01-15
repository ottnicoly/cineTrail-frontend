import './Logout.css'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { IconContext } from "react-icons";
import { MdLogout } from "react-icons/md";


const Logout = () => {

    const logout = () => {
        localStorage.removeItem('token');
        const navigate = useNavigate(); 
        navigate('/login');
    }
    return (
        <div className='logout'>
            <IconContext.Provider value={{ size: 25 }}>
                <Link onClick={logout} ><MdLogout /></Link>
            </IconContext.Provider>
        </div>
    )
}

export default Logout