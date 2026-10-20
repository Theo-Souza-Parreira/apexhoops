import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState, useEffect } from "react";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

import GraficoRadar from "@/components/GraficoRadar";
import PainelAtributo from "@/components/PainelAtributo";

import { chamarApi } from "@/services/Api";
import { useAutenticacao } from "@/hooks/useAutenticacao";

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


export default function Status() {

    const { usuarioContexto, carregando } = useAutenticacao();

    const [atributoSelecionado, setAtributoSelecionado] =
        useState<string | null>(null);

    const [carregandoApi, setCarregandoApi] = useState(false);
    const [erroApi, setErroApi] = useState<string | null>(null);

    // --------------------------------------------------
    // Busca os atributos só quando a sessão estiver pronta
    // --------------------------------------------------
    useEffect(() => {
        if (carregando || !usuarioContexto) return;

        let cancelado = false;

        async function buscarAtributos() {
            setCarregandoApi(true);
            setErroApi(null);

            try {
                const dados = await chamarApi("/v1/atributos");
                if (!cancelado) {
                    console.log("ATRIBUTOS:", JSON.stringify(dados));
                }
            } catch (erro: any) {
                if (!cancelado) {
                    console.log("ERRO API:", erro.message);
                    setErroApi(erro.message);
                }
            } finally {
                if (!cancelado) setCarregandoApi(false);
            }
        }

        buscarAtributos();

        return () => {
            cancelado = true;
        };
    }, [carregando, usuarioContexto]);

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
    
    
    const eficienciaPorAtributo: Record<string, DadosEficiencia> = {
        "Arremesso": {
            mensal: [
                { periodo: "JAN", acertos: 12, erros: 8 },
                { periodo: "FEV", acertos: 15, erros: 5 },
                { periodo: "MAR", acertos: 18, erros: 7 },
                { periodo: "ABR", acertos: 16, erros: 9 },
                { periodo: "MAI", acertos: 20, erros: 10 },
                { periodo: "JUN", acertos: 17, erros: 13 },
                { periodo: "JUL", acertos: 18, erros: 12 },
                { periodo: "AGO", acertos: 14, erros: 6 },
            ],
        },

        "Finalização": {
            mensal: [
                { periodo: "JAN", acertos: 8, erros: 5 },
                { periodo: "FEV", acertos: 10, erros: 4 },
                { periodo: "MAR", acertos: 12, erros: 6 },
                { periodo: "ABR", acertos: 9, erros: 5 },
                { periodo: "MAI", acertos: 11, erros: 3 },
                { periodo: "JUN", acertos: 13, erros: 4 },
                { periodo: "JUL", acertos: 12, erros: 5 },
                { periodo: "AGO", acertos: 10, erros: 3 },
            ],
        },

        "Mão Fraca": {
            mensal: [
                { periodo: "JAN", acertos: 3, erros: 7 },
                { periodo: "FEV", acertos: 4, erros: 6 },
                { periodo: "MAR", acertos: 5, erros: 5 },
                { periodo: "ABR", acertos: 6, erros: 4 },
                { periodo: "MAI", acertos: 5, erros: 5 },
                { periodo: "JUN", acertos: 7, erros: 3 },
                { periodo: "JUL", acertos: 6, erros: 4 },
                { periodo: "AGO", acertos: 6, erros: 4 },
            ],
        },
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