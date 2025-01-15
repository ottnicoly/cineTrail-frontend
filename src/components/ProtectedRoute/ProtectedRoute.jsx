import React from "react";
import { Navigate } from "react-router-dom";


// tem como objetivo verificar se o usuário está autenticado antes de permitir o acesso a um determinado conteúdo ou página.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
