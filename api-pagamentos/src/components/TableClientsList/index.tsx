import "./style.css"
import "../../global.css"
import iconCobrancaClient from "../../assets/iconCobrancaClient.svg"
import { LateralMenu } from "../LateralMenu"
import filter from "../../assets/filter.svg"
import iconClients from "../../assets/iconClients1.svg"
import iconLupa from "../../assets/lupa.svg"
import setas from "../../assets/setas.svg"
import { LoginComponentHome } from "../LoginComponent"
import { useEffect, useState } from "react"
import ModalClientRegitration from "../ModalClientRegistration"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest"
import api from "../../api/api"
import imgInadimplente from "../../assets/inadimplente.svg"
import imgEmDia from "../../assets/emdia.svg"
import { Link } from "react-router-dom"
import ModalChargeRegistration from "../ModalChargeRegistration"

export interface ITableClientsList {
    id: number,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    status: string,
    criarCobranca: string
}

export type IClientCharge = {
    id: number,
    nome: string
}





export function TableClientsList() {
    const [modalRegistration, setModalRegistration] = useState(false)
    const [modalChargeRegistration, setModalChargeRegistration] = useState(false)
    const [clientSelected, setClientSelected] = useState<IClientCharge>({ nome: "", id: 0 })
    const [clients, setClients] = useState<ITableClientsList[]>([])

    async function getDataClient() {
        try {
            const headers = formatHeaderRequest()
            const response = await api.get(`/consultClient`, { headers })
            setClients(response.data)

        } catch (error) {
            return (error)
        }
    }

    function openModalRegistrationCharge(currentClient: ITableClientsList) {
        setModalChargeRegistration(true)
        setClientSelected(currentClient)
    }

    useEffect(() => {
        if (!modalRegistration) {
            getDataClient()
        }
    }, [modalRegistration])

    return (
        <div className="mainBackground">
            {
                modalRegistration && <ModalClientRegitration handleCloseModal={() => setModalRegistration(false)} />
            }

            {
                modalChargeRegistration && <ModalChargeRegistration
                    handleCloseModal={() => setModalChargeRegistration(false)}
                    client={clientSelected} />
            }

            <div>
                <LateralMenu />
            </div>

            <div className="divBakground">
                <div>
                    <div className="divTop">
                        <p className="pTableClientList">Clientes</p>
                        <LoginComponentHome />
                    </div>

                    <div className="divGlobalInputButton">

                        <div className="divH1WithButtonAndInput">
                            <img className="iconClients" src={iconClients} alt="Icone de clientes" />
                            <h1 className="h1TableClientList">Clientes</h1>
                        </div>

                        <div className="divInput">
                            <button onClick={() => setModalRegistration(true)} className="buttonAdicionarCliente"> + Adicionar cliente</button>
                            <img className="imgFilter" src={filter} alt="Icone de filtro" />
                            <input className="inputPesquisar" type="Pesquisar" placeholder="Pesquisar" />
                            <img src={iconLupa} alt="Lupa" />
                        </div>

                    </div>
                </div>

                <div className="tableContainer">
                    <table className="tableTag">
                        <thead >
                            <tr className="trThTableClientList">

                                <th className="thTableClientList"><img src={setas} alt="" /></th>
                                <th className="thTableClientList">CPF</th>
                                <th className="thTableClientList">E-mail</th>
                                <th className="thTableClientList">Telefone</th>
                                <th className="thTableClientList">Status</th>
                                <th className="thTableClientList">Criar Cobrança</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients.map((client) => {
                                    return (
                                        <tr key={client.id} className="trTdTableClientList">

                                            <td className="tdTableClientList"><Link to={`/clientDetails/${client.id}`} >{client.nome}</Link></td>
                                            <td className="tdTableClientList">{client.cpf}</td>
                                            <td className="tdTableClientList">{client.email}</td>
                                            <td className="tdTableClientList">{client.telefone}</td>
                                            <td className="tdTableClientList"><img className="tagStatusClient" src={client.status === "Inadimplente" ? imgInadimplente : imgEmDia} alt="" /></td>
                                            <td className="tdTableClientList"><button className="buttonClientList" onClick={() => { openModalRegistrationCharge(client) }}><img src={iconCobrancaClient} alt="" /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

    )
}