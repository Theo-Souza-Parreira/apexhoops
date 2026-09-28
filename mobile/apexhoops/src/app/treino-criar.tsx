import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function TreinoCriar() {

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
                    <Text style={estilos.voltar}>
                        ← Voltar
                    </Text>
                </Pressable>

                <View style={estilos.cabecalho}>
                    <Text style={estilos.titulo}>
                        Criar treinamento
                    </Text>

                    <Text style={estilos.subtitulo}>
                        Em breve você poderá montar seu próprio treino,
                        escolhendo exercícios e metas.
                    </Text>
                </View>

                <View style={estilos.botaoDesabilitado}>
                    <MaterialIcons
                        name="add"
                        size={20}
                        color={Cores.cinza_clara}
                    />

                    <Text style={estilos.botaoDesabilitadoTexto}>
                        Adicionar exercício
                    </Text>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
}

const estilos = StyleSheet.create({

    fundo: {
        flex: 1,
    },

    container: {
        flex: 1,

        paddingHorizontal: 24,
        paddingTop: 25,
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

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.grande4,
    },

    subtitulo: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,

        marginTop: 8,

        lineHeight: 20,
    },

    botaoDesabilitado: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        opacity: 0.4,

        borderWidth: 1,
        borderColor: Cores.cinza_escuro,

        borderRadius: 16,

        paddingVertical: 16,

        gap: 8,
    },

    botaoDesabilitadoTexto: {
        color: Cores.cinza_clara,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },

});