export type TipoExercicio = "bola" | "fisico";

export type MedicaoExercicio = "acertos" | "repeticoes" | "tempo" | "concluido";

export type AtributoTreino =
    | "Arremesso"
    | "Finalização"
    | "Passe"
    | "Drible"
    | "Condicionamento"
    | "Mão Fraca"
    | "Defesa";

export type ExercicioTreino = {
    id: string;
    nome: string;
    tipo: TipoExercicio;
    atributo: AtributoTreino;
    medicao: MedicaoExercicio;
    meta: number;
    nivel?: string;
    posicoes?: string[];
    locais?: string[];
    instrucoes?: string;
    videoUrl?: string;
    objetivo?: string;
    equipamentos?: string[];
    espaco?: string;
    progressao?: string;
    regressao?: string;
    cuidados?: string;
    fonte?: string;
    nota?: number;
    faixa?: string;
};

export type ResultadoExercicio = {
    exercicioId: string;
    nome: string;
    tipo: TipoExercicio;
    atributo: AtributoTreino;
    medicao: MedicaoExercicio;
    meta: number;
    realizado: number;
};

export type RegistroTreino = {
    treinoId: string;
    nomeTreino: string;
    data: string; // ISO string
    exercicios: ResultadoExercicio[];
};

export type TreinoRecomendado = {
    id: string;
    nome: string;
    descricao: string;
    exercicios: ExercicioTreino[];
};