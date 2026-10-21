import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { Medicoes } from "@/constants/Medicoes";
import { MedicaoExercicio } from "@/types/Treino";

type CampoResultadoProps = {
    medicao: MedicaoExercicio;
    valor: string;
    onChange: (valor: string) => void;
};

export default function CampoResultado({ medicao, valor, onChange }: CampoResultadoProps) {

    if (medicao === "concluido") {
        return (
            <View style={estilos.linha}>
                <Text style={estilos.label}>{Medicoes.concluido.rotulo}</Text>

                <View style={estilos.opcoes}>
                    {[
                        { valor: "1", texto: "Sim" },
                        { valor: "0", texto: "Não" },
                    ].map((opcao) => (
                        <Pressable
                            key={opcao.valor}
                            onPress={() => onChange(opcao.valor)}
                            style={[
                                estilos.opcao,
                                valor === opcao.valor && estilos.opcaoSelecionada,
                            ]}
                        >
                            <Text style={estilos.opcaoTexto}>{opcao.texto}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        );
    }

    return (
        <View style={estilos.linha}>
            <Text style={estilos.label}>{Medicoes[medicao].rotulo}</Text>

            <TextInput
                style={estilos.campo}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={Cores.cinza_clara}
                maxLength={4}
                value={valor}
                onChangeText={(texto) => onChange(texto.replace(/\D/g, ""))}
            />
        </View>
    );
}

const estilos = StyleSheet.create({

    linha: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    label: {
        color: Cores.textoSecundaria,
        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,
    },

    campo: {
        width: 80,
        height: 44,
        textAlign: "center",
        backgroundColor: `${Cores.cinza_clara}35`,
        color: Cores.branco,
        fontFamily: Fontes.titulo1,
        fontSize: Fontes.medio1,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Cores.cinza_escuro,
    },

    opcoes: {
        flexDirection: "row",
        gap: 8,
    },

    opcao: {
        width: 64,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Cores.cinza_escuro,
        backgroundColor: `${Cores.cinza_clara}15`,
    },

    opcaoSelecionada: {
        backgroundColor: `${Cores.laranja}35`,
        borderColor: Cores.laranja,
    },

    opcaoTexto: {
        color: Cores.branco,
        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },
});