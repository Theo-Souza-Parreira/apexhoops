import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { ExercicioTreino } from "@/types/Treino";

export type EstadoExercicio = "pronto" | "executando" | "finalizado";

type ExecucaoExercicioProps = {
    exercicio: ExercicioTreino;
    estado: EstadoExercicio;
    onIniciar: () => void;
    onFinalizar: (minutos?: number) => void;
};

// 125 segundos -> "02:05"
const formatar = (segundos: number) =>
    `${String(Math.floor(segundos / 60)).padStart(2, "0")}:${String(segundos % 60).padStart(2, "0")}`;

export default function ExecucaoExercicio({
    exercicio,
    estado,
    onIniciar,
    onFinalizar,
}: ExecucaoExercicioProps) {

    const ehTempo = exercicio.medicao === "tempo";
    const totalSegundos = exercicio.meta * 60;

    const [inicio, setInicio] = useState<number | null>(null);
    const [agora, setAgora] = useState(Date.now());

    // Ao iniciar, guarda a hora de começo e atualiza a tela a cada meio segundo
    useEffect(() => {
        if (estado !== "executando") return;

        const comeco = Date.now();
        setInicio(comeco);
        setAgora(comeco);

        const id = setInterval(() => setAgora(Date.now()), 500);
        return () => clearInterval(id);
    }, [estado]);

    const decorridos = inicio ? Math.floor((agora - inicio) / 1000) : 0;
    const restante = Math.max(totalSegundos - decorridos, 0);

    // Fim da contagem regressiva: vibra e finaliza com o tempo da meta
    useEffect(() => {
        if (estado === "executando" && ehTempo && inicio && restante === 0) {
            Vibration.vibrate(500);
            onFinalizar(exercicio.meta);
        }
    }, [restante, estado]);

    if (estado === "finalizado") return null;

    if (estado === "pronto") {
        return (
            <View style={estilos.area}>
                <Pressable
                    onPress={onIniciar}
                    style={({ pressed }) => [
                        estilos.botaoPlay,
                        { opacity: pressed ? 0.85 : 1 },
                    ]}
                >
                    <MaterialIcons name="play-arrow" size={52} color={Cores.branco} />
                </Pressable>

                <Text style={estilos.dica}>
                    {ehTempo
                        ? `Toque para iniciar o cronômetro de ${exercicio.meta} min`
                        : "Toque para iniciar o exercício"}
                </Text>
            </View>
        );
    }

    return (
        <View style={estilos.area}>
            <Text style={estilos.tempo}>
                {formatar(ehTempo ? restante : decorridos)}
            </Text>

            <Text style={estilos.dica}>
                {ehTempo ? "Tempo restante" : "Exercício em andamento"}
            </Text>

            <Pressable
                onPress={() =>
                    onFinalizar(ehTempo ? Math.round(decorridos / 60) : undefined)
                }
                style={({ pressed }) => [
                    estilos.botaoTerminar,
                    { opacity: pressed ? 0.85 : 1 },
                ]}
            >
                <MaterialIcons name="stop" size={22} color={Cores.laranja} />
                <Text style={estilos.botaoTerminarTexto}>Terminar</Text>
            </Pressable>
        </View>
    );
}

const estilos = StyleSheet.create({

    area: {
        alignItems: "center",
        paddingVertical: 6,
    },

    botaoPlay: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: Cores.laranja,
        alignItems: "center",
        justifyContent: "center",
    },

    tempo: {
        color: Cores.branco,
        fontFamily: Fontes.titulo1,
        fontSize: Fontes.grande4,
    },

    dica: {
        color: Cores.textoSecundaria,
        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,
        marginTop: 10,
        textAlign: "center",
    },

    botaoTerminar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 16,
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: `${Cores.laranja}88`,
    },

    botaoTerminarTexto: {
        color: Cores.laranja,
        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },
});