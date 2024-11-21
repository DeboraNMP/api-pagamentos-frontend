import imgCobrancasPagas from "../../assets/icone-CobrancaPaga-Color.svg"
import imgCobrancasVencidas from "../../assets/icone-CorbancaVencida-Color.svg"
import imgCobrancasPrevistas from "../../assets/icone-CobrancaPendente-Color.svg"
import { formatCurrencyToLocal } from "../../utils/formats"
import "./style.css"

export interface IResumeHomeProps {
    label: string,
    amount: number,
    type?: "vencida" | "paga" | "prevista"
}

export default function ResumeHome({ label, amount, type }: IResumeHomeProps) {
    let imgSource = imgCobrancasPagas
    let color = "greenColor"

    if (type === "prevista") {
        imgSource = imgCobrancasPrevistas
        color = "yellowColor"
    }

    if (type === "vencida") {
        imgSource = imgCobrancasVencidas
        color = "redColor"
    }

    return (
        <div className={`resumeCobrancaPagas ${color}`}>

            <img className="iconsResume" src={imgSource} alt="" />
            <div className="divResumeInfo">
                <p>{label}</p>
                <p className="resumeInfoAmount">{formatCurrencyToLocal(amount)}</p>
            </div>
        </div>

    )
}