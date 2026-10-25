import { UsuarioTipo } from "@/types/Usuario";

export type OpcaoPergunta = {
    valor: string;
    rotulo: string;
    detalhe?: string;
};

export type Pergunta = {
    campo: keyof UsuarioTipo;
    titulo: string;
    tipo: "unica" | "multipla" | "texto";
    icone?: string;
    opcoes?: OpcaoPergunta[];
    mascara?: "data";
    placeholder?: string;
    opcional?: boolean;
    condicao?: (usuario: UsuarioTipo) => boolean;
};

const igual = (valor: string): OpcaoPergunta => ({ valor, rotulo: valor });

export const Perguntas: Pergunta[] = [
    {
        campo: "experiencia",
        titulo: "Você já teve algum contato com basquete?",
        tipo: "unica",
        icone: "bar-chart",
        opcoes: [
            "Nunca joguei",
            "Joguei poucas vezes",
            "Jogo casualmente",
            "Jogo sempre ou em equipe",
        ].map(igual),
    },
    {
        campo: "posicao",
        titulo: "Em qual posição você joga ou pretende jogar?",
        tipo: "unica",
        opcoes: [
            { valor: "PG", rotulo: "Armador", detalhe: "PG" },
            { valor: "SG", rotulo: "Ala-armador", detalhe: "SG" },
            { valor: "SF", rotulo: "Ala", detalhe: "SF" },
            { valor: "PF", rotulo: "Ala-pivô", detalhe: "PF" },
            { valor: "C", rotulo: "Pivô", detalhe: "C" },
        ],
    },
    {
        campo: "mao",
        titulo: "Qual é sua mão dominante?",
        tipo: "unica",
        icone: "sports-basketball",
        opcoes: ["Direita", "Esquerda"].map(igual),
    },
    {
        campo: "nivel",
        titulo: "Como você considera seu nível no basquete?",
        tipo: "unica",
        icone: "bar-chart",
        opcoes: ["Iniciante", "Intermediário", "Avançado"].map(igual),
    },
    {
        campo: "foco",
        titulo: "Você gostaria de treinar mais o físico ou o basquete?",
        tipo: "unica",
        icone: "fitness-center",
        opcoes: [
            { valor: "basquete", rotulo: "Basquete" },
            { valor: "fisico", rotulo: "Físico" },
            { valor: "ambos", rotulo: "Os dois" },
        ],
    },
    {
        campo: "habilidadesBasquete",
        titulo: "Quais habilidades do basquete você quer aprimorar? (pode marcar mais de uma)",
        tipo: "multipla",
        icone: "sports-basketball",
        condicao: (u) => u.foco === "basquete" || u.foco === "ambos",
        opcoes: ["Arremesso", "Finalização", "Passe", "Drible", "Mão Fraca", "Defesa"].map(igual),
    },
    {
        campo: "habilidadesFisico",
        titulo: "Quais habilidades físicas você quer aprimorar? (pode marcar mais de uma)",
        tipo: "multipla",
        icone: "fitness-center",
        condicao: (u) => u.foco === "fisico" || u.foco === "ambos",
        opcoes: [
            { valor: "resistencia", rotulo: "Resistência" },
            { valor: "forca", rotulo: "Força" },
            { valor: "agilidade", rotulo: "Agilidade" },
            { valor: "explosao", rotulo: "Explosão e salto" },
        ],
    },
    {
        campo: "frequencia",
        titulo: "Quantos dias por semana você consegue treinar?",
        tipo: "unica",
        icone: "event",
        opcoes: [
            { valor: "1-2", rotulo: "1 a 2 dias" },
            { valor: "3-4", rotulo: "3 a 4 dias" },
            { valor: "5+", rotulo: "5 ou mais dias" },
        ],
    },
    {
        campo: "tempoTreino",
        titulo: "Quanto tempo você tem para cada treino?",
        tipo: "unica",
        icone: "schedule",
        opcoes: [
            { valor: "15", rotulo: "15 minutos" },
            { valor: "30", rotulo: "30 minutos" },
            { valor: "45", rotulo: "45 minutos" },
            { valor: "60", rotulo: "60 minutos ou mais" },
        ],
    },
    {
        campo: "locais",
        titulo: "Onde você pode treinar? (pode marcar mais de um)",
        tipo: "multipla",
        icone: "place",
        opcoes: [
            { valor: "casa", rotulo: "Em casa" },
            { valor: "quadra", rotulo: "Na quadra" },
            { valor: "academia", rotulo: "Na academia" },
        ],
    },
    {
        campo: "dataNascimento",
        titulo: "Qual é a sua data de nascimento?",
        tipo: "texto",
        mascara: "data",
        placeholder: "DD/MM/AAAA",
        opcional: true,
    },
    {
        campo: "altura",
        titulo: "Qual é a sua altura, em centímetros?",
        tipo: "texto",
        placeholder: "Ex.: 180",
        opcional: true,
    },
    {
        campo: "peso",
        titulo: "Qual é o seu peso, em quilos?",
        tipo: "texto",
        placeholder: "Ex.: 75",
        opcional: true,
    },
];