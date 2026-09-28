import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

import GraficoRadar from "@/components/GraficoRadar";
import PainelAtributo from "@/components/PainelAtributo";

type DadoHistorico = {
    periodo: string;
    minutos: number;
};


export default function Status() {

    const [atributoSelecionado, setAtributoSelecionado] =
    useState<string | null>(null);

    const historicoPorAtributo: Record<string, DadoHistorico[]> = {

        "Arremesso": [
            { periodo: "JAN", minutos: 180 },
            { periodo: "FEV", minutos: 220 },
            { periodo: "MAR", minutos: 280 },
            { periodo: "ABR", minutos: 250 },
            { periodo: "MAI", minutos: 320 },
            { periodo: "JUN", minutos: 290 },
            { periodo: "JUL", minutos: 350 },
            { periodo: "AGO", minutos: 310 },
        ],

        "Finalização": [
            { periodo: "JAN", minutos: 120 },
            { periodo: "FEV", minutos: 160 },
            { periodo: "MAR", minutos: 190 },
            { periodo: "ABR", minutos: 230 },
            { periodo: "MAI", minutos: 210 },
            { periodo: "JUN", minutos: 270 },
            { periodo: "JUL", minutos: 300 },
            { periodo: "AGO", minutos: 280 },
        ],

        "Drible": [
            { periodo: "JAN", minutos: 200 },
            { periodo: "FEV", minutos: 240 },
            { periodo: "MAR", minutos: 220 },
            { periodo: "ABR", minutos: 280 },
            { periodo: "MAI", minutos: 310 },
            { periodo: "JUN", minutos: 290 },
            { periodo: "JUL", minutos: 340 },
            { periodo: "AGO", minutos: 360 },
        ],

        "Condicionamento": [
            { periodo: "JAN", minutos: 150 },
            { periodo: "FEV", minutos: 180 },
            { periodo: "MAR", minutos: 300 },
            { periodo: "ABR", minutos: 250 },
            { periodo: "MAI", minutos: 350 },
            { periodo: "JUN", minutos: 200 },
            { periodo: "JUL", minutos: 20 },
            { periodo: "AGO", minutos: 150 },
        ],

        "Mão Fraca": [
            { periodo: "JAN", minutos: 100 },
            { periodo: "FEV", minutos: 140 },
            { periodo: "MAR", minutos: 180 },
            { periodo: "ABR", minutos: 220 },
            { periodo: "MAI", minutos: 260 },
            { periodo: "JUN", minutos: 240 },
            { periodo: "JUL", minutos: 300 },
            { periodo: "AGO", minutos: 280 },
        ],

        "Defesa": [
            { periodo: "JAN", minutos: 170 },
            { periodo: "FEV", minutos: 210 },
            { periodo: "MAR", minutos: 230 },
            { periodo: "ABR", minutos: 280 },
            { periodo: "MAI", minutos: 260 },
            { periodo: "JUN", minutos: 310 },
            { periodo: "JUL", minutos: 290 },
            { periodo: "AGO", minutos: 340 },
        ],
    };

    return (

            <SafeAreaView style={estilos.container}>

                <View style={estilos.cabecalho}>
                    <Text style={estilos.titulo}>
                        Estatísticas
                    </Text>
                </View>

                <GraficoRadar
                    onSelecionarAtributo={setAtributoSelecionado}
                    tamanho={260}
                />

                {atributoSelecionado && (
                    <PainelAtributo
                        atributo={atributoSelecionado}
                        dadosHistorico={historicoPorAtributo[atributoSelecionado]}
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