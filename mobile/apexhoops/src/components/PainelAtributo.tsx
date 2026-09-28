import { Pressable, StyleSheet, Text, View } from "react-native";

import GraficoHistorico from "@/components/GraficoHistorico";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

type PainelAtributoProps = { atributo: string; onFechar: () => void; };

export default function PainelAtributo({ atributo, onFechar } : PainelAtributoProps) {

const dadosHistorico: { periodo: string; minutos: number }[] = [];

    return (
        <View style={estilos.container}>

            <View style={estilos.cabecalho}>

                <Text style={estilos.titulo}>
                    {atributo}
                </Text>

                <Pressable
                    onPress={onFechar}
                    style={estilos.botaoFechar}
                >
                    <Text style={estilos.fechar}>
                        x
                    </Text>
                </Pressable>

            </View>

            <View style={estilos.conteudo}>

<View style={estilos.graficoContainer}>
    {dadosHistorico.length > 0 ? (
        <GraficoHistorico dados={dadosHistorico} />
    ) : (
        <Text style={estilos.texto}>
            Sem histórico disponível.
        </Text>
    )}
</View>

                <View style={estilos.descricaoContainer}>
                    {/* descrição do atributo */}
                </View>

            </View>


        </View>
    );
}

const estilos = StyleSheet.create({

    container: {
        width: "100%",
        paddingTop: 40,
    },

    titulo: {
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        fontSize: 20,
    },

    conteudo: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },

    graficoContainer: {
        flex: 3,
    },

    descricaoContainer: {
        flex: 2,
    },

    texto: {
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        fontSize: 14,
    },

    cabecalho: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    botaoFechar: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    fechar: {
        color: `${Cores.laranja}50`,
        fontSize: 24,
    },

});