import { FormProvider, useForm } from "react-hook-form"
import "./style.css"
import imageClose from "../../assets/close.svg"
import iconCharge from "../../assets/iconCharge.svg"
import { useState } from "react"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest"
import api from "../../api/api"
import { AxiosError } from "axios"
import { IClientCharge } from "../TableClientsList"
import { convertValuesIntoCents } from "../../utils/formats"

interface IChargeRegistration {
    handleCloseModal: () => void
    client: IClientCharge
}

interface ITableChargeRegistration {
    nome: string,
    descricao: string,
    data_venc: string,
    valor: string,
    status?: string
    cliente_id: number
}

type ITableChargeRegistrationDTO = Omit<ITableChargeRegistration, "valor"> & {
    valor?: number
}

export default function ModalChargeRegistration({ handleCloseModal, client }: IChargeRegistration) {

    const [checkPaga, setCheckPaga] = useState<string | null>(null)

    const userForm = useForm<ITableChargeRegistration>()
    const { register, watch } = userForm

    const onSubmit = async () => {
        const nome = watch("nome")
        const descricao = watch("descricao")
        const data_venc = watch("data_venc")
        const valor = watch("valor")
        const status = checkPaga

        const valorFormatado = convertValuesIntoCents(valor)


        if (!status || !descricao || !data_venc || !valorFormatado) {
            return alert("Todos os dados são obrigatórios.")
        }


        try {

            const headers = formatHeaderRequest()
            const userData: ITableChargeRegistrationDTO = {
                nome, descricao, data_venc, status, cliente_id: client.id
            }


            // if (nome) {
            //     userData.nome = nome
            // }

            // if (descricao) {
            //     userData.descricao = descricao
            // }

            // if (vencimento) {
            //     userData.vencimento = vencimento
            // }

            if (valorFormatado) {
                userData.valor = valorFormatado
            }

            // if (status) {
            //     userData.status = status
            // }


            await api.post("/addCharge",
                userData, {
                headers
            }
            )

            handleCloseModal()

        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.mensagem || "Ops algo inesperado aconteceu.")
            }
            return (error)
        }
    }

    return (
        <FormProvider {...userForm}>
            <div className="backgroundModalChargeRegistration">

                <form className="formModalChargeRegistration gapForm">

                    <div className="imgAndButtonModalChargeRegistration">
                        <h1 className="h1ModalChargeRegistration"> <img className="imgModalChargeRegistration" src={iconCharge} alt="" />Cadastro de Cobrança</h1>
                        <button onClick={() => handleCloseModal()} className="buttonCloseModalUpdateCharge">
                            <img src={imageClose} alt="Close modal" /></button>
                    </div>


                    <div>
                        <label htmlFor="name" className="labelInputChargeRegistrationName">Nome*</label>
                        <input className="inputModalChargeRegistrationName inputTexto" type="nome" value={client?.nome} id="name" placeholder="Digite o Nome" />
                    </div>

                    <div>
                        <label htmlFor="descricao" className="labelInputChargeRegistrationDescricao">Descrição*</label>
                        <input className="inputModalChargeRegistrationDescricao inputTexto" type="descricao" {...register("descricao", { required: true })} id="descricao" placeholder="Digite a Descrição" />
                    </div>

                    <div className="divVencimentoValorChargeRegistration">
                        <div>
                            <label htmlFor="vencimento" className="labelInputChargeRegistrationVencimento">Vencimento*</label>
                            <input className="inputModalChargeRegistrationVencimento inputTexto" type="vencimento" {...register("data_venc", { required: true })} id="vencimento" placeholder="Data de Vencimento" />
                        </div>

                        <div>
                            <label htmlFor="valor" className="labelInputChargeRegistrationValor">Valor*</label>
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


                        <button onClick={() => handleCloseModal()} type="button" className="buttonChargeUpdateCancelar">Cancelar</button>
                        <button onClick={() => onSubmit()} type="button" className="buttonChargeUpdateAplicar">Aplicar</button>

                    </div>
                </form>
            </div>
        </FormProvider >
    )



}