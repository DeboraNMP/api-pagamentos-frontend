import { Link } from "react-router-dom"
import style from "./style.module.css"
import { IChargesTableHome } from "../../interfaces/charges.interface"
import { formatCurrencyToLocal } from "../../utils/formats"

export interface ITableHomeProps {
    label: string,
    color: string
    data: {
        charges: IChargesTableHome[],
        total: number,
        quantidade: number
    }
}

export function TableChargesHome({ label, color, data }: ITableHomeProps) {
    return (
        <div>

            <div className={style.h1TableHome}>

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
                        <th className={style.th}>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.charges.map(charge => (
                            <tr key={charge.id} className={style.trTd}>
                                <td className={style.td}>{charge.nome}</td>
                                <td className={style.td}>{charge.id}</td>
                                <td className={style.td}>{formatCurrencyToLocal(charge.valor / 100)}</td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>

            <div className={style.divLinkVerTodos}>
                <Link className={style.linkVerTodos} to={""}>Ver todos</Link>
            </div>

        </div>

    )
}