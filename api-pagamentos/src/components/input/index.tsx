import { useFormContext } from "react-hook-form"
import closeEye from "../../assets/closeEye.svg"
import openEye from "../../assets/openEye.svg"
import "./style.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    classNameLabel: string,
    isTypePassword?: boolean,
    onChangeType?: () => void
    id: "nome" | "email" | "senha" | "confirmacaoSenha"
}

export function Input({ label, isTypePassword, onChangeType, classNameLabel, ...event }: InputProps) {
    const { register } = useFormContext()

    if (event.type === "password") {
        return (
            <div className="divInputType">
                <label className={classNameLabel} htmlFor="">{label}</label>
                <img className="eyeIcon" src={closeEye} onClick={onChangeType} alt="" />
                <input {...event}   {...register(event.id, { required: true })} />
            </div>
        )
    }

    if (isTypePassword) {
        return (
            <div className="divInputType">
                <label className={classNameLabel} htmlFor="">{label}</label>
                <img className="eyeIcon" src={openEye} onClick={onChangeType} alt="" />
                <input {...event}   {...register(event.id, { required: true })} />
            </div>
        )
    }

    return (
        <div className="divInputType">
            <label className={classNameLabel} htmlFor="">{label}</label>
            <input {...event}   {...register(event.id, { required: true })} />
        </div>
    )
}