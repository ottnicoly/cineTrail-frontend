import { useNavigate } from 'react-router-dom';
import Formulario from '../../components/Formulario/Formulario';
import './Registro.css';
import api from '../../services/api';
import React, { useState } from "react";
import { Link } from "react-router-dom"

const Registro = () => {

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
        <div className='registro'>
            <div className='form-registro'>
                {error && <p className="mensagem-erro">{error}</p>}
                <Formulario 
                    onSubmit={handleSubmit}
                    nomeFormulario='Registre-se'
                    nomeBotao='Concluir'
                    loginValue={login}
                    onLoginChange={(e) => setLogin(e.target.value)}
                    senhaValue={password}
                    onSenhaChange={(e) => setPassword(e.target.value)}
                />
                <Link className='link-login' to={"/login"}>Entrar</Link>
            </div>
        </div>
    );
}

export default Registro;
