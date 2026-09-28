import { Pressable, StyleSheet, Text, View } from "react-native";

import GraficoHistorico from "@/components/GraficoHistorico";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

type DadoHistorico = {
    periodo: string;
    minutos: number;
};

type PainelAtributoProps = {
    atributo: string;
    dadosHistorico: DadoHistorico[];
    onFechar: () => void;
};

export default function PainelAtributo({
    atributo,
    dadosHistorico,
    onFechar
}: PainelAtributoProps) {

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
        alignItems: "center",
        paddingTop: 25,
    },

    cabecalho: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    titulo: {
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        fontSize: 20,
    },

    conteudo: {
        flexDirection: "row",
        width: "100%",
        height: 200,
        marginTop: 10,
        padding: 10,

        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: `${Cores.laranja}25`,
        borderColor: Cores.laranja_escuro,
    },

    graficoContainer: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    descricaoContainer: {
        height: "100%",
    },

    texto: {
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        fontSize: 14,
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