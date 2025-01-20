import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form'
import './Register.css';
import api from '../../services/api';
import React, { useState } from "react";
import { Link } from "react-router-dom"
import { useReducer } from 'react';
import apiService from '../../services/apiService';

const initialState = {
    password: "",
    login: "",
    error: "",
    role: "USER",
}

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                login: action.payload
            }
        case "password":
            return {
                ...state,
                password: action.payload
            }
        case "error":
            return {
                ...state,
                error: action.payload
            }
        case "role":
            return {
                ...state,
                role: action.payload
            }
    }
}

const Register = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const register = await apiService.register(state.login, state.password, state.role);
            navigate("/login")
        } catch (err) {
            dispatch({type: "error", payload: err.response?.data?.message || "Este usuário já existe!"})
        }
    }

    return (
        <div className='register'>
            <div className='form-register'>
                {state.error && <p className="error-message">{state.error}</p>}
                <Form
                    onSubmit={handleSubmit}
                    formName='Registre-se'
                    buttonName='Concluir'
                    loginValue={state.login}
                    onLoginChange={(e) => dispatch({type: "login", payload: e.target.value})}
                    passwordValue={state.password}
                    onPasswordChange={(e) => dispatch({type: "password", payload: e.target.value})}
                />
                <Link className='link-login' to={"/login"}>Entrar</Link>
            </div>
        </div>
    );
}

export default Register;
