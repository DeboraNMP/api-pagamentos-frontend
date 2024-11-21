import { useFormContext } from "react-hook-form"
import { Link } from "react-router-dom";
import "./styleUserFormStep2.css"
import "../../global.css"
import api from "../../api/api";
import { useMainContext } from "../../context/mainContent";
import { AxiosError } from "axios";
import { Input } from "../input";
import { useState } from "react";

export default function UserFormStep2() {
    const { handleSetStep, handleSetUserRegister, userRegister } = useMainContext()
    const { watch } = useFormContext()
    const [passwordType, setPasswordType] = useState({
        passwordType: "password",
        confirmePassword: "password"
    })

    const onSubmit = async () => {
        const senha = watch("senha")
        const confirmacaoSenha = watch("confirmacaoSenha")

        if (!senha || !confirmacaoSenha) {
            return alert("All fields are mandatory.")
        }

        if (senha !== confirmacaoSenha) {
            return alert("Passwords must be the same.")
        }


        if (userRegister) {
            handleSetUserRegister({ ...userRegister, senha: "", confirmacaoSenha: "" })

        } else {
            handleSetUserRegister({ nome: "", email: "", senha, confirmacaoSenha })
        }

        const userData = {
            nome: userRegister?.nome,
            email: userRegister?.email,
            senha: senha
        }

        try {
            const response = await api.post("/signup", userData)

            if (response.status !== 201) {
                return alert(response.data)
            }

            handleSetStep()

        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.mensagem || "Something unexpected happened.")
            }
        }
    }

    function updateTypePassword(type: "passwordType" | "confirmePassword") {
        const updateType = passwordType[type] === "password" ? "text" : "password"
        setPasswordType({ ...passwordType, [type]: updateType })
    }

    return (
        <div className="divStep2">
            <h1 className="principalTextStep2">Escolha uma senha</h1>

            <form className="formCadastroStep2">
                <Input
                    label="Senha*"
                    type={passwordType.passwordType}
                    isTypePassword
                    onChangeType={() => updateTypePassword("passwordType")}
                    id="senha"
                    className="inputUserFormStep2"
                    classNameLabel="labelFormStep2"
                />

                <Input
                    label="Repita a senha*"
                    type={passwordType.confirmePassword}
                    isTypePassword
                    onChangeType={() => updateTypePassword("confirmePassword")}

                    id="confirmacaoSenha"
                    className="inputUserFormStep2"
                    classNameLabel="labelFormStep2"
                />

                <button type="button" className="buttonEntrarStep2" onClick={() => onSubmit()}>Entrar</button>
            </form>
            <div className="TextCliqueAquiStep2">

                <p className="pFooterStep2">Já possue uma conta? Faça seu <Link className="linkStep2" to="/login">Login</Link></p>

            </div>
        </div>
    )
}