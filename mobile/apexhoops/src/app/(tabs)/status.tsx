import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

import GraficoRadar from "@/components/GraficoRadar";
import PainelAtributo from "@/components/PainelAtributo";


export default function Status() {

    const [atributoSelecionado, setAtributoSelecionado] =
    useState<string | null>(null);

    return (

            <SafeAreaView style={estilos.container}>

                <View style={estilos.cabecalho}>
                    <Text style={estilos.titulo}>
                        Estatísticas
                    </Text>
                </View>

                <GraficoRadar
                    onSelecionarAtributo={setAtributoSelecionado}
                    tamanho={270}
                />

                {atributoSelecionado && (
                    <PainelAtributo
                        atributo={atributoSelecionado}
                        onFechar={() => setAtributoSelecionado(null)}
                    />
                )}
            </SafeAreaView>
    );
}

const estilos = StyleSheet.create({

    fundo: {
        flex: 1,
    },

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 10,
    },

    cabecalho: {
        marginBottom: 30,
        marginTop: 15,
        alignItems: "center",
    },

    titulo: {
        color: Cores.branco,
        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande4,
    },

    radarContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },

});