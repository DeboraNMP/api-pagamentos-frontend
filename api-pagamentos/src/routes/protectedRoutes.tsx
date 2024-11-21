
import { Navigate } from "react-router-dom"
import { storageGetItem } from "../utils/localStorage"

interface ProtectedRoutesProps {
    redirectTo: string,
    children: JSX.Element
}

export const ProtectedRoutes = ({ redirectTo, children }: ProtectedRoutesProps) => {
    const token = storageGetItem("token")
    return token ? children : <Navigate to={redirectTo} />
}