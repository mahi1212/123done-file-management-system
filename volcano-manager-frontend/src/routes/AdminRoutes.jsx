import { useAtom } from 'jotai'
import React from 'react'
import { userAtom } from '../lib/jotai'
import { Navigate, useLocation } from 'react-router-dom'

const AdminRoutes = ({ children }) => {
  const user = useAtom(userAtom)
  console.log(user, 'user')
  const location = useLocation();

  if (user[0]?.role == 'admin') {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
}

export default AdminRoutes