import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function Treinos() {

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
                            Treinos
                        </Text>

                        <Text style={estilos.subtitulo}>
                            Escolha um treino e evolua
                        </Text>
                    </View>

                    {/* =========================
                            INICIAR TREINO
                    ========================= */}

                    <View style={estilos.cardDestaque}>

                        <Text style={estilos.label}>
                            TREINO DE HOJE
                        </Text>

                        <Text style={estilos.cardDestaqueTitulo}>
                            Plano de treino
                        </Text>

                        <Text style={estilos.cardDestaqueTexto}>
                            Treino completo desenvolvido para você.
                        </Text>

                        <Pressable
                            style={({ pressed }) => [
                                estilos.botaoIniciar,
                                { opacity: pressed ? 0.9 : 1 },
                            ]}
                            onPress={() => router.push("/treino-iniciar")}
                        >
                            <Text style={estilos.botaoIniciarTexto}>
                                Iniciar treino
                            </Text>
                        </Pressable>

                    </View>

                    {/* =========================
                        CRIAR TREINAMENTO
                    ========================= */}

                    <Pressable
                        style={({ pressed }) => [
                            estilos.linha,
                            { opacity: pressed ? 0.85 : 1 },
                        ]}
                        onPress={() => router.push("/treino-criar")}
                    >
                        <View>
                            <Text style={estilos.linhaTitulo}>
                                Criar treinamento
                            </Text>

                            <Text style={estilos.linhaSubtitulo}>
                                Criar treinamento personalizado
                            </Text>
                        </View>

                        <View style={estilos.iconeMais}>
                            <MaterialIcons
                                name="add"
                                size={20}
                                color={Cores.branco}
                            />
                        </View>
                    </Pressable>

                    {/* =========================
                        CATEGORIAS
                    ========================= */}

                    <Text style={estilos.secaoTitulo}>
                        Categorias
                    </Text>

                    <Pressable
                        style={({ pressed }) => [
                            estilos.linha,
                            { opacity: pressed ? 0.85 : 1 },
                        ]}
                        onPress={() => router.push("/treino-categoria/bola")}
                    >
                        <View>
                            <Text style={estilos.linhaTitulo}>
                                Ex com bola
                            </Text>

                            <Text style={estilos.linhaSubtitulo}>
                                Controle de bola e mudança de direção
                            </Text>
                        </View>

                        <MaterialIcons
                            name="chevron-right"
                            size={26}
                            color={Cores.laranja}
                        />
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            estilos.linha,
                            { opacity: pressed ? 0.85 : 1 },
                        ]}
                        onPress={() => router.push("/treino-categoria/fisico")}
                    >
                        <View>
                            <Text style={estilos.linhaTitulo}>
                                Ex físicos
                            </Text>

                            <Text style={estilos.linhaSubtitulo}>
                                Exercícios para melhorar o corpo
                            </Text>
                        </View>

                        <MaterialIcons
                            name="chevron-right"
                            size={26}
                            color={Cores.laranja}
                        />
                    </Pressable>

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

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande4,
    },

    subtitulo: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,

        marginTop: 4,
    },

    // =========================
    // CARD DE DESTAQUE
    // =========================

    cardDestaque: {
        width: "100%",

        backgroundColor: `${Cores.primaria}50`,

        borderWidth: 1,
        borderColor: `${Cores.laranja}55`,

        borderRadius: 16,

        padding: 20,

        marginBottom: 16,
    },

    label: {
        color: Cores.laranja,

        fontFamily: Fontes.titulo1,
        fontSize: 10,

        letterSpacing: 1,
    },

    cardDestaqueTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande2,

        marginTop: 4,
    },

    cardDestaqueTexto: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,

        marginTop: 6,
        marginBottom: 16,
    },

    botaoIniciar: {
        width: "100%",

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: Cores.laranja,

        borderRadius: 30,

        paddingVertical: 14,
    },

    botaoIniciarTexto: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },

    // =========================
    // LINHAS (CRIAR / CATEGORIAS)
    // =========================

    secaoTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande1,

        marginTop: 6,
        marginBottom: 14,
    },

    linha: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: `${Cores.primaria}50`,

        borderWidth: 1,
        borderColor: `${Cores.laranja}30`,

        borderRadius: 16,

        paddingVertical: 18,
        paddingHorizontal: 20,

        marginBottom: 14,
    },

    linhaTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio2,
    },

    linhaSubtitulo: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        marginTop: 3,
    },

    iconeMais: {
        width: 40,
        height: 40,

        borderRadius: 20,

        backgroundColor: Cores.laranja,

        alignItems: "center",
        justifyContent: "center",
    },

});