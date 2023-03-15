import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CreateAccount from './pages/CreateAccount'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/Login'
import ForgottenPass from './pages/ForgottenPass'
import ChangePass from './pages/ChangePass'
import ConfirmAccount from './pages/ConfirmAccount'
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/account',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <CreateAccount />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'forgotten-password',
        element: <ForgottenPass/>
      },
     {
       path: 'forgotten-password/:token',
       element: <ChangePass/>
      },
      {
        path: 'confirm-account/:id',
        element: <ConfirmAccount/>
     }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
