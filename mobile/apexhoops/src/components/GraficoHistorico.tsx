import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { Cores } from "@/constants/Cores";

type DadoHistorico = {
    periodo: string;
    minutos: number;
};

type GraficoHistoricoProps = {
    dados: DadoHistorico[];
    largura: number;
    altura: number;
};

const LARGURA_BASE = 400;
const ALTURA_BASE = 180;

export default function GraficoHistorico({
    dados,
    largura,
    altura,
}: GraficoHistoricoProps) {

    const dadosGrafico = dados.map((item) => ({
        value: item.minutos,
        label: item.periodo,
    }));

    const escalaX = largura / LARGURA_BASE;
    const escalaY = altura / ALTURA_BASE;

    return (
        <View
            style={[
                estilos.container,
                {
                    width: largura,
                    height: altura,
                },
            ]}
        >

            <View
                style={[
                    estilos.grafico,
                    {
                        transform: [
                            { scaleX: escalaX },
                            { scaleY: escalaY },
                        ],
                    },
                ]}
            >

                <LineChart
                    data={dadosGrafico}

                    width={LARGURA_BASE}
                    height={ALTURA_BASE}

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
                        fontSize: 11,
                    }}

                    yAxisColor={Cores.laranja}
                    xAxisColor={Cores.laranja}

                    rulesColor={`${Cores.laranja}40`}
                    rulesType="dashed"

                    noOfSections={4}
                    yAxisLabelSuffix=" min"

                    xAxisLabelsHeight={25}
                />

            </View>

        </View>
    );
}

const estilos = StyleSheet.create({

    container: {
        alignItems: "center",
        justifyContent: "center",
    },

    grafico: {
        width: LARGURA_BASE,
        height: ALTURA_BASE,
    },

});