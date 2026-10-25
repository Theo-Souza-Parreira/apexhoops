import {
    AtributoTreino,
    ExercicioTreino,
    TreinoRecomendado,
} from "../tipos/Treino";
import { NotasAtributos } from "./atributos";

export type PerfilUsuario = {
    nivel?: string;
    posicao?: string;
    foco?: string;
    tempoTreino?: string;
    locais?: string[];
    habilidadesBasquete?: string[];
};

const TODOS_NIVEIS = ["Iniciante", "Intermediário", "Avançado"];

function niveisAceitos(nivel?: string): string[] {
    if (nivel === "Avançado") return [...TODOS_NIVEIS];
    if (nivel === "Intermediário") return ["Iniciante", "Intermediário"];
    return ["Iniciante"]; // default e Iniciante
}

function quantidadeExercicios(tempoTreino?: string): number {
    switch (tempoTreino) {
        case "15": return 2;
        case "30": return 3;
        case "45": return 4;
        case "60": return 5;
        default:   return 3;
    }
}

function tiposDoFoco(foco?: string): Array<"bola" | "fisico"> {
    if (foco === "basquete") return ["bola"];
    if (foco === "fisico")   return ["fisico"];
    return ["bola", "fisico"]; // ambos ou default
}

function atributoMaisFraco(
    atributos: NotasAtributos,
    habilidadesBasquete?: string[]
): AtributoTreino {
    let menor: { atributo: AtributoTreino; nota: number } | null = null;

    for (const [atributo, nota] of Object.entries(atributos) as Array<
        [AtributoTreino, number | null]
    >) {
        if (nota === null) continue;
        if (!menor || nota < menor.nota) {
            menor = { atributo, nota };
        }
    }

    // Fallback 1: primeira habilidade marcada no cadastro
    if (!menor && habilidadesBasquete && habilidadesBasquete.length > 0) {
        const primeira = habilidadesBasquete[0] as AtributoTreino;
        if (primeira in atributos) return primeira;
    }

    // Fallback 2: Arremesso como padrão
    return "Arremesso";
}

type Filtros = {
    niveis: string[] | null;
    posicao: string | null;
    locais: string[] | null;
};

function aplicarFiltros(
    catalogo: ExercicioTreino[],
    tipo: "bola" | "fisico",
    filtros: Filtros
): ExercicioTreino[] {
    return catalogo.filter((ex) => {
        if (ex.tipo !== tipo) return false;

        if (
            filtros.niveis &&
            ex.nivel &&
            !filtros.niveis.includes(ex.nivel)
        ) return false;

        if (
            filtros.posicao &&
            ex.posicoes &&
            !ex.posicoes.includes(filtros.posicao)
        ) return false;

        if (
            filtros.locais &&
            ex.locais &&
            !ex.locais.some((l) => filtros.locais!.includes(l))
        ) return false;

        return true;
    });
}

/**
 * Afrouxa os filtros na ordem:
 *   1. tudo
 *   2. libera o nível
 *   3. libera a posição
 *   4. libera o local
 */
function poolComAfrouxamento(
    catalogo: ExercicioTreino[],
    tipo: "bola" | "fisico",
    niveisIniciais: string[],
    posicao: string | undefined,
    locais: string[] | undefined
): ExercicioTreino[] {

    const tentativas: Filtros[] = [
        { niveis: niveisIniciais, posicao: posicao ?? null, locais: locais ?? null },
        { niveis: null,           posicao: posicao ?? null, locais: locais ?? null },
        { niveis: null,           posicao: null,            locais: locais ?? null },
        { niveis: null,           posicao: null,            locais: null },
    ];

    for (const filtros of tentativas) {
        const pool = aplicarFiltros(catalogo, tipo, filtros);
        if (pool.length > 0) return pool;
    }

    return [];
}

function escolherExercicios(
    pool: ExercicioTreino[],
    quantidade: number,
    atributoFraco: AtributoTreino
): ExercicioTreino[] {
    const ordenado = [...pool].sort((a, b) => {
        const pa = a.atributo === atributoFraco ? 0 : 1;
        const pb = b.atributo === atributoFraco ? 0 : 1;
        if (pa !== pb) return pa - pb;
        return (b.nota ?? 0) - (a.nota ?? 0);
    });
    return ordenado.slice(0, quantidade);
}

export function recomendarTreino(
    perfil: PerfilUsuario,
    atributos: NotasAtributos,
    catalogo: ExercicioTreino[]
): TreinoRecomendado {

    const quantidade = quantidadeExercicios(perfil.tempoTreino);
    const tipos = tiposDoFoco(perfil.foco);
    const atributoFraco = atributoMaisFraco(
        atributos,
        perfil.habilidadesBasquete
    );
    const niveis = niveisAceitos(perfil.nivel);

    const poolBola = tipos.includes("bola")
        ? poolComAfrouxamento(catalogo, "bola", niveis, perfil.posicao, perfil.locais)
        : [];

    const poolFisico = tipos.includes("fisico")
        ? poolComAfrouxamento(catalogo, "fisico", niveis, perfil.posicao, perfil.locais)
        : [];

    let escolhidos: ExercicioTreino[] = [];

    if (tipos.length === 2) {
        // Ambos: metade de cada, bola primeiro
        const metadeBola = Math.ceil(quantidade / 2);
        const metadeFisico = quantidade - metadeBola;
        escolhidos = [
            ...escolherExercicios(poolBola, metadeBola, atributoFraco),
            ...escolherExercicios(poolFisico, metadeFisico, atributoFraco),
        ];
    } else if (tipos[0] === "bola") {
        escolhidos = escolherExercicios(poolBola, quantidade, atributoFraco);
    } else {
        escolhidos = escolherExercicios(poolFisico, quantidade, atributoFraco);
    }

    if (escolhidos.length === 0) {
        // Último recurso: qualquer exercício (não deveria acontecer)
        escolhidos = catalogo.slice(0, quantidade);
    }

    return {
        id: `treino-${Date.now()}`,
        nome: `Treino de ${atributoFraco}`,
        descricao: `Foco no atributo ${atributoFraco} (nota atual: ${
            atributos[atributoFraco] ?? "sem registro"
        }).`,
        exercicios: escolhidos,
    };
}