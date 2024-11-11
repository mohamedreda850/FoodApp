import React from 'react'
import Login from '../../../authentication/Components/Login/Login'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({loginData , children}) {
 if(localStorage.getItem("foodAppToken") || loginData) return children
 else return <Navigate to='/login'/>
}
