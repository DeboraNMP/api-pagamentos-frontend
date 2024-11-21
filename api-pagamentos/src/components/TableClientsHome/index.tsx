import { Link } from "react-router-dom"
import style from "./style.module.css"
import { IClientsTableHome } from "../../interfaces/client.interface"

export interface ITableHomeProps {
    label: string,
    color: string,
    Icon: React.ComponentType,
    data: {
        clientes: IClientsTableHome[]
        quantidade: string
    }
}

export function TableClientsHome({ label, color, Icon, data }: ITableHomeProps) {

    return (
        <div>

            <div className={style.h1TableHome}>
                <Icon />
                <h1 className={style.h1TextPrincipal}>
                    {label}
                </h1>

                <strong className={`${style[color]} ${style.strongTableHome}`}>
                    {data.quantidade}
                </strong>
            </div>

            <table className={style.table}>
                <thead >
                    <tr className={style.trTh}>
                        <th className={style.th}>Cliente</th>
                        <th className={style.th}>ID da cob.</th>
                        <th className={style.th}>CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {data.clientes.map(cliente => {
                        return (
                            <tr key={cliente.id} className={style.trTd}>
                                <td className={style.td}>{cliente.nome}</td>
                                <td className={style.td}>{cliente.id}</td>
                                <td className={style.td}>{cliente.cpf}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className={style.divLinkVerTodos}>
                <Link className={style.linkVerTodos} to={""}>Ver todos</Link>
            </div>

        </div>

    )
}