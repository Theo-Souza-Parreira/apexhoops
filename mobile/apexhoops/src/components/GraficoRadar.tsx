import { StyleSheet, View, Text, Pressable } from "react-native";
import Svg, { Polygon, Circle } from "react-native-svg";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

const TOTAL_ATRIBUTOS = 7;
const ANGULO = 360 / TOTAL_ATRIBUTOS; // ~51.43°

type GraficoRadarProps = {
    onSelecionarAtributo: (nome: string) => void;
    tamanho?: number;
};

export default function GraficoRadar({
    onSelecionarAtributo,
    tamanho = 300,
}: GraficoRadarProps) {

    const escala = tamanho / 300;
    const centro = tamanho / 2;

    const calcularPonto = (
        valor: number,
        angulo: number,
        raio: number = 130
    ) => {
        const valorNormalizado = valor / 100;
        const distancia = raio * escala * valorNormalizado;
        const radianos = (angulo * Math.PI) / 180;
        const x = centro + distancia * Math.sin(radianos);
        const y = centro - distancia * Math.cos(radianos);
        return { x, y };
    };

    // Ordem começa no topo e segue sentido horário
    const atributos = [
        { nome: "Arremesso",       valor: 85, deslocamento: { x: 0,  y: -10 } },
        { nome: "Finalização",     valor: 75, deslocamento: { x: 8,  y: -6  } },
        { nome: "Passe",           valor: 70, deslocamento: { x: 10, y: 0   } },
        { nome: "Drible",          valor: 75, deslocamento: { x: 6,  y: 6   } },
        { nome: "Condicionamento", valor: 60, deslocamento: { x: 0,  y: 8   } },
        { nome: "Mão Fraca",       valor: 75, deslocamento: { x: -6, y: 6   } },
        { nome: "Defesa",          valor: 75, deslocamento: { x: -10, y: 0  } },
    ];

    const pontos = atributos.map((atributo, index) => {
        const angulo = index * ANGULO;
        return calcularPonto(atributo.valor, angulo);
    });

    const calcularPosicaoTexto = (angulo: number, distancia: number = 175) => {
        const radianos = (angulo * Math.PI) / 180;
        const distanciaEscalada = distancia * escala;
        const x = centro + distanciaEscalada * Math.sin(radianos);
        const y = centro - distanciaEscalada * Math.cos(radianos);
        return { left: x, top: y };
    };

    const criarPoligono = (raio: number) => {
        return Array.from({ length: TOTAL_ATRIBUTOS }, (_, index) => {
            const angulo = index * ANGULO;
            const radianos = (angulo * Math.PI) / 180;
            const distancia = raio * escala;
            const x = centro + distancia * Math.sin(radianos);
            const y = centro - distancia * Math.cos(radianos);
            return `${x},${y}`;
        }).join(" ");
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.grafico,
                    { width: tamanho, height: tamanho },
                ]}
            >
                <Svg width={tamanho} height={tamanho}>
                    {/* Níveis do polígono (de fora para dentro) */}
                    <Polygon points={criarPoligono(130)} fill="none" stroke={Cores.laranja} strokeWidth={2} />
                    <Polygon points={criarPoligono(90)}  fill="none" stroke={Cores.laranja} strokeWidth={2} />
                    <Polygon points={criarPoligono(50)}  fill="none" stroke={Cores.laranja} strokeWidth={2} />
                    <Polygon points={criarPoligono(25)}  fill="none" stroke={Cores.laranja} strokeWidth={2} />

                    {/* Área dos atributos */}
                    <Polygon
                        points={pontos.map((p) => `${p.x},${p.y}`).join(" ")}
                        fill={Cores.azul}
                        fillOpacity={0.35}
                        stroke={Cores.azul}
                        strokeWidth={3}
                    />

                    {/* Pontos dos atributos */}
                    {pontos.map((ponto, index) => (
                        <Circle
                            key={index}
                            cx={ponto.x}
                            cy={ponto.y}
                            r={5 * escala}
                            fill={Cores.azul}
                        />
                    ))}
                </Svg>

                {/* Nomes dos atributos */}
                {atributos.map((atributo, index) => {
                    const posicao = calcularPosicaoTexto(index * ANGULO);
                    return (
                        <Pressable
                            key={atributo.nome}
                            style={[
                                styles.atributo,
                                {
                                    left: posicao.left - 65 * escala + atributo.deslocamento.x * escala,
                                    top:  posicao.top  - 8  * escala + atributo.deslocamento.y * escala,
                                    width: 130 * escala,
                                },
                            ]}
                            onPress={() => onSelecionarAtributo(atributo.nome)}
                        >
                            <Text
                                style={[
                                    styles.textoAtributo,
                                    { fontSize: 11 * escala },
                                ]}
                            >
                                {atributo.nome}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 15,
    },
    grafico: {
        position: "relative",
    },
    atributo: {
        position: "absolute",
    },
    textoAtributo: {
        color: Cores.branco,
        fontFamily: Fontes.secundaria,
        textAlign: "center",
    },
});