import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function UserProtectedRoute({children}) {
  const {loginData , loading } = useContext(AuthContext)
  if (loading) {
    return <div>Loading...</div>; 
  }
    if(loginData?.userGroup =="SystemUser"){
        return children
    }else{
        return <Navigate to='/dashboard'/>
    }
  
}