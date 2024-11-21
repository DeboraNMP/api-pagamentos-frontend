import { LateralMenu } from "../../components/LateralMenu";
import { LoginComponentHome } from "../../components/LoginComponent";
import iconClients from "../../assets/iconClients1.svg"
import iconUpdateClient from "../../assets/iconUpdateClient.svg"
import "./style.css"
import "../../global.css"
import updateButton from "../../assets/iconEditar.svg"
import deleteButton from "../../assets/buttonDelete.svg"
import setas1 from "../../assets/setas1.svg"
import { formatHeaderRequest } from "../../utils/formatHeaderRequest";
import api from "../../api/api";
import { useEffect, useState } from "react";
import { IClients } from "../../interfaces/client.interface";
import { useParams } from "react-router-dom";
import { formatCurrencyToLocal, formatDateShort } from "../../utils/formats";
import ModalExcludeCharge from "../../components/ModalExcludeCharge";
import ModalChargeRegistration from "../../components/ModalChargeRegistration";
import { storageAddItem } from "../../utils/localStorage";
import ModalUpdateCharge from "../../components/ModalUpdateCharge";
import ModalUpdateClient from "../../components/ModalUpdateClient";
import { Charge, defaultValuesCharge } from "../TableCharges";

export function ClientDetails() {
    const [openModal, setOpenModal] = useState(false)
    const [openModalUpdateCharge, setOpenModalUpdateCharge] = useState(false)
    const [excluirCobranca, setExcluirCobranca] = useState(false)
    const [openModalChargeRegistration, setOpenModalChargeRegistration] = useState(false)
    const { id } = useParams()
    const [charges, setCharges] = useState<Charge[]>([])
    const [charge, setCharge] = useState<Charge>(defaultValuesCharge)
    const [client, setClient] = useState<IClients>({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        endereco: "",
        complemento: "",
        cep: "",
        bairro: "",
        cidade: "",
        uf: ""
    })
    const idClient = Number(id)


    async function openModalUpdateClient() {
        const currentClient = {
            ...client, id: idClient
        }
        setOpenModal(true)
        storageAddItem("client", currentClient
        )
    }

    async function getDataClient() {
        try {
            const headers = formatHeaderRequest()

            const response = await api.get(`/clientDetails/${id}`, { headers })
            setClient(response.data.client)
            setCharges(response.data.charges)

        } catch (error) {
            return (error)
        }
    }

    useEffect(() => {
        if (!openModal && !openModalUpdateCharge && !openModalChargeRegistration && !excluirCobranca) {
            getDataClient()
        }

    }, [openModal, openModalUpdateCharge, openModalChargeRegistration, excluirCobranca])


    return (
        <div className="divPrincipalClientDetails">

            <LateralMenu />

            <div className="containerContent">
                {
                    openModal && <ModalUpdateClient handleCloseModal={() => { setOpenModal(false) }} />
                }

                {
                    openModalUpdateCharge && <ModalUpdateCharge clientId={idClient} charge={charge} handleCloseModal={() => { setOpenModalUpdateCharge(false) }} />
                }

                {
                    openModalChargeRegistration && <ModalChargeRegistration
                        handleCloseModal={() => setOpenModalChargeRegistration(false)}
                        client={{ nome: client.nome, id: idClient }} />
                }

                {
                    excluirCobranca && <ModalExcludeCharge chargeId={charge.id_cob} handleCloseModal={() => setExcluirCobranca(false)} />
                }

                <div className="mainContent">
                    <div className="loginClientDetails">

                        <LoginComponentHome />
                    </div>
                    <div>
                        <h1 className="h1ClientDetails"><img className="imgIconClients" src={iconClients} alt="" />{client.nome}</h1>
                    </div>

                    <div className="tableDadosDoCliente" >

                        <div className="h1AndButtonEditarCliente">
                            <h1 className="h1DadosDoCliente">Dados do cliente</h1>
                            <button onClick={() => openModalUpdateClient()} className="buttonClientDetails"><img src={iconUpdateClient} alt="" />Editar cliente</button>
                        </div>

                        <table>
                            <thead>
                                <tr className="trThClientDetails">
                                    <th className="thClientDetails">E-mail</th>
                                    <th className="thClientDetails">Telefone</th>
                                    <th className="thClientDetails">CPF</th>
                                    <br />
                                    <th className="thClientDetails">Endereço</th>
                                    <th className="thClientDetails">Bairro</th>
                                    <th className="thClientDetails">Complemento</th>
                                    <th className="thClientDetails">CEP</th>
                                    <th className="thClientDetails">Cidade</th>
                                    <th className="thClientDetails">UF</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="trTdClientDetails" >
                                    <td className="tdClientDetails">{client.email}</td>
                                    <td className="tdClientDetails">{client.telefone}</td>
                                    <td className="tdClientDetails">{client.cpf}</td>
                                    <br />
                                    <td className="tdClientDetails">{client.endereco}</td>
                                    <td className="tdClientDetails">{client.bairro}</td>
                                    <td className="tdClientDetails">{client.complemento}</td>
                                    <td className="tdClientDetails">{client.cep}</td>
                                    <td className="tdClientDetails">{client.cidade}</td>
                                    <td className="tdClientDetails">{client.uf}</td>
                                </tr>
                            </tbody>

                        </table>

                    </div>

                    <div>

                        <div className="tableAndButtonNovaCobranca">
                            <div className="h1AndButtonNovaCobranca">
                                <h1 className="h1CobrancaDoCliente">Cobranças do cliente</h1>
                                <button onClick={() => setOpenModalChargeRegistration(true)} className="buttonNovaCobranca">+ Nova cobrança</button>
                            </div>

                            <table>
                                <thead>
                                    <tr className="trThClientDetails">

                                        <th className="thClientDetails"><img src={setas1} alt="" />ID Cob.</th>
                                        <th className="thClientDetails"><img src={setas1} alt="" />Data de venc.</th>
                                        <th className="thClientDetails">Valor</th>
                                        <th className="thClientDetails">Status</th>
                                        <th className="thClientDetails">Descrição</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        charges.map((ItemCharge) => {
                                            return (
                                                <tr key={ItemCharge.id_cob} >

                                                    <td className="tdClientDetails">{ItemCharge.id_cob}</td>
                                                    <td className="tdClientDetails">{formatDateShort(new Date(ItemCharge.data_venc))}</td>
                                                    <td className="tdClientDetails">{formatCurrencyToLocal(ItemCharge.valor / 100)}</td>
                                                    <td className="tdClientDetails">{ItemCharge.status}</td>
                                                    <td className="tdClientDetails">{ItemCharge.descricao}</td>

                                                    <td className="tdClientDetails">
                                                        <button className="buttonExcluirUpdateCharge" onClick={() => {
                                                            setOpenModalUpdateCharge(true)
                                                            setCharge(ItemCharge)

                                                        }}> <img src={updateButton} alt="Botão Editar" /></button>

                                                        <button className="buttonEditarUpdateCharge" onClick={() => {
                                                            setCharge(ItemCharge)
                                                            setExcluirCobranca(true)
                                                        }}><img src={deleteButton} alt="Botão Excluir" /></button>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>

            </div>
        </div>

    )
}