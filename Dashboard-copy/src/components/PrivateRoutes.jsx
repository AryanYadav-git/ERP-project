import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';

const PrivateRoutes = ({children}) => {
    const {user} = useStateContext();
  return (
    user ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes