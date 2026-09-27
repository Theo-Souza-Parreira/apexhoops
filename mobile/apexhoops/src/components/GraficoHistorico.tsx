import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { Cores } from "@/constants/Cores";

type DadoHistorico = {
    periodo: string;
    minutos: number;
};

type GraficoHistoricoProps = {
    dados: DadoHistorico[];
    largura?: number;
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

            <LineChart
                data={dadosGrafico}

                width={200}
                height={180}

                color={Cores.laranja}
                thickness={3}
                curved

                hideDataPoints={false}
                dataPointsColor={Cores.laranja}
                dataPointsRadius={4}

                yAxisTextStyle={{
                    color: Cores.branco,
                }}

                xAxisLabelTextStyle={{
                    color: Cores.branco,
                }}

                yAxisColor={Cores.laranja}
                xAxisColor={Cores.laranja}
                rulesColor={Cores.laranja}
                rulesType="dashed"

                noOfSections={4}
                yAxisLabelSuffix=" min"
            />

        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
});