export type TipoExercicio = "bola" | "fisico";

export type MedicaoExercicio = "acertos" | "repeticoes" | "tempo" | "concluido";

export type AtributoTreino =
    | "Arremesso"
    | "Finalização"
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
    meta: number;          // para "concluido", use 1
    nivel?: string;
    posicoes?: string[];
    instrucoes?: string;
    videoUrl?: string;
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