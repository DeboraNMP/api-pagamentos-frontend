
import { Navigate } from "react-router-dom"
import { storageGetItem } from "../utils/localStorage"

interface PublicRoutesProps {
    redirectTo: string,
    children: JSX.Element
}

export const PublicRoutes = ({ redirectTo, children }: PublicRoutesProps) => {
    const token = storageGetItem("token")
    return !token ? children : <Navigate to={redirectTo} />
}