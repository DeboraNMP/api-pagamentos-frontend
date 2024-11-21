import { FormProvider, useForm } from "react-hook-form"
import "./style.css"
import imageClose from "../../assets/close.svg"
import iconCharge from "../../assets/iconCharge.svg"
import { useEffect, useState } from "react"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest"
import { AxiosError } from "axios"
import api from "../../api/api"
import { storageAddItem } from "../../utils/localStorage"
import { Charge } from "../../pages/TableCharges"


interface IUpdateCharge {
    handleCloseModal: () => void
    clientId?: number
    charge: Charge
}

interface IUpdateTableCharge {
    nome?: string,
    id_cob: string,
    cliente_id: number,
    descricao?: string,
    data_venc: string,
    valor: string | number,
    status: string,

}

export default function ModalUpdateCharge({ handleCloseModal, charge, clientId }: IUpdateCharge) {
    const [checkPaga, setCheckPaga] = useState("")

    const userForm = useForm<IUpdateTableCharge>()
    const { register, watch, reset } = userForm

    const onSubmit = async () => {
        const descricao = watch("descricao")
        const data_venc = watch("data_venc")
        const valor = watch("valor")
        const status = checkPaga

        // if (!nome || !descricao || !data_venc || !valor || !status) {
        //     return alert("Os dados com * são obrigatórios")
        // }
        console.log(charge)
        try {
            const headers = formatHeaderRequest()
            const userData: IUpdateTableCharge = {
                descricao, data_venc, valor, status, cliente_id: clientId || charge.id, id_cob: charge.id_cob
            }

            if (descricao) {
                userData.descricao = descricao
            }

            if (data_venc) {
                userData.data_venc = data_venc
            }

            if (valor) {
                userData.valor = Number(valor)
            }

            if (status) {
                userData.status = status
            }

            const response = await api.put("/updateCharge",
                userData, {
                headers
            }
            )



            const update = response.data
            storageAddItem("update", update)
            handleCloseModal()

        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.mensagem || "Ops, algo inesperado aconteceu")
            }
            return (error)
        }
    }
    async function getDataUpdate() {
        try {
            const headers = formatHeaderRequest()
            const response = await api.get(`/chargeDetails/${charge.id_cob}`, { headers })
            const dataUpdate = response.data
            const defaultValues = {
                nome: dataUpdate.cliente_nome,
                descricao: dataUpdate.descricao,
                data_venc: dataUpdate.data_venc,
                valor: dataUpdate.valor,
            }
            const status = dataUpdate.status === "Paga" ? "Paga" : "Pendente"
            setCheckPaga(status)
            reset(defaultValues)
            console.log(dataUpdate)
        } catch (error) {
            return (error)
        }
    }

    useEffect(() => {
        getDataUpdate()
        if (!charge) {
            return
        }

    }, [])


    return (
        <FormProvider {...userForm}>
            <div className="backgroundModalUpdateCharge">

                <form className="formModalUpdateCharge gapForm">

                    <div className="imgAndButtonModalUpdateCharge">
                        <h1 className="h1ModalUpdateCharge"> <img className="imgModalUpdateCharge" src={iconCharge} alt="" />Edição de Cobrança</h1>
                        <button onClick={() => handleCloseModal()} className="buttonCloseModalUpdateCharge">
                            <img src={imageClose} alt="Close modal" /></button>
                    </div>


                    <div>
                        <label htmlFor="name" className="labelInputChargeUpdateName">Nome*</label>
                        <input className="inputModalChargeUpdateName inputTexto" type="nome" {...register("nome", { required: true })} id="nome" />
                    </div>

                    <div>
                        <label htmlFor="descricao" className="labelInputChargeUpdateDescricao">Descrição*</label>
                        <input className="inputModalChargeUpdateDescricao inputTexto" type="descricao" {...register("descricao", { required: true })} id="descricao" placeholder="Digite a Descrição" />
                    </div>

                    <div className="divVencimentoValor">
                        <div>
                            <label htmlFor="vencimento" className="labelInputChargeUpdateVencimento">Vencimento*</label>
                            <input className="inputModalChargeUpdateVencimento inputTexto" type="vencimento" {...register("data_venc", { required: true })} id="data_venc" placeholder="Data de Vencimento" />
                        </div>

                        <div>
                            <label htmlFor="valor" className="labelInputChargeUpdateValor">Valor*</label>
                            <input className="inputModalChargeUpdateValor inputTexto" type="valor" {...register("valor", { required: true })} id="valor" placeholder="Digite o Valor" />
                        </div>

                    </div>

                    <section className="sectionStatus">
                        <h3 className="h3Status">Status*</h3>
                        <div className="divStatus" >
                            <input checked={checkPaga === "Paga"} onClick={() => setCheckPaga("Paga")} className={checkPaga === "Paga" ? "inputClicked" : "inputNotClicked"} type="checkbox" />
                            <label htmlFor="status" className="labelChargeUpdateStatus">Cobrança Paga</label>
                        </div>

                        <div className="divStatus">
                            <input checked={checkPaga === "Pendente"} onClick={() => setCheckPaga("Pendente")} className={checkPaga === "Pendente" ? "inputClicked" : "inputNotClicked"} type="checkbox" />
                            <label htmlFor="status" className="labelChargeUpdateStatus">Cobrança Pendente</label>
                        </div>
                    </section>



                    <div className="buttonsModalUpdateCharge">


                        <button onClick={() => handleCloseModal()} className="buttonChargeUpdateCancelar" type="button">Cancelar</button>

                        <button onClick={() => onSubmit()} className="buttonChargeUpdateAplicar"
                            type="button">Aplicar</button>

                    </div>
                </form>
            </div>
        </FormProvider >
    )



}