import { TableChargesHome } from "../../components/TableChargesHome"
import { TableClientsHome } from "../../components/TableClientsHome"
import "./style.css"
import iconClientInadinplente from "../../assets/ícone-ClienteInadimplente-Color.svg"
import iconClientEmDia from "../../assets/iconClientEmDia.svg"
import ResumeHome from "../../components/ResumeHome"
import { LoginComponentHome } from "../../components/LoginComponent"
import { LateralMenu } from "../../components/LateralMenu"
import { useEffect, useState } from "react"
import api from "../../api/api"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest"
import { IClientsHome } from "../../interfaces/client.interface"
import { IChargesHome } from "../../interfaces/charges.interface"


export const Home = () => {
    const [clients, setClients] = useState<IClientsHome>({
        clientesEmdia: {
            clientes: [],
            quantidade: "0"
        },

        clientesInadimplentes: {
            quantidade: "0",
            clientes: []

        }
    })

    const [charges, setCharges] = useState<IChargesHome>({
        "Pendente": {
            "charges": [],
            "total": 0,
            "quantidade": 0
        },
        "Paga": {
            "charges": [],
            "total": 0,
            "quantidade": 0
        },
        "Vencida": {
            "charges": [],
            "total": 0,
            "quantidade": 0
        }
    })

    async function getDataClient() {
        try {
            const headers = formatHeaderRequest()
            const response = await api.get(`/dashboardClients`, { headers })
            setClients(response.data)

        } catch (error) {
            return (error)
        }
    }

    async function getDataCharge() {
        try {
            const headers = formatHeaderRequest()
            const response = await api.get(`/dashboardCharges`, { headers })
            setCharges(response.data)

        } catch (error) {
            return (error)
        }
    }

    useEffect(() => {
        getDataCharge()
        getDataClient()
    }, [])

    return (

        <div className="divPrincipal">

            <div>
                <LateralMenu />
            </div>

            <div className="divconteudoPrincipal">


                <div className="loginHome">
                    <h1 className="textPrincialHome">Resumo de cobranças</h1>
                    <LoginComponentHome />
                </div>

                <div className="divResume">
                    <ResumeHome
                        label="Cobranças Pagas"
                        amount={charges.Paga.total / 100}
                        type="paga"
                    />
                    <ResumeHome
                        label="Cobranças Vencidas"
                        amount={charges.Vencida.total / 100}
                        type="vencida"
                    />
                    <ResumeHome
                        label="Cobranças Previstas"
                        amount={charges.Pendente.total / 100}
                        type="prevista"
                    />
                </div>


                <div className="divTableHome">
                    <TableChargesHome
                        label="Cobranças Vencidas"
                        data={charges.Vencida}
                        color="redColor" />
                    <TableChargesHome
                        label="Cobranças Previstas"
                        data={charges.Pendente}
                        color="yellowColor" />
                    <TableChargesHome
                        label="Cobranças Pagas"
                        data={charges.Paga}
                        color="greenColor" />
                </div>

                <div className="divTableHome">
                    <TableClientsHome
                        label="Clientes Inadimplentes"
                        data={clients.clientesInadimplentes}
                        color="redColor"
                        Icon={() => <img src={iconClientInadinplente} />}

                    />

                    <TableClientsHome
                        label="Clientes Em Dia"
                        data={clients.clientesEmdia}
                        color="greenColor"
                        Icon={() => <img src={iconClientEmDia} />}

                    />
                </div>

            </div>
        </div>

    )
}
