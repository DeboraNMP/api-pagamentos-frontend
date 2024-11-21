// import { FormProvider, useForm } from "react-hook-form"
import { AxiosError } from "axios"
import api from "../../api/api"
import imgClose from "../../assets/close.svg"
import imgExcludeCharge from "../../assets/iconDeleteCharge.svg"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest"
import "./style.css"


interface IExcludeCharge {
    handleCloseModal: () => void
    chargeId: string
}

export default function ModalExcludeCharge({ handleCloseModal, chargeId }: IExcludeCharge) {

    async function deleteCharge() {
        const headers = formatHeaderRequest()
        try {
            await api.delete(`/deleteCharge/${chargeId}`, { headers })
            handleCloseModal()

        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.mensagem || "Ops algo inesperado aconteceu.")
            }
            return (error)
        }


    }

    return (

        <div className="modalExcludeChargeBackground">



            <div className="divGlobal">
                <div>
                    <button onClick={() => handleCloseModal()} className="buttonExcluseCharge">
                        <img src={imgClose} alt="Close modal" /></button>
                </div>

                <img className="imgExcludeCharge" src={imgExcludeCharge} alt="Imagem de confirmação da exclusão da cobrança" />
                <h3 className="h3ExcludeCharge">Tem certeza que deseja excluir esta cobrança?</h3>

                <div className="buttonsExcluseCharge">
                    <button onClick={() => handleCloseModal()} className="buttonExcludeChargeNAO">Não</button>
                    <button onClick={() => deleteCharge()} className="buttonExcludeChargeSIM" >Sim</button>
                </div>

            </div>

        </div>


    )
}