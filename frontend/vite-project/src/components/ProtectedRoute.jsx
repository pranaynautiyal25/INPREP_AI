import React from 'react'
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    //connection with backend to check database.

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
