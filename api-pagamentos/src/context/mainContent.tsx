import { createContext, ReactNode, useContext, useState } from "react";
import { IUsersCreate } from "../interfaces/user.interface";


const MainContext = createContext<{
    handleSetUserRegister: (userData: IUsersCreate) => void,
    handleSetStep: () => void,
    handleResetStep: () => void,
    userRegister: IUsersCreate | null,
    step: number

} | null>(null)

interface IProps {
    children: ReactNode
}


export default function MainProvider({ children }: IProps) {

    const [userRegister, setUserRegister] = useState<IUsersCreate | null>(null)
    const [step, setStep] = useState<number>(1)

    const handleSetUserRegister = (userData: IUsersCreate) => {
        setUserRegister(userData)
    }

    const handleSetStep = () => {
        setStep(step + 1)
    }

    const handleResetStep = () => {
        setStep(1)
    }
    return (
        < MainContext.Provider value={{ handleSetUserRegister, handleSetStep, handleResetStep, userRegister, step }}>
            {children}
        </MainContext.Provider >
    )
}

export const useMainContext = () => {
    const context = useContext(MainContext)
    if (!context) {
        throw new Error("sem dados do usuario")
    }
    return context
}



