import "./style.css"
import setas1 from "../../assets/setas1.svg"
import updateButton from "../../assets/iconEditar.svg"
import deleteButton from "../../assets/buttonDelete.svg"
import iconLupa from "../../assets/lupa.svg"
import filter from "../../assets/filter.svg"
import iconCharge from "../../assets/iconCharge.svg"
import { LateralMenu } from "../../components/LateralMenu"
import { LoginComponentHome } from "../../components/LoginComponent"
import { useEffect, useState } from "react"
import ModalUpdateCharge from "../../components/ModalUpdateCharge"
import ModalExcludeCharge from "../../components/ModalExcludeCharge"
import api from "../../api/api"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest"

export type Charge = {
    id: number;
    descricao: string;
    id_cob: string;
    nome: string;
    status: string;
    usuario_id: number;
    valor: number;
    data_venc: string;
}

export const defaultValuesCharge = {
    id: 0, descricao: "",
    id_cob: "",
    nome: "",
    status: "",
    usuario_id: 0,
    valor: 0,
    data_venc: "",
}
export function TableCharges() {
    const [openModal, setOpenModal] = useState(false)
    const [excluirCobranca, setExcluirCobranca] = useState(false)
    const [charges, setCharges] = useState<Charge[]>([])
    const [charge, setCharge] = useState<Charge>(defaultValuesCharge)
    console.log(charges, "Charges")

    async function getDataAllCharges() {
        try {
            const headers = formatHeaderRequest()

            const response = await api.get(`/allCharges`, { headers })
            setCharges(response.data)

        } catch (error) {
            return (error)
        }
    }

    useEffect(() => {
        if (!openModal && !excluirCobranca) {
            getDataAllCharges()
        }

    }, [openModal, excluirCobranca])

    return (

        <div className="divBackgroundTableCharges">

            {
                openModal && <ModalUpdateCharge charge={charge} handleCloseModal={() => setOpenModal(false)} />
            }

            {
                excluirCobranca && <ModalExcludeCharge chargeId={charge.id_cob} handleCloseModal={() => setExcluirCobranca(false)} />
            }
            <LateralMenu />

            <div>

                <div>
                    <div className="loginTableCharges">
                        <p className="pTableCharges">Cobranças</p>
                        <LoginComponentHome />
                    </div>

                    <div className="divInputAndTop">

                        <div className="h1Cobranca">
                            <img className="iconCharge" src={iconCharge} alt="Icone de cobranças" />
                            <h1 className="h1TableChanges">Cobranças</h1>
                        </div>

                        <div className="divInputTableCharges">
                            <img className="imgFilter" src={filter} alt="Icone de filtro" />

                            <div className="inputTableCharges">
                                <input className="inputPesquisar" type="Pesquisar" placeholder="Pesquisar" />
                                <img className="imgLupa" src={iconLupa} alt="Lupa" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divTableCharges">

                    <table className="tableChange">
                        <thead>
                            <tr className="trThTableChanges">
                                <th className="thTableChanges"><img src={setas1} alt="" />Cliente</th>
                                <th className="thTableChanges"><img src={setas1} alt="" />ID Cob.</th>
                                <th className="thTableChanges"><img src={setas1} alt="" />Data de venc.</th>
                                <th className="thTableChanges">Valor</th>
                                <th className="thTableChanges">Status</th>
                                <th className="thTableChanges">Descrição</th>
                                <th className="thTableChanges"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                charges.map(charge => (
                                    <tr className="trTdTableChanges">
                                        <td className="tdTableChanges">{charge.nome}</td>
                                        <td className="tdTableChanges">{charge.id_cob}</td>
                                        <td className="tdTableChanges">{charge.data_venc}</td>
                                        <td className="tdTableChanges">{charge.valor}</td>
                                        <td className="tdTableChanges">{charge.status}</td>
                                        <td className="tdTableChanges">{charge.descricao}
                                        </td>
                                        <td>
                                            <div className="buttonsTableCharges">

                                                <button onClick={() => {
                                                    setCharge(charge)
                                                    setOpenModal(true)
                                                }} className="buttonUpdateTableCharges"><img src={updateButton} alt="" /></button>

                                                <div onClick={() => {
                                                    setCharge(charge)
                                                    setExcluirCobranca(true)
                                                }}>
                                                    <button className="buttonDeleteTableCharges"><img src={deleteButton} alt="" /></button>
                                                </div>



                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>

            </div>
        </div>


    )
}