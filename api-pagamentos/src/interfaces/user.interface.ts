export interface IUsersCreate {
    nome: string;
    email: string;
    senha: string;
    confirmacaoSenha?: string
}

export interface IUsersUpdate extends IUsersCreate {
    cpf?: string,
    telefone?: string,
}