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
import MovieList from './pages/MovieList/MovieList.jsx'
import Register from './pages/Register/Register.jsx'
import MovieDetails from './pages/MovieDetails/MovieDetails.jsx'
import FavoriteList from './pages/FavoriteList/FavoriteList.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute> <MovieList /> </ProtectedRoute>
      },
      {
        path:"login",
        element: <Login />
      },
      {
        path:"register",
        element: <Register />
      },
      {
        path:"movie/:id",
        element: <MovieDetails />
      },
      {
        path:"favorite",
        element: <FavoriteList />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
