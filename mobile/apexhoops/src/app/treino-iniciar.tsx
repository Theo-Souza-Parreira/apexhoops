import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
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
import VideoAula from "@/components/VideoAula";
import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { textoMeta, textoResultado } from "@/constants/Medicoes";
import { useAutenticacao } from "@/hooks/useAutenticacao";
import { chamarApi } from "@/services/Api";
import { banco } from "@/services/Firebase";
import { RegistroTreino, TreinoRecomendado } from "@/types/Treino";
import ExecucaoExercicio, { EstadoExercicio } from "@/components/ExecucaoExercicio";

export default function TreinoIniciar() {

    const { usuarioContexto } = useAutenticacao();

    const [treino, setTreino] = useState<TreinoRecomendado | null>(null);
    const [carregandoTreino, setCarregandoTreino] = useState(true);
    const [erroTreino, setErroTreino] = useState<string | null>(null);

    const [estados, setEstados] = useState<Record<string, EstadoExercicio>>({});
    const [iniciado, setIniciado] = useState(false);
    const [passo, setPasso] = useState(0);
    const [resultados, setResultados] = useState<Record<string, string>>({});
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        let cancelado = false;

        async function buscar() {
            try {
                const dados = await chamarApi<TreinoRecomendado>("/v1/treinos/recomendado");
                if (!cancelado) setTreino(dados);
            } catch (erro: any) {
                if (!cancelado) {
                    console.log("ERRO API (treino):", erro.message);
                    setErroTreino(erro.message);
                }
            } finally {
                if (!cancelado) setCarregandoTreino(false);
            }
        }

        buscar();
        return () => { cancelado = true; };
    }, []);

    const exercicios = treino?.exercicios ?? [];
    const emResumo = passo === exercicios.length;
    const exercicio = exercicios[passo];

    const estado: EstadoExercicio = exercicio
        ? estados[exercicio.id] ?? "pronto"
        : "pronto";

    const iniciarExercicio = () => {
        if (!exercicio) return;
        setEstados({ ...estados, [exercicio.id]: "executando" });
    };

    const finalizarExercicio = (minutos?: number) => {
        if (!exercicio) return;
        setEstados({ ...estados, [exercicio.id]: "finalizado" });
        if (minutos !== undefined) {
            atualizarResultado(exercicio.id, String(minutos));
        }
    };

    const atualizarResultado = (id: string, valor: string) => {
        setResultados({ ...resultados, [id]: valor });
    };

    const podeAvancar = !!exercicio && (resultados[exercicio.id] ?? "") !== "";

    const concluirTreino = async () => {
        if (!usuarioContexto || !treino || salvando) return;

        const registro: RegistroTreino = {
            treinoId: treino.id,
            nomeTreino: treino.nome,
            data: new Date().toISOString(),
            exercicios: treino.exercicios.map((e) => ({
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

    // --------------------------------------------------
    // Estado de carregamento / erro
    // --------------------------------------------------
    if (carregandoTreino || !treino) {
        return (
            <LinearGradient
                colors={[Cores.primaria, Cores.preto, Cores.musgo]}
                locations={[0, 0.5, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={estilos.fundo}
            >
                <SafeAreaView style={estilos.container}>
                    <Pressable onPress={() => router.back()}>
                        <Text style={estilos.voltar}>← Voltar</Text>
                    </Pressable>

                    <View style={estilos.loadingArea}>
                        {erroTreino ? (
                            <>
                                <MaterialIcons name="error-outline" size={42} color={Cores.laranja} />
                                <Text style={estilos.loadingTexto}>
                                    Não foi possível carregar o treino.
                                </Text>
                                <Text style={estilos.loadingDetalhe}>{erroTreino}</Text>
                            </>
                        ) : (
                            <>
                                <ActivityIndicator size="large" color={Cores.laranja} />
                                <Text style={estilos.loadingTexto}>
                                    Preparando seu treino...
                                </Text>
                            </>
                        )}
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

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
                        <Text style={estilos.voltar}>← Voltar</Text>
                    </Pressable>

                    <View style={estilos.cabecalho}>
                        <Text style={estilos.titulo}>{treino.nome}</Text>

                        {!iniciado && (
                            <Text style={estilos.subtitulo}>{treino.descricao}</Text>
                        )}
                    </View>

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

                    {iniciado && !emResumo && exercicio && (
                        <>
                            <Text style={estilos.progresso}>
                                Exercício {passo + 1} de {exercicios.length}
                            </Text>

                            <View style={estilos.card}>

                                {/* Vídeo: usa VideoAula se tiver ID, senão placeholder */}
                                {exercicio.videoUrl ? (
                                    <VideoAula videoId={exercicio.videoUrl} altura={180} />
                                ) : (
                                    <View style={estilos.videoPlaceholder}>
                                        <MaterialIcons
                                            name="videocam-off"
                                            size={28}
                                            color={Cores.cinza_clara}
                                        />
                                        <Text style={estilos.videoTexto}>Vídeo em breve</Text>
                                    </View>
                                )}

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

    loadingArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        gap: 16,
    },

    loadingTexto: {
        color: Cores.branco,
        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
        textAlign: "center",
    },

    loadingDetalhe: {
        color: Cores.textoSecundaria,
        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,
        textAlign: "center",
    },
});