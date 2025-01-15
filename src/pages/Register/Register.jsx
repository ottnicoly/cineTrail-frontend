import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form'
import './Register.css';
import api from '../../services/api';
import React, { useState } from "react";
import { Link } from "react-router-dom"

const Register = () => {

    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [error, setError] = useState("");
    const [role, setRole] = useState("USER")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", {login, password, role});
            console.log("Resposta do servidor:", response)
            navigate("/login")
        } catch (err){
            setError("Este usuário já existe!");
        }
    }

    return (
        <div className='register'>
            <div className='form-register'>
                {error && <p className="error-message">{error}</p>}
                <Form
                    onSubmit={handleSubmit}
                    formName='Registre-se'
                    buttonName='Concluir'
                    loginValue={login}
                    onLoginChange={(e) => setLogin(e.target.value)}
                    passwordValue={password}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                />
                <Link className='link-login' to={"/login"}>Entrar</Link>
            </div>
        </div>
    );
}

export default Register;
