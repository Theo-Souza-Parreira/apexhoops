import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { addDoc, collection } from "firebase/firestore";

import CampoResultado from "@/components/CampoResultado";
import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { textoMeta, textoResultado } from "@/constants/Medicoes";
import { useAutenticacao } from "@/hooks/useAutenticacao";
import { banco } from "@/services/Firebase";
import { ExercicioTreino, RegistroTreino } from "@/types/Treino";
import ExecucaoExercicio, { EstadoExercicio } from "@/components/ExecucaoExercicio";

// Treino fictício de demonstração.
// Na fase da API, isso virá do endpoint de treino recomendado.
const treinoDemo = {
    id: "demo-arremesso",
    nome: "Treino de Arremesso",
    descricao: "Treino de demonstração — dados fictícios enquanto a recomendação automática não está pronta.",

    exercicios: [
        {
            id: "arremesso-media-distancia",
            nome: "Arremesso de média distância",
            tipo: "bola",
            atributo: "Arremesso",
            medicao: "acertos",
            meta: 10, //unidade
        },
        {
            id: "agilidade-lateral",
            nome: "Agilidade lateral",
            tipo: "fisico",
            atributo: "Condicionamento",
            medicao: "tempo",
            meta: 15, // minutos
        },
    ] as ExercicioTreino[],
};

