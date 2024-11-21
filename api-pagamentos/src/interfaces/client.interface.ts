export interface IClients {
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    endereco?: string,
    complemento?: string,
    cep?: string,
    bairro?: string,
    cidade?: string,
    uf?: string
}

export interface IClientsTableHome {
    id: number,
    nome: string,
    cpf: string,

}

export interface IClientsHome {
    clientesEmdia: {
        clientes: IClientsTableHome[]
        quantidade: string
    }

    clientesInadimplentes: {
        clientes: IClientsTableHome[]
        quantidade: string
    }

}