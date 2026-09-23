import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

import { Cabecalho } from '@/components/Cabecalho'
import { useAutenticacao } from '@/hooks/useAutenticacao'


import { router } from "expo-router";

export default function Home() {

    const { usuarioContexto } = useAutenticacao()

    const { deslogar, deslogarContexto } = useAutenticacao();

    const sair = async () => {
        await deslogar();
        await deslogarContexto();
        router.replace("/");
    };

    return (

        
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

                    <View>
                        <Text style={estilos.ola}>
                            Bem-vindo,
                        </Text>

                        <Text style={estilos.nome}>
                            {usuarioContexto?.nome}
                        </Text>
                    </View>

                    <View style={estilos.perfilIcone}>
                        <View style={estilos.perfilCabeca} />
                        <View style={estilos.perfilCorpo} />
                    </View>

                </View>

                {/* =========================
                    RESUMO
                ========================= */}

                <View style={estilos.card}>

                    <View style={estilos.cardCabecalho}>
                        <Text style={estilos.cardTitulo}>
                            Última semana
                        </Text>

                        <Text style={estilos.cardPeriodo}>
                            7 dias
                        </Text>
                    </View>


                    <View style={estilos.estatisticas}>

                        {/* ARREMESSOS */}
                        <View style={estilos.estatistica}>
                            <View
                                style={[
                                    estilos.iconeContainer,
                                    { backgroundColor: Cores.laranja },
                                ]}
                            >
                                <Text style={estilos.icone}>
                                    ●
                                </Text>
                            </View>

                            <Text style={estilos.valor}>
                                X
                            </Text>

                            <Text style={estilos.label}>
                                arremessos
                            </Text>
                        </View>


                        {/* TEMPO */}
                        <View style={estilos.estatistica}>
                            <View
                                style={[
                                    estilos.iconeContainer,
                                    { backgroundColor: Cores.azul },
                                ]}
                            >
                                <Text style={estilos.icone}>
                                    ◉
                                </Text>
                            </View>

                            <Text style={estilos.valor}>
                                X
                            </Text>

                            <Text style={estilos.label}>
                                min
                            </Text>
                        </View>


                        {/* SEQUÊNCIA */}
                        <View style={estilos.estatistica}>
                            <View
                                style={[
                                    estilos.iconeContainer,
                                    { backgroundColor: Cores.musgo },
                                ]}
                            >
                                <Text style={estilos.icone}>
                                    ♨
                                </Text>
                            </View>

                            <Text style={estilos.valor}>
                                X
                            </Text>

                            <Text style={estilos.label}>
                                dias
                            </Text>
                        </View>

                    </View>

                </View>


                {/* =========================
                    META
                ========================= */}

                <View style={estilos.card}>

                    <View style={estilos.cardCabecalho}>
                        <Text style={estilos.cardTitulo}>
                            Meta de treinos
                        </Text>

                        <Text style={estilos.porcentagem}>
                            58%
                        </Text>
                    </View>


                    <Text style={estilos.metaDescricao}>
                        Você está indo bem! Continue mantendo o ritmo.
                    </Text>


                    <View style={estilos.linha}>
                        <View style={estilos.progresso} />
                    </View>


                    <View style={estilos.metaRodape}>
                        <Text style={estilos.metaTexto}>
                            7 de 12 treinos
                        </Text>

                        <Text style={estilos.metaTexto}>
                            58%
                        </Text>
                    </View>

                </View>


                {/* =========================
                    PRÓXIMO TREINO
                ========================= */}

                <View style={estilos.proximoTreino}>

                    <View>
                        <Text style={estilos.proximoLabel}>
                            PRÓXIMO TREINO
                        </Text>

                        <Text style={estilos.proximoTitulo}>
                            Arremessos
                        </Text>

                        <Text style={estilos.proximoDescricao}>
                            25 minutos • Intermediário
                        </Text>
                    </View>

                    <View style={estilos.seta}>
                        <Text style={estilos.setaTexto}>
                            →
                        </Text>
                    </View>

                </View>

                <Pressable onPress={sair}>
                    <Text style={estilos.valor}>Sair</Text>
                </Pressable>

            </SafeAreaView>
        </LinearGradient>
    );
}


const estilos = StyleSheet.create({

    // =========================
    // FUNDO
    // =========================

    fundo: {
        flex: 1,
        height: "100%",
    },

    container: {
        flex: 1,

        paddingHorizontal: 24,
        paddingTop: 25,
    },


    // =========================
    // CABEÇALHO
    // =========================

    cabecalho: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: 35,
    },

    ola: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.grande3,
    },

    nome: {
        color: Cores.laranja,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.grande4,

        marginTop: 2,
    },


    // =========================
    // PERFIL
    // =========================

    perfilIcone: {
        width: 80,
        height: 80,

        borderWidth: 2,
        borderColor: Cores.laranja,

        borderRadius: 50,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: `${Cores.primaria}60`,
    },

    perfilCabeca: {
        width: 20,
        height: 20,

        borderWidth: 2.5,
        borderColor: Cores.laranja,

        borderRadius: 20,

        marginBottom: 3,
    },

    perfilCorpo: {
        width: 40,
        height: 22,

        borderWidth: 2.5,
        borderColor: Cores.laranja,

        borderBottomWidth: 0,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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

    cardCabecalho: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: 18,
    },

    cardTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande1,
    },

    cardPeriodo: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,
    },


    // =========================
    // ESTATÍSTICAS
    // =========================

    estatisticas: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    estatistica: {
        flex: 1,

        alignItems: "center",

        borderRightWidth: 1,
        borderRightColor: `${Cores.branco}15`,
    },


    iconeContainer: {
        width: 38,
        height: 38,

        borderRadius: 50,

        alignItems: "center",
        justifyContent: "center",

        marginBottom: 7,
    },

    icone: {
        color: Cores.branco,

        fontSize: Fontes.medio1,
        fontFamily: Fontes.titulo1,
    },

    valor: {
        color: Cores.branco,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.medio2,
    },

    label: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        marginTop: 2,
    },


    // =========================
    // META
    // =========================

    porcentagem: {
        color: Cores.laranja,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.medio2,
    },

    metaDescricao: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        marginBottom: 14,
    },

    linha: {
        width: "100%",
        height: 13,

        backgroundColor: `${Cores.preto}80`,

        borderRadius: 20,

        overflow: "hidden",
    },

    progresso: {
        width: "58%",
        height: "100%",

        backgroundColor: Cores.laranja,

        borderRadius: 20,
    },

    metaRodape: {
        flexDirection: "row",
        justifyContent: "space-between",

        marginTop: 10,
    },

    metaTexto: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,
    },


    // =========================
    // PRÓXIMO TREINO
    // =========================

    proximoTreino: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: Cores.laranja,

        borderRadius: 16,

        padding: 20,
    },

    proximoLabel: {
        color: `${Cores.branco}B0`,

        fontFamily: Fontes.titulo1,
        fontSize: 10,

        letterSpacing: 1,
    },

    proximoTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande1,

        marginTop: 4,
    },

    proximoDescricao: {
        color: `${Cores.branco}CC`,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        marginTop: 3,
    },

    seta: {
        width: 42,
        height: 42,

        borderRadius: 50,

        backgroundColor: `${Cores.preto}30`,

        justifyContent: "center",
        alignItems: "center",
    },

    setaTexto: {
        color: Cores.branco,

        fontSize: 24,

        fontFamily: Fontes.titulo1,
    },

});