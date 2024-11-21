import { Link } from "react-router-dom"
import register3 from "../../assets/step3.svg"
import "../../global.css"
import "./styleUserFormStep3.css"

export default function UserFormStep3() {

    return (
        <div className="userFormStep3">
            <img src={register3} alt="cadastro realizado." />
            <Link className="buttonStep3" to="/login">Ir para o login</Link>
        </div>

    )
}