import { Pressable, StyleSheet, Text, View } from "react-native";

import GraficoHistorico from "@/components/GraficoHistorico";

import { LineChart } from "react-native-gifted-charts";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

type DadoHistorico = {
    periodo: string;
    minutos: number;
};

type DadoDesempenhoMensal = {
    periodo: string;
    acertos: number;
    erros: number;
};

type DadosEficiencia = {
    mensal: DadoDesempenhoMensal[];
};

type PainelAtributoProps = {
    atributo: string;
    dadosHistorico: DadoHistorico[];
    dadosEficiencia?: DadosEficiencia;
    onFechar: () => void;
};

export default function PainelAtributo({
    atributo,
    dadosHistorico,
    dadosEficiencia,
    onFechar,
}: PainelAtributoProps) {

    // Garante que dadosHistorico nunca seja undefined
    const historicoSeguro = dadosHistorico ?? [];

    // Cálculos de eficiência (só se dadosEficiencia existir)
    const totalAcertos = dadosEficiencia?.mensal?.reduce(
        (total, mes) => total + mes.acertos,
        0
    ) ?? 0;

    const totalErros = dadosEficiencia?.mensal?.reduce(
        (total, mes) => total + mes.erros,
        0
    ) ?? 0;

    const totalTentativas = totalAcertos + totalErros;

    const eficienciaGeral = totalTentativas > 0
        ? (totalAcertos / totalTentativas) * 100
        : 0;

    // Prepara os dados dos gráficos com fallback seguro
    const dadosAcertos = dadosEficiencia?.mensal?.map((mes) => ({
        value: mes.acertos,
        label: mes.periodo,
    })) ?? [];

    const dadosErros = dadosEficiencia?.mensal?.map((mes) => ({
        value: mes.erros,
        label: mes.periodo,
    })) ?? [];

    // Só mostra o gráfico de eficiência se AMBOS os arrays tiverem dados
    const podeMostrarGraficoEficiencia =
        dadosAcertos.length > 0 && dadosErros.length > 0;

    return (
        <View style={estilos.container}>
            <View style={estilos.cabecalho}>
                <Text style={estilos.titulo}>{atributo}</Text>

                <Pressable onPress={onFechar} style={estilos.botaoFechar}>
                    <Text style={estilos.fechar}>x</Text>
                </Pressable>
            </View>

            {/* Painel 1: histórico de treino */}
            <View style={estilos.conteudo}>
                <Text style={estilos.subtitulo}>Tempo treinado por mês</Text>
                <View style={estilos.graficoContainer}>
                    <GraficoHistorico dados={historicoSeguro} />
                </View>
            </View>

            {/* Painel 2: desempenho (só se dadosEficiencia existir) */}
            {dadosEficiencia && (
                <View style={estilos.conteudo}>
                    <Text style={estilos.subtitulo}>Desempenho nos treinos</Text>

                    <View style={estilos.resumoEficiencia}>
                        <View>
                            <Text style={estilos.texto}>Eficiência geral</Text>
                            <Text style={estilos.valor}>
                                {eficienciaGeral.toFixed(1)}%
                            </Text>
                        </View>

                        <View style={estilos.resumoNumeros}>
                            <Text style={estilos.texto}>Acertos: {totalAcertos}</Text>
                            <Text style={estilos.texto}>Erros: {totalErros}</Text>
                            <Text style={estilos.texto}>Tentativas: {totalTentativas}</Text>
                        </View>
                    </View>

                    <Text style={estilos.textoGrafico}>Acertos x Erros por mês</Text>

                    {podeMostrarGraficoEficiencia ? (
                        <LineChart
                            data={dadosAcertos}
                            data2={dadosErros}
                            height={150}
                            width={260}
                            spacing={30}
                            color={Cores.laranja}
                            color2={Cores.azul}
                            thickness={2}
                            thickness2={2}
                            dataPointsColor={Cores.laranja}
                            dataPointsColor2={Cores.azul}
                            xAxisLabelTextStyle={estilos.rotuloEixo}
                            yAxisTextStyle={estilos.rotuloEixo}
                            rulesColor={`${Cores.branco}25`}
                            noOfSections={4}
                            initialSpacing={10}
                            endSpacing={10}
                        />
                    ) : (
                        <Text style={estilos.textoVazio}>
                            Sem dados de desempenho para exibir.
                        </Text>
                    )}

                    <View style={estilos.legenda}>
                        <View style={estilos.itemLegenda}>
                            <View style={[estilos.pontoLegenda, { backgroundColor: Cores.laranja }]} />
                            <Text style={estilos.texto}>Acertos</Text>
                        </View>

                        <View style={estilos.itemLegenda}>
                            <View style={[estilos.pontoLegenda, { backgroundColor: Cores.azul }]} />
                            <Text style={estilos.texto}>Erros</Text>
                        </View>
                    </View>

                    <Text style={estilos.textoGrafico}>Desempenho mensal</Text>

                    <View style={estilos.tabela}>
                        <View style={[estilos.linhaTabela, estilos.cabecalhoTabela]}>
                            <Text style={[estilos.celula, estilos.celulaMes]}>Mês</Text>
                            <Text style={estilos.celula}>Acertos</Text>
                            <Text style={estilos.celula}>Erros</Text>
                            <Text style={estilos.celula}>Eficiência</Text>
                        </View>

                        {dadosEficiencia.mensal.map((mes) => {
                            const tentativas = mes.acertos + mes.erros;
                            const eficiencia = tentativas > 0
                                ? (mes.acertos / tentativas) * 100
                                : 0;

                            return (
                                <View key={mes.periodo} style={estilos.linhaTabela}>
                                    <Text style={[estilos.celula, estilos.celulaMes]}>
                                        {mes.periodo}
                                    </Text>
                                    <Text style={estilos.celula}>{mes.acertos}</Text>
                                    <Text style={estilos.celula}>{mes.erros}</Text>
                                    <Text style={estilos.celula}>
                                        {eficiencia.toFixed(1)}%
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            )}
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
        width: "100%",
        marginTop: 16,
        padding: 14,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: `${Cores.laranja}25`,
        borderColor: Cores.laranja_escuro,
    },

    graficoContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    texto: {
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        fontSize: 14,
    },

    textoVazio: {
        color: Cores.cinza_clara,
        fontFamily: Fontes.secundaria,
        fontSize: 12,
        textAlign: "center",
        marginVertical: 12,
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

    valor: {
        color: Cores.laranja,
        fontFamily: Fontes.titulo2,
        fontSize: 32,
    },

    subtitulo: {
        color: Cores.branco,
        fontFamily: Fontes.titulo2,
        fontSize: 16,
        marginBottom: 12,
    },

    resumoEficiencia: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 12,
    },

    resumoNumeros: {
        alignItems: "flex-end",
        gap: 6,
    },

    textoGrafico: {
        color: Cores.branco,
        fontFamily: Fontes.titulo2,
        fontSize: 14,
        marginBottom: 8,
    },

    rotuloEixo: {
        color: Cores.branco,
        fontSize: 10,
    },

    legenda: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginTop: 8,
    },

    itemLegenda: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    pontoLegenda: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },

    tabela: {
        width: "100%",
        marginTop: 8,
    },

    linhaTabela: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: `${Cores.branco}20`,
    },

    cabecalhoTabela: {
        borderBottomWidth: 1,
        borderBottomColor: Cores.laranja,
    },

    celula: {
        flex: 1,
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        fontSize: 11,
        textAlign: "center",
    },

    celulaMes: {
        flex: 0.8,
        textAlign: "left",
    },
});