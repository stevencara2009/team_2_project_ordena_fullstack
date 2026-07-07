import { Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export const AdminLayout = () => {
    const {user} = useAuth()

    return(
        <Outlet/>
    )
}