import { MedicaoExercicio } from "@/types/Treino";

export const Medicoes: Record<MedicaoExercicio, { rotulo: string; unidade: string }> = {
    acertos:    { rotulo: "Acertos",       unidade: "acertos" },
    repeticoes: { rotulo: "Repetições",    unidade: "repetições" },
    tempo:      { rotulo: "Minutos",       unidade: "minutos" },
    concluido:  { rotulo: "Fez certinho?", unidade: "" },
};

export const textoMeta = (medicao: MedicaoExercicio, meta: number) =>
    medicao === "concluido"
        ? "Meta: concluir o exercício"
        : `Meta: ${meta} ${Medicoes[medicao].unidade}`;

export const textoResultado = (
    medicao: MedicaoExercicio,
    meta: number,
    realizado: string
) => {
    if (medicao === "concluido") return realizado === "1" ? "Sim" : "Não";
    return `${realizado || 0} de ${meta} ${Medicoes[medicao].unidade}`;
};