import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

// Conteúdo das categorias.
// As "fotos" ainda são placeholder (gradiente + ícone) até termos
// as imagens/vídeos reais de cada exercício.
const categorias = {
    bola: {
        titulo: "Treinos com bola",
        subtitulo: "Exercícios para o controle de bola e mudança de direção",
        icone: "sports-basketball" as const,
        exercicios: [
            { nome: "Arremesso", descricao: "Precisão e consistência no arremesso." },
            { nome: "Drible", descricao: "Controle de bola em movimento." },
            { nome: "Passe", descricao: "Precisão e velocidade nos passes." },
            { nome: "Bandeja", descricao: "Finalização próxima à cesta." },
        ],
    },

    fisico: {
        titulo: "Treinos físicos",
        subtitulo: "Exercícios para melhorar o corpo",
        icone: "fitness-center" as const,
        exercicios: [
            { nome: "Polichinelo", descricao: "Aquecimento e resistência cardiovascular." },
            { nome: "Supino", descricao: "Força na parte superior do corpo." },
            { nome: "Agachamento", descricao: "Força e potência nas pernas." },
            { nome: "Flexão", descricao: "Resistência muscular de braços e peito." },
        ],
    },
};

type ChaveCategoria = keyof typeof categorias;

export default function TreinoCategoria() {

    const { tipo } = useLocalSearchParams<{ tipo: string }>();

    const categoria =
        categorias[tipo as ChaveCategoria] ?? categorias.bola;

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

                    <Pressable onPress={() => router.back()}>
                        <Text style={estilos.voltar}>
                            ← Voltar
                        </Text>
                    </Pressable>

                    <View style={estilos.cabecalho}>
                        <Text style={estilos.titulo}>
                            {categoria.titulo}
                        </Text>

                        <Text style={estilos.subtitulo}>
                            {categoria.subtitulo}
                        </Text>
                    </View>

                    {categoria.exercicios.map((exercicio) => (
                        <View
                            key={exercicio.nome}
                            style={estilos.cardExercicio}
                        >
                            <LinearGradient
                                colors={[Cores.musgo, Cores.preto]}
                                style={StyleSheet.absoluteFill}
                            />

                            <MaterialIcons
                                name={categoria.icone}
                                size={90}
                                color={`${Cores.laranja}25`}
                                style={estilos.iconeFundo}
                            />

                            <View style={estilos.cardExercicioRodape}>

                                <View style={estilos.cardExercicioTexto}>
                                    <Text style={estilos.cardExercicioTitulo}>
                                        {exercicio.nome}
                                    </Text>

                                    <Text style={estilos.cardExercicioSubtitulo}>
                                        {exercicio.descricao}
                                    </Text>
                                </View>

                                <MaterialIcons
                                    name="chevron-right"
                                    size={24}
                                    color={Cores.laranja}
                                />

                            </View>

                        </View>
                    ))}

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

    voltar: {
        color: Cores.laranja,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,

        marginBottom: 20,
    },

    cabecalho: {
        marginBottom: 25,
    },

    titulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande3,
    },

    subtitulo: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,

        marginTop: 4,
    },

    // =========================
    // CARD DE EXERCÍCIO
    // =========================

    cardExercicio: {
        width: "100%",
        height: 140,

        justifyContent: "flex-end",

        borderRadius: 16,

        overflow: "hidden",

        marginBottom: 14,
    },

    iconeFundo: {
        position: "absolute",

        right: -15,
        bottom: -15,
    },

    cardExercicioRodape: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: `${Cores.preto}70`,

        padding: 16,
    },

    cardExercicioTexto: {
        flex: 1,

        marginRight: 10,
    },

    cardExercicioTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio2,
    },

    cardExercicioSubtitulo: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        marginTop: 3,
    },

});