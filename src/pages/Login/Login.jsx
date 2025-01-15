import Form from '../../components/Form/Form'
import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import './Login.css'

const Login = () => {
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      /* console.log("Enviando dados:", { login, password }); */
      try {
        const response = await api.post("/auth/login", { login, password });
      /* console.log("Resposta do servidor:", response); */
        localStorage.setItem("token", response.data.token);
        navigate("/"); 
      } catch (err) {
      /* console.log("Erro ao fazer login:", err.response ? err.response.data : err); */
        setError("Credenciais inválidas. Tente novamente.");
      }};
      
    return (
        <div className='login'>
            <div className='form-login'>
            {error && <p className="error-message">{error}</p>}
            <Form 
            onSubmit={handleSubmit}
            formName='Login'
            buttonName='Entrar'
            loginValue={login}
            onLoginChange={(e) => setLogin(e.target.value)}
            passwordValue={password}
            onPasswordChange={(e) => setPassword(e.target.value)}
            />
            <Link className='link-register' to={"/register"}>Registrar-se</Link>
            </div>
        </div> 
    )
}

export default Login