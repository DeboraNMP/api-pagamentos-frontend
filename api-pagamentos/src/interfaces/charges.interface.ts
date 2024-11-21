export interface IChargesTableHome {
    id: number,
    nome: string,
    valor: number
}

export interface IChargesHome {
    Pendente: {
        charges: IChargesTableHome[],
        total: number,
        quantidade: number
    },
    Paga: {
        charges: IChargesTableHome[],
        total: number,
        quantidade: number
    },
    Vencida: {
        charges: IChargesTableHome[],
        total: number,
        quantidade: number
    }
}

export interface IChargeClientDetails {
    data_venc: Date,
    descricao: string,
    id_cob: number,
    status: string
    valor: number
}