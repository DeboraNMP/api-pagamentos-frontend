import { FormProvider, useForm } from "react-hook-form"
import "./style.css"
import imageClose from "../../assets/close.svg"
import { IClients } from "../../interfaces/client.interface"
import iconClients from "../../assets/iconClients1.svg"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest"
import api from "../../api/api"
import { AxiosError } from "axios"

interface IClientsRegister {
    handleCloseModal: () => void

}

export default function ModalClientRegitration({ handleCloseModal }: IClientsRegister) {
    const userForm = useForm<IClients>()
    const { register, watch } = userForm

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
            return alert("Todos os dados são obrigatórios.")
        }

        try {
            const headers = formatHeaderRequest()
            const userData: IClients = {
                nome, email, cpf, telefone,
            }

            if (endereco) {
                userData.endereco = endereco
            }

            if (complemento) {
                userData.complemento = complemento
            }

            if (cep) {
                userData.cep = cep
            }

            if (bairro) {
                userData.bairro = bairro
            }

            if (cidade) {
                userData.cidade = cidade
            }

            if (uf) {
                userData.uf = uf
            }

            await api.post("/registerClient",
                userData, {
                headers
            }
            )

            handleCloseModal()

        } catch (error) {
            if (error instanceof AxiosError) {

                alert(error.response?.data.mensagem || "ops algo inesperado aconteceu.")
            }
            return (error)
        }
    }
    return (
        <FormProvider {...userForm}>
            <div className="backdropModal">

                <div className="cardModal cardClientRegistrationModal">

                    <h1 className="h1CadastroDoCliente"> <img src={iconClients} alt="" />Cadastro do cliente</h1>

                    <button onClick={() => handleCloseModal()} className="buttonCloseModalClientRegistration"> <img src={imageClose} alt="Close modal" /></button>

                    <form className="formClientRegistration">
                        <div className="divInputLabelClientRegistration">
                            <label htmlFor="name" className="labelInputClientRegistration">Nome*</label>
                            <input className="inputModalClientRegistrationG"{...register("nome", { required: true })} id="name" placeholder="Digite seu nome" />
                        </div>

                        <div className="divInputLabelClientRegistration" >
                            <label htmlFor="email" className="labelInputClientRegistration">E-mail*</label>
                            <input className="inputModalClientRegistrationG" type="email" {...register("email", { required: true })} id="email" placeholder="Digite seu e-mail" />
                        </div>


                        <div className="divCpfTelefone">
                            <div className="divInputLabelClientRegistration" >
                                <label htmlFor="cpf" className="labelInputClientRegistration">CPF*</label>
                                <input className="inputModalClientRegistrationP" type="" {...register("cpf", { required: true })} id="cpf" placeholder="Digite seu CPF" />
                            </div>

                            <div className="divInputLabelClientRegistration">
                                <label htmlFor="telefone" className="labelInputClientRegistration">Telefone*</label>
                                <input className="inputModalClientRegistrationP" type="" {...register("telefone", { required: true })} id="telefone" placeholder="Digite seu Telefone" />
                            </div>

                        </div>

                        <div className="divInputLabelClientRegistration">
                            <label htmlFor="endereco" className="labelInputClientRegistration">Endereço</label>
                            <input className="inputModalClientRegistrationG" type="" {...register("endereco")} id="endereco" placeholder="Digite o endereço" />
                        </div>

                        <div className="divInputLabelClientRegistration">
                            <label htmlFor="complemento" className="labelInputClientRegistration">Complemento</label>
                            <input className="inputModalClientRegistrationG" type="" {...register("complemento")} id="complemento" placeholder="Digite o complemento" />
                        </div>

                        <div className="divCepBairro">
                            <div className="divInputLabelClientRegistration">
                                <label htmlFor="cep" className="labelInputClientRegistration">CEP</label>
                                <input className="inputModalClientRegistrationP" type="cep" {...register("cep")} id="cep" placeholder="Digite o CEP" />
                            </div>

                            <div className="divInputLabelClientRegistration">
                                <label htmlFor="bairro" className="labelInputClientRegistration">Bairro</label>
                                <input className="inputModalClientRegistrationP" type="bairro" {...register("bairro")} id="bairro" placeholder="Digite o bairro" />
                            </div>
                        </div>

                        <div className="divCidadeUf">
                            <div className="divInputLabelClientRegistration">
                                <label htmlFor="cidade" className="labelInputClientRegistration">Cidade</label>
                                <input className="inputModalClientRegistrationM" type="cidade" {...register("cidade")} id="cidade" placeholder="Digite a cidade" />
                            </div>

                            <div className="divInputLabelClientRegistration">
                                <label htmlFor="uf" className="labelInputClientRegistration">UF</label>
                                <input className="inputModalClientRegistrationPP" type="uf" {...register("uf")} id="uf" placeholder="Digite a UF" />
                            </div>
                        </div>


                        <div className="buttonsCancelarAplicar">
                            <button onClick={() => handleCloseModal()}
                                className="buttonClientRegistrationCancelar"
                                type="button">Cancelar</button>

                            <button onClick={() => onSubmit()}
                                className="buttonClientRegistrationAplicar"
                                type="button">Aplicar</button>
                        </div>

                    </form>
                </div>
            </div>
        </FormProvider >
    )



}
