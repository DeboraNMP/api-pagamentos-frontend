import { useEffect, useState } from "react"
import setaLogin from "../../assets/setaLogin.svg"
import "../../global.css"
import "./style.css"
import iconLogout from "../../assets/iconLogout.svg"
import iconUpdate from "../../assets/iconEditar.svg"
import iconPolygon from "../../assets/iconPolygon.svg"
import { useNavigate } from "react-router-dom"
import { storageRemoveItem } from "../../utils/localStorage"
import ModalUpdateUser from "../ModalUpdateUser"


export function LoginComponentHome() {
    const [openMenuDropdown, setOpenMenuDropdown] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [name, setName] = useState("")
    const [initial, setInitial] = useState("")

    const navigate = useNavigate();

    function handleOpenMenuDropdown() {
        setOpenMenuDropdown(!openMenuDropdown)
    }

    function logout() {
        storageRemoveItem("token");
        storageRemoveItem("userId");
        storageRemoveItem("name");
        navigate("/login");
    }

    function updateDataUser() {
        const user = JSON.parse(localStorage.getItem("user") || "{}")
        const firstName = user.nome?.split(" ")[0]
        const initialName = firstName?.slice(0, 2)

        setName(firstName)
        setInitial(initialName)
    }

    useEffect(() => {
        updateDataUser()
    }, [])

    return (
        <div className="divPrincipalLoginComponent">
            <div className="divLoginHome">
                <p className="pUserIcon">{initial}</p>
                <p className="pUser">{name}</p>
                <div className="btnOpenMenu">
                    <button
                        onClick={() => handleOpenMenuDropdown()}
                        className="buttonLogin">
                        <img src={setaLogin} alt="seta do login" />
                    </button>
                    {openMenuDropdown &&

                        <div className="iconsModalLogin">
                            <button className="buttonLogout" onClick={() => setOpenModalUpdate(true)}>
                                <img src={iconUpdate} alt="icon Editar" />
                            </button>

                            <div onClick={() => logout()} >
                                <button onClick={() => logout}
                                    className="buttonLogout">
                                    <img src={iconLogout} alt="icon Logout" />
                                </button>
                            </div>

                            <img className="iconSeta" src={iconPolygon} alt="" />
                        </div>
                    }
                </div>
            </div>
            {
                openModalUpdate && <ModalUpdateUser
                    updateDataUser={() => updateDataUser()}
                    handleCloseModal={() => setOpenModalUpdate(false)} />
            }
        </div>
    )

}