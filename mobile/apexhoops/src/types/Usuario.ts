export type UsuarioTipo = {
    codigo: string
    nome: string
    email: string
    senha: string
    permissao: string

    dataNascimento: string
    altura: string
    peso: string

    posicao: string
    mao: string
    nivel: string

    experiencia: string

    // novos
    foco?: string                   // "basquete" | "fisico" | "ambos"
    habilidadesBasquete?: string[]  // nomes dos atributos do radar
    habilidadesFisico?: string[]    // "resistencia" | "forca" | "agilidade" | "explosao"
    frequencia?: string
    tempoTreino?: string
    locais?: string[]

    autenticacao: string
}