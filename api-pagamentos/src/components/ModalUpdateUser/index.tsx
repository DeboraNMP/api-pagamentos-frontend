import { FormProvider, useForm } from "react-hook-form"
import "../../global.css"
import "./style.css"
import { IUsersUpdate } from "../../interfaces/user.interface"
import { Input } from "../input"
import { useEffect, useState } from "react"
import imageClose from "../../assets/close.svg"
import imageSucessUpdate from "../../assets/imgsucessupdate.svg"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest"
import api from "../../api/api"
import { storageAddItem, storageGetItem } from "../../utils/localStorage"
import { AxiosError } from "axios"

interface IModalUpdateUserDrops {
    handleCloseModal: () => void
    updateDataUser: () => void
}

export default function ModalUpdateUser({ handleCloseModal, updateDataUser }: IModalUpdateUserDrops) {
    const [step, setStep] = useState(1)

    const [passwordType, setPasswordType] = useState({
        passwordType: "password",
        confirmePassword: "password"
    })

    const userForm = useForm<IUsersUpdate>()
    const { register, watch, reset } = userForm

    const onSubmit = async () => {
        const nome = watch("nome")
        const email = watch("email")
        const senha = watch("senha")
        const confirmacaoSenha = watch("confirmacaoSenha")
        const cpf = watch("cpf")
        const telefone = watch("telefone")

        if (!nome || !email || !senha || !confirmacaoSenha) {
            return alert("Nome, e-mail, senha e confirmação de senha são obrigatórios.")
        }

        if (senha !== confirmacaoSenha) {
            return alert("As senhas devem ser iguais.")
        }

        try {
            const headers = formatHeaderRequest()
            const userData: IUsersUpdate = {
                nome, email, senha
            }

            if (cpf) {
                userData.cpf = cpf
            }

            if (telefone) {
                userData.telefone = String(telefone)
            }

            const response = await api.put("/updateUser",
                userData, {
                headers
            }
            )

            const user = response.data.usuario
            storageAddItem("user", user)
            updateDataUser()
            setStep(step + 1)
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.mensagem || "ops algo inesperado aconteceu.")
            }
            return (error)
        }

    }

    function updateTypePassword(type: "passwordType" | "confirmePassword") {
        const updateType = passwordType[type] === "password" ? "text" : "password"
        setPasswordType({ ...passwordType, [type]: updateType })

    }

    useEffect(() => {
        if (step > 1) {
            setTimeout(() => {
                handleCloseModal()
            }, 2000);
        }

    }, [step])

    async function getDataUser() {
        try {
            const headers = formatHeaderRequest()
            const user = storageGetItem("user", true)
            const id = user.id

            const response = await api.get(`/userDetails/${id}`, { headers })

            const dataUser = response.data.user
            const defaultValues = {
                nome: dataUser.nome,
                email: dataUser.email,
                cpf: dataUser.cpf,
                telefone: dataUser.telefone,
                senha: "",
                confirmacaoSenha: ""

            }
            reset(defaultValues)

        } catch (error) {
            return (error)
        }
    }

    useEffect(() => {
        getDataUser()
    }, [])

    return (
        <FormProvider {...userForm}>
            <div className="backdropModal">

                {
                    step === 1 && <div className="cardModal">
                        <h1 className="h1EditeSeuCadastro">Edite seu cadastro</h1>

                        <button onClick={() => handleCloseModal()} className="buttonCloseModal"> <img src={imageClose} alt="Close modal" /></button>

                        <form className="formUpdate">
                            <div className="divInputLabel">
                                <label htmlFor="name" className="labelInput">Nome*</label>
                                <input className="inputModalUpdateUser"{...register("nome", { required: true })} id="name" placeholder="Digite seu nome" />
                            </div>

                            <div className="divInputLabel" >
                                <label htmlFor="email" className="labelInput">E-mail*</label>
                                <input className="inputModalUpdateUser" type="email" {...register("email", { required: true })} id="email" placeholder="Digite seu e-mail" />

                            </div>

                            <div className="divCpfTelefone">
                                <div className="divInputLabel" >
                                    <label htmlFor="cpf" className="labelInput">CPF</label>
                                    <input className="inputModal" type="" {...register("cpf", { required: true })} id="cpf" placeholder="Digite seu CPF" />
                                </div>

                                <div className="divInputLabel">
                                    <label htmlFor="telefone" className="labelInput">Telefone</label>
                                    <input className="inputModal" type="" {...register("telefone", { required: true })} id="telefone" placeholder="Digite seu Telefone" />
                                </div>

                            </div>

                            <div className="divInputLabel">
                                <Input
                                    label="Nova senha*"
                                    type={passwordType.passwordType}
                                    isTypePassword
                                    onChangeType={() => updateTypePassword("passwordType")}
                                    id="senha"
                                    className="inputModalUpdateUser"
                                    classNameLabel="labelInput"
                                    placeholder="• • • • • • • •"
                                />
                            </div>

                            <div className="divInputLabel">
                                <Input
                                    label="Confirmar senha*"
                                    type={passwordType.confirmePassword}
                                    isTypePassword
                                    onChangeType={() => updateTypePassword("confirmePassword")}

                                    id="confirmacaoSenha"
                                    className="inputModalUpdateUser"
                                    classNameLabel="labelInput"
                                    placeholder="• • • • • • • •"

                                />
                            </div>

                            <div className="buttonModalUpdate">
                                <button
                                    onClick={() => onSubmit()}
                                    className="buttonPrimary buttonUpdateUser"
                                    type="button">Aplicar</button>
                            </div>

                        </form>
                    </div>
                }
                {step === 2 &&

                    <img src={imageSucessUpdate} alt="Cadastro realizado com sucesso!" />

                }
            </div>
        </FormProvider >
    )



}

