import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

const etapas = [
    {
        numero: 1,
        titulo: "Selecionar treino",
        descricao: "Escolha um treino pelo nível, posição ou objetivo.",
    },
    {
        numero: 2,
        titulo: "Executar exercícios",
        descricao: "Siga as instruções de cada exercício até concluir a sequência.",
    },
    {
        numero: 3,
        titulo: "Finalizar treinamento",
        descricao: "Complete todos os exercícios do treino selecionado.",
    },
    {
        numero: 4,
        titulo: "Registrar atividade",
        descricao: "O treino concluído entra automaticamente no seu histórico.",
    },
];

const evolucao = [
    {
        titulo: "Treinos realizados",
        descricao: "Quantidade total de treinos concluídos.",
    },
    {
        titulo: "Frequência de uso",
        descricao: "Regularidade dos treinos ao longo do tempo.",
    },
    {
        titulo: "Histórico de atividades",
        descricao: "Registro de cada treino realizado, com data.",
    },
    {
        titulo: "Exercícios concluídos",
        descricao: "Progresso dentro de cada treinamento.",
    },
    {
        titulo: "Períodos de uso",
        descricao: "Picos e quedas de atividade ao longo do tempo.",
    },
];

export default function Sobre() {

    return (

        <ScrollView showsVerticalScrollIndicator={false}>

            <LinearGradient
                colors={[Cores.primaria, Cores.preto, Cores.musgo]}
                locations={[0, 0.5, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={estilos.fundo}
            >
                <SafeAreaView style={estilos.container}>

                    {/* =========================
                        CABEÇALHO
                    ========================= */}

                    <View style={estilos.cabecalho}>
                        <Text style={estilos.titulo}>
                            Sobre
                        </Text>

                        <Text style={estilos.subtitulo}>
                            Conheça o Apexhoops
                        </Text>
                    </View>

                    {/* =========================
                        O QUE É O APP
                    ========================= */}

                    <View style={estilos.card}>

                        <Text style={estilos.cardTitulo}>
                            O Apexhoops
                        </Text>

                        <Text style={estilos.texto}>
                            Um app de treino de basquete pensado para quem
                            quer evoluir com constância: conteúdo
                            personalizado pelo perfil do atleta,
                            treinamentos estruturados e acompanhamento
                            real da evolução.
                        </Text>

                    </View>

                    {/* =========================
                        PERSONALIZAÇÃO
                    ========================= */}

                    <View style={estilos.card}>

                        <Text style={estilos.cardTitulo}>
                            Personalização
                        </Text>

                        <Text style={estilos.texto}>
                            O conteúdo é organizado a partir do perfil do
                            atleta, para que cada um receba treinos
                            compatíveis com sua realidade.
                        </Text>

                        <View style={estilos.linhaFluxo}>

                            <View style={estilos.chip}>
                                <Text style={estilos.chipTexto}>
                                    Usuário
                                </Text>
                            </View>

                            <Text style={estilos.setaFluxo}>→</Text>

                            <View style={estilos.chip}>
                                <Text style={estilos.chipTexto}>
                                    Nível e posição
                                </Text>
                            </View>

                            <Text style={estilos.setaFluxo}>→</Text>

                            <View style={estilos.chip}>
                                <Text style={estilos.chipTexto}>
                                    Treinos indicados
                                </Text>
                            </View>

                        </View>

                        <View style={estilos.subCard}>
                            <Text style={estilos.subCardTitulo}>
                                Nível técnico
                            </Text>

                            <Text style={estilos.subCardTexto}>
                                Define quais exercícios e treinamentos
                                fazem sentido para a experiência atual
                                do atleta.
                            </Text>
                        </View>

                        <View style={estilos.subCard}>
                            <Text style={estilos.subCardTitulo}>
                                Posição em quadra
                            </Text>

                            <Text style={estilos.subCardTexto}>
                                Direciona treinos às demandas da posição,
                                sem limitar o atleta a exercícios
                                exclusivos dela.
                            </Text>
                        </View>

                    </View>

                    {/* =========================
                        EXERCÍCIOS E TREINAMENTOS
                    ========================= */}

                    <View style={estilos.card}>

                        <Text style={estilos.cardTitulo}>
                            Exercícios e treinamentos
                        </Text>

                        <Text style={estilos.texto}>
                            Cada exercício é uma atividade individual, com
                            nome, categoria, nível, posição indicada e
                            instruções próprias. Um treinamento reúne
                            vários exercícios em uma sequência organizada.
                        </Text>

                        <View style={estilos.miniTreino}>

                            <Text style={estilos.miniTreinoTitulo}>
                                Treinamento
                            </Text>

                            {["Arremesso", "Drible", "Condicionamento"].map(
                                (exercicio) => (
                                    <View
                                        key={exercicio}
                                        style={estilos.miniExercicio}
                                    >
                                        <View style={estilos.miniLinha} />

                                        <Text style={estilos.miniExercicioTexto}>
                                            {exercicio}
                                        </Text>
                                    </View>
                                )
                            )}

                        </View>

                    </View>

                    {/* =========================
                        FLUXO DE EXECUÇÃO
                    ========================= */}

                    <View style={estilos.card}>

                        <Text style={estilos.cardTitulo}>
                            Como funciona um treino
                        </Text>

                        {etapas.map((etapa, indice) => (
                            <View
                                key={etapa.titulo}
                                style={estilos.etapa}
                            >
                                <View style={estilos.etapaMarcador}>

                                    <View style={estilos.etapaNumero}>
                                        <Text style={estilos.etapaNumeroTexto}>
                                            {etapa.numero}
                                        </Text>
                                    </View>

                                    {indice < etapas.length - 1 && (
                                        <View style={estilos.etapaLinha} />
                                    )}

                                </View>

                                <View style={estilos.etapaTexto}>
                                    <Text style={estilos.etapaTitulo}>
                                        {etapa.titulo}
                                    </Text>

                                    <Text style={estilos.etapaDescricao}>
                                        {etapa.descricao}
                                    </Text>
                                </View>
                            </View>
                        ))}

                    </View>

                    {/* =========================
                        EVOLUÇÃO DO ATLETA
                    ========================= */}

                    <View style={estilos.card}>

                        <Text style={estilos.cardTitulo}>
                            Evolução do atleta
                        </Text>

                        <Text style={estilos.texto}>
                            Cada treino realizado alimenta um histórico,
                            usado para acompanhar a evolução do atleta
                            ao longo do tempo.
                        </Text>

                        {evolucao.map((item) => (
                            <View
                                key={item.titulo}
                                style={estilos.recurso}
                            >
                                <View style={estilos.marcador} />

                                <View style={estilos.recursoTexto}>
                                    <Text style={estilos.recursoTitulo}>
                                        {item.titulo}
                                    </Text>

                                    <Text style={estilos.recursoDescricao}>
                                        {item.descricao}
                                    </Text>
                                </View>
                            </View>
                        ))}

                    </View>

                    {/* =========================
                        RODAPÉ
                    ========================= */}

                    <Text style={estilos.versao}>
                        Apexhoops • v1.0.0
                    </Text>

                </SafeAreaView>
            </LinearGradient>
        </ScrollView>
    );
}

const estilos = StyleSheet.create({

    fundo: {
        flexGrow: 1,
    },

    container: {
        flexGrow: 1,

        paddingHorizontal: 24,
        paddingTop: 25,
        paddingBottom: 30,
    },

    // =========================
    // CABEÇALHO
    // =========================

    cabecalho: {
        marginBottom: 25,
    },

    titulo: {
        color: Cores.laranja,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.grande4,
    },

    subtitulo: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,

        marginTop: 4,
    },

    // =========================
    // CARDS
    // =========================

    card: {
        width: "100%",

        backgroundColor: `${Cores.primaria}50`,

        borderWidth: 1,
        borderColor: `${Cores.laranja}55`,

        borderRadius: 16,

        padding: 20,

        marginBottom: 18,
    },

    cardTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande1,

        marginBottom: 12,
    },

    texto: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,

        lineHeight: 22,
    },

    // =========================
    // TRILHA DE PERSONALIZAÇÃO
    // =========================

    linhaFluxo: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",

        marginTop: 16,
        marginBottom: 4,

        gap: 8,
    },

    chip: {
        backgroundColor: `${Cores.preto}80`,

        borderWidth: 1,
        borderColor: Cores.cinza_escuro,

        borderRadius: 20,

        paddingVertical: 8,
        paddingHorizontal: 14,
    },

    chipTexto: {
        color: Cores.branco,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,
    },

    setaFluxo: {
        color: Cores.laranja,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.medio1,
    },

    subCard: {
        backgroundColor: `${Cores.preto}50`,

        borderRadius: 12,

        padding: 14,

        marginTop: 12,
    },

    subCardTitulo: {
        color: Cores.laranja,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,

        marginBottom: 4,
    },

    subCardTexto: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        lineHeight: 18,
    },

    // =========================
    // MINI TREINO
    // =========================

    miniTreino: {
        backgroundColor: `${Cores.preto}50`,

        borderRadius: 12,

        padding: 16,

        marginTop: 16,
    },

    miniTreinoTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,

        marginBottom: 10,
    },

    miniExercicio: {
        flexDirection: "row",
        alignItems: "center",

        marginTop: 8,
    },

    miniLinha: {
        width: 14,
        height: 2,

        backgroundColor: Cores.laranja,

        marginRight: 10,
    },

    miniExercicioTexto: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,
    },

    // =========================
    // FLUXO DE EXECUÇÃO
    // =========================

    etapa: {
        flexDirection: "row",
    },

    etapaMarcador: {
        alignItems: "center",

        marginRight: 14,
    },

    etapaNumero: {
        width: 30,
        height: 30,

        borderRadius: 15,

        backgroundColor: Cores.laranja,

        alignItems: "center",
        justifyContent: "center",
    },

    etapaNumeroTexto: {
        color: Cores.secundaria,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.pequeno,
    },

    etapaLinha: {
        width: 2,
        flex: 1,

        minHeight: 24,

        backgroundColor: Cores.cinza_escuro,

        marginVertical: 4,
    },

    etapaTexto: {
        flex: 1,

        paddingBottom: 18,
    },

    etapaTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,

        marginTop: 4,
    },

    etapaDescricao: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        marginTop: 2,
    },

    // =========================
    // LISTA COM MARCADOR
    // =========================

    recurso: {
        flexDirection: "row",

        marginTop: 14,
    },

    marcador: {
        width: 8,
        height: 8,

        borderRadius: 4,

        backgroundColor: Cores.laranja,

        marginTop: 6,
        marginRight: 12,
    },

    recursoTexto: {
        flex: 1,
    },

    recursoTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },

    recursoDescricao: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        marginTop: 2,
    },

    // =========================
    // RODAPÉ
    // =========================

    versao: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        textAlign: "center",

        marginTop: 6,
    },

});