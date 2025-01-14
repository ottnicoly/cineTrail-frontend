import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// configurando router

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom"

import Login from "./pages/Login/Login.jsx"
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx"
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import ListaFilme from './pages/ListaFilmes/ListaFilmes.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute> <ListaFilme /> </ProtectedRoute>
      },
      {
        path:"login",
        element: <Login />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
