import { useFormContext } from "react-hook-form"
import { Link } from "react-router-dom";
import "../../global.css"
import "./styleUseFormStep1.css"
import { useMainContext } from "../../context/mainContent";

export default function UserFormStep1() {

    const { handleSetStep, handleSetUserRegister, userRegister } = useMainContext()
    const { register, watch } = useFormContext()

    const onSubmit = async () => {
        const nome = watch("nome")
        const email = watch("email")

        if (!nome || !email) {
            return alert("All fields are mandatory.")
        }

        if (userRegister) {
            handleSetUserRegister({ ...userRegister, nome, email })

        } else {
            handleSetUserRegister({ nome, email, senha: "", confirmacaoSenha: "" })
        }

        handleSetStep()
    }

    return (
        <div className="principalDivStep1">

            <h1 className="principalTextStep1">Adicione seus dados</h1>

            <form className="formCadastroStep1" >

                <label htmlFor="name" className="labelUserFormStep1">Nome*</label>
                <input className="inputUserFormStep1"{...register("nome", { required: true })} id="name" placeholder="Digite seu nome" />

                <label htmlFor="email" className="labelUserFormStep1">E-mail*</label>
                <input className="inputUserFormStep1" type="email" {...register("email", { required: true })} id="email" placeholder="Digite seu e-mail" />

                <button type="button" className="buttonCadastrarStep1" onClick={() => onSubmit()}>Continuar</button>

                <p className="footerStep1">Já possue uma conta? Faça seu <Link className="linkFooter" to="/login">Login</Link></p>
            </form>

        </div>
    )
}