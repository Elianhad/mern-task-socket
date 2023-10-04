import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import LandingPage from './pages/LandingPage'
import CreateAccount from './pages/CreateAccount'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/Login'
import ForgottenPass from './pages/ForgottenPass'
import ChangePass from './pages/ChangePass'
import ConfirmAccount from './pages/ConfirmAccount'
import App from './App'
import ProtectedRoutes from './layout/ProtectedRoutes'
import NewProject from './pages/NewProject'
import Project from './pages/Project'
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
        element: <Login />,
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
  },
  {
    path: '/dashboard',
    element: < ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'new-project',
        element: <NewProject />
      },
      {
        path: ':id',
        element: <Project />
      }
    ],
    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} / >
  </AuthProvider>
)
