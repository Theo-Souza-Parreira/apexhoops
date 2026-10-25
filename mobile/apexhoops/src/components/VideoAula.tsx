import { useState } from "react";
import {
    Image,
    ImageErrorEventData,
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import YoutubePlayer from "react-native-youtube-iframe";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

type VideoAulaProps = {
    videoId: string;
    altura?: number;
};

export default function VideoAula({ videoId, altura = 200 }: VideoAulaProps) {

    const [mostrarPlayer, setMostrarPlayer] = useState(false);
    const [erro, setErro] = useState(false);
    const [erroImagem, setErroImagem] = useState(false);

    const urlMiniatura = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // ---- LOGS DE DIAGNÓSTICO ----
    console.log("[VideoAula] Renderizando com videoId:", videoId);
    console.log("[VideoAula] URL da miniatura:", urlMiniatura);
    console.log("[VideoAula] mostrarPlayer:", mostrarPlayer, "| erro:", erro, "| erroImagem:", erroImagem);

    if (!videoId) {
        console.log("[VideoAula] videoId vazio — mostrando aviso");
        return (
            <View style={[estilos.container, { height: altura }]}>
                <View style={estilos.fallback}>
                    <MaterialIcons name="videocam-off" size={28} color={Cores.cinza_clara} />
                    <Text style={estilos.textoFallback}>Sem vídeo para este exercício</Text>
                </View>
            </View>
        );
    }

    // --------------------------------------------------
    // Player carregado
    // --------------------------------------------------
    if (mostrarPlayer) {
        return (
            <View style={[estilos.container, { height: altura }]}>
                <YoutubePlayer
                    height={altura}
                    videoId={videoId}
                    onReady={() => console.log("[VideoAula] Player PRONTO")}
                    onError={(e: string) => {
                        console.log("[VideoAula] ERRO do player:", e);
                        setErro(true);
                    }}
                    forceAndroidAutoplay
                />

                {erro && (
                    <View style={estilos.overlayErro}>
                        <MaterialIcons name="error-outline" size={32} color={Cores.laranja} />
                        <Text style={estilos.textoErro}>Não foi possível carregar o vídeo.</Text>
                        <Text style={estilos.textoErroId}>ID: {videoId}</Text>
                        <Pressable
                            onPress={() => {
                                setErro(false);
                                setMostrarPlayer(false);
                            }}
                        >
                            <Text style={estilos.botaoErro}>Voltar à miniatura</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        );
    }

    // --------------------------------------------------
    // Miniatura
    // --------------------------------------------------
    return (
        <Pressable
            onPress={() => {
                console.log("[VideoAula] Clicou na miniatura — abrindo player");
                setMostrarPlayer(true);
            }}
            style={({ pressed }) => [
                estilos.container,
                { height: altura, opacity: pressed ? 0.9 : 1 },
            ]}
        >
            {!erroImagem ? (
                <Image
                    source={{ uri: urlMiniatura }}
                    style={estilos.miniatura}
                    resizeMode="cover"
                    onLoad={() => console.log("[VideoAula] Miniatura CARREGOU")}
                    onError={(e: NativeSyntheticEvent<ImageErrorEventData>) => {
                        console.log("[VideoAula] ERRO ao carregar miniatura:", e.nativeEvent);
                        setErroImagem(true);
                    }}
                />
            ) : (
                <View style={estilos.fallback}>
                    <MaterialIcons name="play-circle-filled" size={48} color={Cores.laranja} />
                    <Text style={estilos.textoFallback}>Clique para assistir</Text>
                </View>
            )}

            <View style={estilos.overlayPlay}>
                <MaterialIcons name="play-circle-filled" size={64} color={Cores.branco} />
            </View>

            <View style={estilos.badge}>
                <MaterialIcons name="ondemand-video" size={14} color={Cores.branco} />
                <Text style={estilos.badgeTexto}>Vídeo aula</Text>
            </View>
        </Pressable>
    );
}

const estilos = StyleSheet.create({

    container: {
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: Cores.preto,
        marginBottom: 14,
    },

    miniatura: {
        width: "100%",
        height: "100%",
    },

    overlayPlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    badge: {
        position: "absolute",
        top: 10,
        left: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.7)",
    },

    badgeTexto: {
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        fontSize: 11,
    },

    fallback: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    textoFallback: {
        color: Cores.textoSecundaria,
        fontFamily: Fontes.secundaria,
        fontSize: 12,
    },

    overlayErro: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: 20,
    },

    textoErro: {
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        fontSize: 14,
        textAlign: "center",
    },

    textoErroId: {
        color: Cores.cinza_clara,
        fontFamily: Fontes.primaria,
        fontSize: 10,
    },

    botaoErro: {
        color: Cores.laranja,
        fontFamily: Fontes.titulo2,
        fontSize: 14,
        marginTop: 8,
    },
});