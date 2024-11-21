import iconHome from "../../assets/iconHome.svg"
import iconCobranca from "../../assets/iconCobrancas.svg"
import iconClients from "../../assets/iconClients.svg"
import { NavLink } from "react-router-dom"
import "./style.css"

export function LateralMenu() {
    return (
        <div className="principalDivMenuLateral">
            <div className="menuLateral">
                <NavLink className={({ isActive }) => isActive ?
                    "linkMenuLateral ativo" :
                    "linkMenuLateral"} to="/home">
                    <img className="iconsHome" src={iconHome} />
                </NavLink>
                <NavLink className={({ isActive }) => isActive ?
                    "linkMenuLateral ativo" :
                    "linkMenuLateral"} to="/clients">
                    <img className="iconsHome" src={iconClients} />
                </NavLink>
                <NavLink className={({ isActive }) => isActive ?
                    "linkMenuLateral ativo" :
                    "linkMenuLateral"} to="/charge">
                    <img className="iconsHome" src={iconCobranca} />
                </NavLink>

            </div>
        </div>
    )
}