import "./style.css"
import "../../global.css"
import { useMainContext } from "../../context/mainContent"
import UserFormStep1 from "../../components/userRegistration/userformStep1"
import UserFormStep2 from "../../components/userRegistration/userformStep2"
import UserFormStep3 from "../../components/userRegistration/userformStep3"
import SideBar from "../../components/userRegistration/sideBar"
import { FormProvider, useForm } from "react-hook-form"
import { IUsersCreate } from "../../interfaces/user.interface"



export const UserRegistration = () => {

    const { step } = useMainContext()
    function backgroundColor(currentStep: number, divIndex: number) {
        if (divIndex === currentStep) {
            return "#0E8750"
        }
        return "#DEDEE9"

    }
    const formUser = useForm<IUsersCreate>({
        defaultValues: { nome: "", email: "", senha: "", confirmacaoSenha: "" }
    })

    return (
        <FormProvider {...formUser}>
            <div className="principalDivUserRegistration">

                <>

                    <SideBar
                        step={step}
                    />
                    <div className="userFormStepsBarProgress">
                        {step === 1 && <UserFormStep1 />}
                        {step === 2 && <UserFormStep2 />}
                        {step === 3 && <UserFormStep3 />}
                        <div>
                            <div className="barProgress">
                                <div style={{ backgroundColor: backgroundColor(step, 1) }}
                                    className="barra"></div>
                                <div style={{ backgroundColor: backgroundColor(step, 2) }}
                                    className="barra"></div>
                                <div style={{ backgroundColor: backgroundColor(step, 3) }}
                                    className="barra"></div>
                            </div>
                        </div>
                    </div>

                </>


            </div>
        </FormProvider>

    )

}




