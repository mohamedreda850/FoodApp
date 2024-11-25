import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AdminProtectedRoute({children}) {
  const {loginData} = useContext(AuthContext)
 
    if(loginData?.userGroup !="SystemUser"){
        return children
    }else{
        return <Navigate to='/dashboard'/>
    }
  
}
