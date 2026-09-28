// Tipos usados pela tela de Treinos.
// Pensados para o futuro salvamento em: usuarios/{uid}/registros

export type TipoExercicio = "bola" | "fisico";

export type ExercicioTreino = {
    id: string;
    nome: string;
    tipo: TipoExercicio;
    meta: number;
    videoUrl?: string; // preenchido quando a gravação de vídeo existir
};

export type ResultadoExercicio = {
    exercicioId: string;
    nome: string;
    tipo: TipoExercicio;
    meta: number;
    realizado: number;
};

export type RegistroTreino = {
    treinoId: string;
    nomeTreino: string;
    data: string; // ISO string
    exercicios: ResultadoExercicio[];
};