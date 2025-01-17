import Form from '../../components/Form/Form'
import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { useReducer } from 'react';
import './Login.css'

const initializeState = {
  password: "",
  login: "",
  error: ""
}

function reducer(state, action) {
  switch (action.type) {
    case 'password':
      return {
        ...state,
        password: action.payload
      }
    case 'login':
      return {
        ...state,
        login: action.payload
      }
    case 'error':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initializeState)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { login: state.login, password: state.password, });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      (e) => dispatch({ type: "error", payload: err.response?.data?.message || "Erro desconhecido" })
    }
  };

  return (
    <div className='login'>
      <div className='form-login'>
        {state.error && <p className="error-message">{state.error}</p>}
        <Form
          onSubmit={handleSubmit}
          formName='Login'
          buttonName='Entrar'
          loginValue={state.login}
          onLoginChange={(e) => dispatch({ type: "login", payload: e.target.value })}
          passwordValue={state.password}
          onPasswordChange={(e) => dispatch({ type: "password", payload: e.target.value })}
        />
        <Link className='link-register' to={"/register"}>Registrar-se</Link>
      </div>
    </div>
  )
}

export default Login