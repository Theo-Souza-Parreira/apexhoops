export type MedicaoExercicio = "acertos" | "repeticoes" | "tempo" | "concluido";

export type AtributoTreino =
    | "Arremesso"
    | "Finalização"
    | "Drible"
    | "Condicionamento"
    | "Mão Fraca"
    | "Defesa";

export type ResultadoExercicio = {
    exercicioId: string;
    nome: string;
    tipo: "bola" | "fisico";
    atributo: AtributoTreino;
    medicao?: MedicaoExercicio; // registros antigos não têm
    meta: number;
    realizado: number;
};

export type RegistroTreino = {
    treinoId: string;
    nomeTreino: string;
    data: string;
    exercicios: ResultadoExercicio[];
};