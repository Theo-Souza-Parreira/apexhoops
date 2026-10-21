import { AtributoTreino, RegistroTreino, ResultadoExercicio } from "../tipos/Treino";

export const ATRIBUTOS: AtributoTreino[] = [
    "Arremesso",
    "Finalização",
    "Drible",
    "Condicionamento",
    "Mão Fraca",
    "Defesa",
];

// null = ainda sem avaliação (nenhum exercício daquele atributo foi feito)
export type NotasAtributos = Record<AtributoTreino, number | null>;

// Nota de 0 a 100 de um resultado. Vale para todas as medições:
// acertos, repetições, minutos e concluído (1 de 1 = 100, 0 de 1 = 0)
export function notaDoResultado(r: ResultadoExercicio): number {
    if (r.meta <= 0) return 0;
    return Math.min((r.realizado / r.meta) * 100, 100);
}

export function calcularAtributos(registros: RegistroTreino[]): NotasAtributos {
    const somas: Record<string, { total: number; qtd: number }> = {};

    for (const registro of registros) {
        for (const resultado of registro.exercicios ?? []) {
            const soma = (somas[resultado.atributo] ??= { total: 0, qtd: 0 });
            soma.total += notaDoResultado(resultado);
            soma.qtd += 1;
        }
    }

    const notas = {} as NotasAtributos;

    for (const atributo of ATRIBUTOS) {
        const soma = somas[atributo];
        notas[atributo] = soma ? Math.round(soma.total / soma.qtd) : null;
    }

    return notas;
}