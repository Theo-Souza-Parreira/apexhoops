
import { StyleSheet, View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

type DadoHistorico = {
    periodo: string;
    minutos: number;
};

type GraficoHistoricoProps = {
    dados: DadoHistorico[];
};

export default function GraficoHistorico({
    dados,
}: GraficoHistoricoProps) {

    const dadosGrafico = dados.map((item) => ({
        value: item.minutos,
        label: item.periodo,
    }));

    return (
        <View style={estilos.container}>

            <Text style={estilos.rotuloEixo}>
                Tempo (min)
            </Text>

            <LineChart
                data={dadosGrafico}
                areaChart
                startFillColor={Cores.laranja}
                endFillColor={Cores.laranja}
                startOpacity={0.25}
                endOpacity={0.25}
                height={130}
                thickness={2}
                color={Cores.laranja}
                dataPointsColor={Cores.laranja}
                dataPointsRadius={3}
                spacing={28}
                initialSpacing={10}
                endSpacing={10}
                xAxisThickness={1}
                xAxisColor={Cores.cinza_clara}
                yAxisThickness={0}
                yAxisTextStyle={{
                    color: Cores.cinza_clara,
                    fontFamily: Fontes.primaria,
                    fontSize: 9,
                }}
                xAxisLabelTextStyle={{
                    color: Cores.cinza_clara,
                    fontFamily: Fontes.titulo1,
                    fontSize: 9,
                }}
                rulesColor={Cores.cinza_clara}
                rulesType="dashed"
                noOfSections={4}
                isAnimated
                animationDuration={800}
            />
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

    rotuloEixo: {
        color: Cores.cinza_clara,
        fontFamily: Fontes.primaria,
        fontSize: 10,
        marginBottom: 4,
    },
});