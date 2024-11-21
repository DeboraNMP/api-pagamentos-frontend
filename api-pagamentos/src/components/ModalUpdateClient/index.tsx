import { FormProvider, useForm } from "react-hook-form"
import "./style.css"
import imageClose from "../../assets/close.svg"
import { IClients } from "../../interfaces/client.interface"
import iconClients from "../../assets/iconClients1.svg"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest"
import api from "../../api/api"
import { storageAddItem, storageGetItem } from "../../utils/localStorage"
import { AxiosError } from "axios"
import { useEffect } from "react"

interface IClientsRegister {
    handleCloseModal: () => void
}

let id = ""

export default function ModalUpdateClient({ handleCloseModal }: IClientsRegister) {


    const userForm = useForm<IClients>()
    const { register, watch, reset } = userForm

    const onSubmit = async () => {
        const nome = watch("nome")
        const email = watch("email")
        const cpf = watch("cpf")
        const telefone = watch("telefone")
        const endereco = watch("endereco")
        const complemento = watch("complemento")
        const cep = watch("cep")
        const bairro = watch("bairro")
        const cidade = watch("cidade")
        const uf = watch("uf")


        if (!nome || !email || !cpf || !telefone) {
            return alert("Nome, e-mail, Cpf e telefone são obrigatórios.")
        }

        try {
            const headers = formatHeaderRequest()
            const userData: IClients = {
                nome, email, cpf, telefone, endereco, complemento, cep, bairro, cidade, uf
            }
            if (nome) {
                userData.nome = nome
            }
            if (email) {
                userData.email = email
            }
            if (cpf) {
                userData.cpf = cpf
            }
            if (telefone) {
                userData.telefone = String(telefone)
            }

            const response = await api.put(`/updateClient/${id}`,
                userData, {
                headers
            }
            )
            const client = response.data.client
            storageAddItem("client", client)
            handleCloseModal()
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.mensagem || "Ops, algo inesperado aconteceu")
            }
            return (error)
        }
    }

    async function getDataClient() {
        try {
            const headers = formatHeaderRequest()
            const client = storageGetItem("client", true)
            id = client.id
            console.log(client)
            const response = await api.get(`/clientDetails/${id}`, { headers })

            const dataClient = response.data.client
            const defaultValues = {
                nome: dataClient.nome,
                email: dataClient.email,
                cpf: dataClient.cpf,
                telefone: dataClient.telefone
            }
            reset(defaultValues)
        } catch (error) {
            return (error)
        }
    }

    useEffect(() => {
        getDataClient()
    }, [])

    return (
        <FormProvider {...userForm}>
            <div className="backdropModal">

                <div className="cardModalUpdateClient">
                    <div className="buttonAndTitleUpdateClient">
                        <h1 className="h1updateCliente"> <img src={iconClients} alt="" />Editar cliente</h1>
                        <button onClick={() => handleCloseModal()} className="buttonCloseModalClientUpdate"> <img src={imageClose} alt="Close modal" /></button>
                    </div>


                    <form className="formClientUpdate">
                        <div className="divInputLabelClientUpdate">
                            <label htmlFor="name" className="labelInputClientUpdate">Nome*</label>
                            <input className="inputModalClientUpdateG"{...register("nome", { required: true })} id="name" placeholder="Digite seu nome" />
                        </div>

                        <div className="divInputLabelClientUpdate" >
                            <label htmlFor="email" className="labelInputClientUpdate">E-mail*</label>
                            <input className="inputModalClientUpdateG" type="email" {...register("email", { required: true })} id="email" placeholder="Digite seu e-mail" />
                        </div>

                        <div className="divCpfTelefone">
                            <div className="divInputLabelClientRegistration" >
                                <label htmlFor="cpf" className="labelInputClientUpdate">CPF</label>
                                <input className="inputModalClientUpdateP" type="" {...register("cpf", { required: true })} id="cpf" placeholder="Digite seu CPF" />
                            </div>

                            <div className="divInputLabelClientUpdate">
                                <label htmlFor="telefone" className="labelInputClientUpdate">Telefone</label>
                                <input className="inputModalClientUpdateP" type="" {...register("telefone", { required: true })} id="telefone" placeholder="Digite seu Telefone" />
                            </div>

                        </div>

                        <div className="divInputLabelClientUpdate">
                            <label htmlFor="endereco" className="labelInputClientUpdate">Endereço</label>
                            <input className="inputModalClientUpdateG" type="" {...register("endereco")} id="endereco" placeholder="Digite o endereço" />
                        </div>

                        <div className="divInputLabelClientUpdate">
                            <label htmlFor="complemento" className="labelInputClientUpdate">Complemento</label>
                            <input className="inputModalClientUpdateG" type="" {...register("complemento")} id="complemento" placeholder="Digite o complemento" />
                        </div>

                        <div className="divCepBairro">
                            <div className="divInputLabelClientUpdate">
                                <label htmlFor="cep" className="labelInputClientUpdate">CEP</label>
                                <input className="inputModalClientUpdateP" type="cep" {...register("cep")} id="cep" placeholder="Digite o CEP" />
                            </div>

                            <div className="divInputLabelClientUpdate">
                                <label htmlFor="bairro" className="labelInputClientUpdate">Bairro</label>
                                <input className="inputModalClientUpdateP" type="bairro" {...register("bairro")} id="bairro" placeholder="Digite o bairro" />
                            </div>
                        </div>

                        <div className="divCidadeUf">
                            <div className="divInputLabelClientUpdate">
                                <label htmlFor="cidade" className="labelInputClientUpdate">Cidade</label>
                                <input className="inputModalClientUpdateM" type="cidade" {...register("cidade")} id="cidade" placeholder="Digite a cidade" />
                            </div>

                            <div className="divInputLabelClientUpdate">
                                <label htmlFor="uf" className="labelInputClientUpdate">UF</label>
                                <input className="inputModalClientUpdatePP" type="uf" {...register("uf")} id="uf" placeholder="Digite a UF" />
                            </div>
                        </div>


                        <div className="buttonsCancelarAplicar">
                            <button onClick={() => handleCloseModal()} className="buttonClientUpdateCancelar" type="button">Cancelar</button>
                            <button onClick={() => onSubmit()} className="buttonClientUpdateAplicar" type="button">Aplicar</button>
                        </div>






                    </form>
                </div>
            </div>
        </FormProvider >
    )



}