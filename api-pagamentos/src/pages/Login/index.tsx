import { SubmitHandler, useForm } from "react-hook-form"
import { ILogin } from "../../interfaces/login.interface"
import api from "../../api/api"
import "./style.css"
import { Link, useNavigate } from "react-router-dom"

export const LoginUser = () => {

    const { register, handleSubmit, formState } = useForm<ILogin>()
    const { errors } = formState
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {

        if (!data.email || !data.senha) {
            return alert("All fields are mandatory.")
        }

        try {
            const response = await api.post("/login", data)
            const user = JSON.stringify(response.data.user)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", user)
            navigate("/home")

        } catch (error) {
            return (error)
        }
    }
    return (

        <div className="principalDiv">

            <img className="imgLogin" src="./src/assets/imgLogin.svg" alt="Imagem do Login" />
            <p className="textImgLogin">Gerencie todos os pagamentos de sua empresa em um só lugar.</p>


            <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="primaryTextLogin">Faça seu login!</h1>
                <label htmlFor="email" className="pLogin" >E-mail</label>
                <input id="email" className="emailLogin inputTexto"
                    {...register("email", { required: true })} placeholder="Digite seu e-mail" />
                {errors.email && <p className="requiredField">Este campo é obrigatório!</p>}

                <label htmlFor="password" className="pLogin"> Senha <Link className="pPass" to="" >Esqueceu a senha?</Link></label>
                <input id="password" className="passwordLogin inputTexto" type="password"
                    {...register("senha", { required: true })} placeholder="Digite sua senha" />
                {errors.senha && <p className="requiredField">Este campo é obrigatório!</p>}


                <button className="buttonEntrar" type="submit">Entrar</button>
                <p className="pFooter">Ainda não possui uma conta? <Link to={"/signup"}>Cadastre-se</Link></p>
            </form>
        </div>

    )

}