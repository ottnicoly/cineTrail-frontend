import { useNavigate } from 'react-router-dom';
import Formulario from '../../components/Formulario/Formulario';
import './Registro.css';
import api from '../../services/api';
import React, { useState } from "react";

const Registro = () => {

    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");

    return (
        <div className='registro'>
            <div className='form-registro'>
                <Formulario 
                    nomeFormulario='Registre-se'
                    nomeBotao='Concluir'
                    loginValue={login}
                    onLoginChange={(e) => setLogin(e.target.value)}
                    senhaValue={password}
                    onSenhaChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Registro;
