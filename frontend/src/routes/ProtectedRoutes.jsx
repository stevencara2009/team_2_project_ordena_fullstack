import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const  ProtectedRoute = ({ children, allowedRoles}) => {
    const {user} = useAuth()

    // No loguedo
    if(!user){
        return <Navigate to="/login" />
    }

    // Sin permisos
    if(!allowedRoles.includes(user.role)){
        return(<h2>⛔ Acceso denegado</h2>)
    }

    return children 

} 