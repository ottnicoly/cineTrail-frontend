import React from "react";
import { Navigate } from "react-router-dom";


// define um componente de rota protegida no React, chamado ProtectedRoute. Ele tem como objetivo verificar se o usuário está autenticado antes de permitir o acesso a um determinado conteúdo ou página. Se o usuário não estiver autenticado (não tiver um token válido), ele é redirecionado para a página de login.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
