import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// configurando router

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom"

import Home from "./pages/Home/Home.jsx"
import Login from "./pages/Login/Login.jsx"
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
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