export default function TreinoIniciar() {

    const { usuarioContexto } = useAutenticacao();
    const [estados, setEstados] = useState<Record<string, EstadoExercicio>>({});
    const [iniciado, setIniciado] = useState(false);
    const [passo, setPasso] = useState(0);
    const [resultados, setResultados] = useState<Record<string, string>>({});
    const [salvando, setSalvando] = useState(false);

    const exercicios = treinoDemo.exercicios;
    const emResumo = passo === exercicios.length;
    const exercicio = exercicios[passo]; // undefined quando está no resumo

        const estado: EstadoExercicio = exercicio ? estados[exercicio.id] ?? "pronto" : "pronto";

    const iniciarExercicio = () =>
        setEstados({ ...estados, [exercicio.id]: "executando" });

    // Nos exercícios de tempo, o cronômetro já devolve os minutos feitos
    const finalizarExercicio = (minutos?: number) => {
        setEstados({ ...estados, [exercicio.id]: "finalizado" });
        if (minutos !== undefined) {
            atualizarResultado(exercicio.id, String(minutos));
        }
    };

    const atualizarResultado = (id: string, valor: string) => {
        setResultados({ ...resultados, [id]: valor });
    };

    // Só avança se o campo do exercício atual foi respondido
    const podeAvancar = !!exercicio && (resultados[exercicio.id] ?? "") !== "";

    const concluirTreino = async () => {
        if (!usuarioContexto || salvando) return;

        const registro: RegistroTreino = {
            treinoId: treinoDemo.id,
            nomeTreino: treinoDemo.nome,
            data: new Date().toISOString(),
            exercicios: exercicios.map((e) => ({
                exercicioId: e.id,
                nome: e.nome,
                tipo: e.tipo,
                atributo: e.atributo,
                medicao: e.medicao,
                meta: e.meta,
                realizado: Number(resultados[e.id]) || 0,
            })),
        };

        setSalvando(true);

        try {
            await addDoc(
                collection(banco, "usuarios", usuarioContexto.codigo, "registros"),
                registro
            );

            Alert.alert("Treino concluído", "Salvo no seu histórico.", [
                { text: "OK", onPress: () => router.back() },
            ]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o treino. Tente novamente.");
        } finally {
            setSalvando(false);
        }
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

                        {!iniciado && (
                            <Text style={estilos.subtitulo}>
                                {treinoDemo.descricao}
                            </Text>
                        )}
                    </View>

                    {/* ===== ANTES DE INICIAR ===== */}
                    {!iniciado && (
                        <Pressable
                            style={({ pressed }) => [
                                estilos.botaoIniciar,
                                { opacity: pressed ? 0.9 : 1 },
                            ]}
                            onPress={() => setIniciado(true)}
                        >
                            <MaterialIcons name="play-arrow" size={24} color={Cores.branco} />
                            <Text style={estilos.botaoIniciarTexto}>Iniciar treino</Text>
                        </Pressable>
                    )}

                    {/* ===== UM EXERCÍCIO POR VEZ ===== */}
                    {iniciado && !emResumo && (
                        <>
                            <Text style={estilos.progresso}>
                                Exercício {passo + 1} de {exercicios.length}
                            </Text>

                            <View style={estilos.card}>

                                <View style={estilos.videoPlaceholder}>
                                    <MaterialIcons
                                        name="videocam-off"
                                        size={28}
                                        color={Cores.cinza_clara}
                                    />
                                    <Text style={estilos.videoTexto}>Vídeo em breve</Text>
                                </View>

                                <Text style={estilos.exercicioNome}>
                                    {exercicio.nome}
                                </Text>

                                <Text style={estilos.exercicioMeta}>
                                    {textoMeta(exercicio.medicao, exercicio.meta)}
                                </Text>

                                {estado === "finalizado" ? (
                                    <CampoResultado
                                        medicao={exercicio.medicao}
                                        valor={resultados[exercicio.id] ?? ""}
                                        onChange={(valor) => atualizarResultado(exercicio.id, valor)}
                                    />
                                ) : (
                                    <ExecucaoExercicio
                                        key={exercicio.id}
                                        exercicio={exercicio}
                                        estado={estado}
                                        onIniciar={iniciarExercicio}
                                        onFinalizar={finalizarExercicio}
                                    />
                                )}

                            </View>

                            <Pressable
                                disabled={!podeAvancar}
                                style={({ pressed }) => [
                                    estilos.botaoIniciar,
                                    { opacity: !podeAvancar ? 0.4 : pressed ? 0.9 : 1 },
                                ]}
                                onPress={() => setPasso(passo + 1)}
                            >
                                <Text style={estilos.botaoIniciarTexto}>
                                    {passo === exercicios.length - 1
                                        ? "Ver resumo"
                                        : "Próximo exercício"}
                                </Text>
                                <MaterialIcons name="arrow-forward" size={22} color={Cores.branco} />
                            </Pressable>

                              {passo > 0 && estado !== "executando" && (
                                <Pressable onPress={() => setPasso(passo - 1)}>
                                    <Text style={estilos.voltar}>Exercício anterior</Text>
                                </Pressable>
                            )}
                        </>
                    )}

                    {/* ===== RESUMO FINAL ===== */}
                    {iniciado && emResumo && (
                        <>
                            <View style={estilos.card}>
                                <Text style={estilos.resumoTitulo}>Resumo do treino</Text>

                                {exercicios.map((e) => (
                                    <View key={e.id} style={estilos.linhaResumo}>
                                        <Text style={estilos.resumoNome}>{e.nome}</Text>
                                        <Text style={estilos.resumoValor}>
                                            {textoResultado(e.medicao, e.meta, resultados[e.id] ?? "")}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <Pressable
                                disabled={salvando}
                                style={({ pressed }) => [
                                    estilos.botaoIniciar,
                                    { opacity: salvando ? 0.5 : pressed ? 0.9 : 1 },
                                ]}
                                onPress={concluirTreino}
                            >
                                <MaterialIcons name="check" size={22} color={Cores.branco} />
                                <Text style={estilos.botaoIniciarTexto}>
                                    {salvando ? "Salvando..." : "Concluir treino"}
                                </Text>
                            </Pressable>

                            <Pressable onPress={() => setPasso(exercicios.length - 1)}>
                                <Text style={estilos.voltar}>Editar respostas</Text>
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


        progresso: {
        color: Cores.textoSecundaria,
        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,
        marginBottom: 10,
    },

    resumoTitulo: {
        color: Cores.branco,
        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande1,
        marginBottom: 8,
    },

    linhaResumo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: `${Cores.cinza_escuro}80`,
    },

    resumoNome: {
        flex: 1,
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,
        marginRight: 10,
    },

    resumoValor: {
        color: Cores.laranja,
        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },
});