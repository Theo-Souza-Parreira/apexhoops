import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { ExercicioTreino } from "@/types/Treino";

// Treino fictício de demonstração.
// No futuro isso virá da API, já com o treino recomendado.
const treinoDemo = {
    nome: "Treino de Arremesso",
    descricao: "Treino de demonstração — dados fictícios enquanto a recomendação automática não está pronta.",

    exercicios: [
        {
            id: "1",
            nome: "Arremesso de média distância",
            tipo: "bola",
            meta: 10,
        },
        {
            id: "2",
            nome: "Agilidade lateral",
            tipo: "fisico",
            meta: 15,
        },
    ] as ExercicioTreino[],
};

export default function TreinoIniciar() {

    const [iniciado, setIniciado] = useState(false);
    const [resultados, setResultados] = useState<Record<string, string>>({});

    const atualizarResultado = (id: string, valor: string) => {
        setResultados({ ...resultados, [id]: valor });
    };

    const concluirTreino = () => {
        // Futuramente: salvar em usuarios/{uid}/registros
        Alert.alert(
            "Treino concluído (demonstração)",
            "Em breve isso será salvo no seu histórico."
        );

        router.back();
    };

    return (

        <ScrollView showsVerticalScrollIndicator={false} 
    contentContainerStyle={{ flexGrow: 1 }}>

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
                            {treinoDemo.nome}
                        </Text>

                        <Text style={estilos.subtitulo}>
                            {treinoDemo.descricao}
                        </Text>
                    </View>

                    {!iniciado && (
                        <Pressable
                            style={({ pressed }) => [
                                estilos.botaoIniciar,
                                { opacity: pressed ? 0.9 : 1 },
                            ]}
                            onPress={() => setIniciado(true)}
                        >
                            <MaterialIcons
                                name="play-arrow"
                                size={24}
                                color={Cores.branco}
                            />

                            <Text style={estilos.botaoIniciarTexto}>
                                Iniciar treino
                            </Text>
                        </Pressable>
                    )}

                    {iniciado && (
                        <>

                            {treinoDemo.exercicios.map((exercicio) => (
                                <View
                                    key={exercicio.id}
                                    style={estilos.card}
                                >

                                    <View style={estilos.videoPlaceholder}>
                                        <MaterialIcons
                                            name="videocam-off"
                                            size={28}
                                            color={Cores.cinza_clara}
                                        />

                                        <Text style={estilos.videoTexto}>
                                            Vídeo em breve
                                        </Text>
                                    </View>

                                    <Text style={estilos.exercicioNome}>
                                        {exercicio.nome}
                                    </Text>

                                    <Text style={estilos.exercicioMeta}>
                                        Meta: {exercicio.meta}{" "}
                                        {exercicio.tipo === "bola"
                                            ? "acertos"
                                            : "repetições"}
                                    </Text>

                                    <View style={estilos.linhaCampo}>

                                        <Text style={estilos.campoLabel}>
                                            {exercicio.tipo === "bola"
                                                ? "Acertos"
                                                : "Repetições"}
                                        </Text>

                                        <TextInput
                                            style={estilos.campo}
                                            keyboardType="numeric"
                                            placeholder="0"
                                            placeholderTextColor={Cores.cinza_clara}
                                            value={resultados[exercicio.id] ?? ""}
                                            onChangeText={(valor) =>
                                                atualizarResultado(exercicio.id, valor)
                                            }
                                        />

                                    </View>

                                </View>
                            ))}

                            <Pressable
                                style={({ pressed }) => [
                                    estilos.botaoIniciar,
                                    { opacity: pressed ? 0.9 : 1 },
                                ]}
                                onPress={concluirTreino}
                            >
                                <MaterialIcons
                                    name="check"
                                    size={22}
                                    color={Cores.branco}
                                />

                                <Text style={estilos.botaoIniciarTexto}>
                                    Concluir treino
                                </Text>
                            </Pressable>

                        </>
                    )}

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
        fontSize: Fontes.pequeno,

        marginTop: 6,

        lineHeight: 18,
    },

    botaoIniciar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: Cores.laranja,

        borderRadius: 16,

        paddingVertical: 16,

        marginBottom: 18,

        gap: 8,
    },

    botaoIniciarTexto: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },

    card: {
        width: "100%",

        backgroundColor: `${Cores.primaria}50`,

        borderWidth: 1,
        borderColor: `${Cores.laranja}55`,

        borderRadius: 16,

        padding: 20,

        marginBottom: 18,
    },

    videoPlaceholder: {
        width: "100%",
        height: 120,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: `${Cores.preto}60`,

        borderRadius: 12,

        marginBottom: 14,

        gap: 4,
    },

    videoTexto: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,
    },

    exercicioNome: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },

    exercicioMeta: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        marginTop: 2,
        marginBottom: 14,
    },

    linhaCampo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    campoLabel: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,
    },

    campo: {
        width: 80,
        height: 44,

        textAlign: "center",

        backgroundColor: `${Cores.cinza_clara}35`,
        color: Cores.branco,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.medio1,

        borderRadius: 12,

        borderWidth: 2,
        borderColor: Cores.cinza_escuro,
    },

});