import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

import { useAutenticacao } from "@/hooks/useAutenticacao";

// Mesmos códigos de posição usados no cadastro (novoUsuario.tsx)
const nomesPosicao: Record<string, string> = {
    PG: "Armador",
    SG: "Ala-armador",
    SF: "Ala",
    PF: "Ala-pivô",
    C: "Pivô",
};

export default function Perfil() {

    const { usuarioContexto, deslogar, deslogarContexto } = useAutenticacao();

    const sair = async () => {
        await deslogar();
        await deslogarContexto();
        router.replace("/");
    };

    const posicao = usuarioContexto?.posicao
        ? nomesPosicao[usuarioContexto.posicao] ?? usuarioContexto.posicao
        : "—";

    return (

        <ScrollView showsVerticalScrollIndicator={false}>

            <LinearGradient
                colors={[Cores.primaria, Cores.preto, Cores.musgo]}
                locations={[0, 0.5, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={estilos.fundo}
            >
                <SafeAreaView style={estilos.container}>

                    {/* =========================
                        CABEÇALHO
                    ========================= */}

                    <View style={estilos.cabecalho}>

                        <View style={estilos.perfilIcone}>
                            <View style={estilos.perfilCabeca} />
                            <View style={estilos.perfilCorpo} />
                        </View>

                        <Text style={estilos.nome}>
                            {usuarioContexto?.nome ?? "—"}
                        </Text>

                        <Text style={estilos.email}>
                            {usuarioContexto?.email ?? "—"}
                        </Text>

                    </View>

                    {/* =========================
                        PERFIL DO ATLETA
                    ========================= */}

                    <View style={estilos.card}>

                        <Text style={estilos.cardTitulo}>
                            Perfil do atleta
                        </Text>

                        <View style={estilos.linhaInfo}>
                            <Text style={estilos.infoLabel}>
                                Posição
                            </Text>

                            <Text style={estilos.infoValor}>
                                {posicao}
                            </Text>
                        </View>

                        <View style={estilos.linhaInfo}>
                            <Text style={estilos.infoLabel}>
                                Mão dominante
                            </Text>

                            <Text style={estilos.infoValor}>
                                {usuarioContexto?.mao || "—"}
                            </Text>
                        </View>

                        <View style={estilos.linhaInfo}>
                            <Text style={estilos.infoLabel}>
                                Nível
                            </Text>

                            <Text style={estilos.infoValor}>
                                {usuarioContexto?.nivel || "—"}
                            </Text>
                        </View>

                        <View style={[estilos.linhaInfo, estilos.linhaInfoUltima]}>
                            <Text style={estilos.infoLabel}>
                                Experiência
                            </Text>

                            <Text style={estilos.infoValor}>
                                {usuarioContexto?.experiencia || "—"}
                            </Text>
                        </View>

                    </View>

                    {/* =========================
                        SAIR
                    ========================= */}

                    <Pressable
                        style={({ pressed }) => [
                            estilos.botaoSair,
                            { opacity: pressed ? 0.85 : 1 },
                        ]}
                        onPress={sair}
                    >
                        <MaterialIcons
                            name="logout"
                            size={20}
                            color={Cores.laranja}
                        />

                        <Text style={estilos.botaoSairTexto}>
                            Sair
                        </Text>
                    </Pressable>

                </SafeAreaView>
            </LinearGradient>
        </ScrollView>
    );
}

const estilos = StyleSheet.create({

    fundo: {
        flexGrow: 1,
    },

    container: {
        flexGrow: 1,

        paddingHorizontal: 24,
        paddingTop: 25,
        paddingBottom: 30,
    },

    // =========================
    // CABEÇALHO
    // =========================

    cabecalho: {
        alignItems: "center",

        marginBottom: 25,
    },

    perfilIcone: {
        width: 90,
        height: 90,

        borderWidth: 2,
        borderColor: Cores.laranja,

        borderRadius: 50,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: `${Cores.primaria}60`,

        marginBottom: 14,
    },

    perfilCabeca: {
        width: 22,
        height: 22,

        borderWidth: 2.5,
        borderColor: Cores.laranja,

        borderRadius: 22,

        marginBottom: 3,
    },

    perfilCorpo: {
        width: 44,
        height: 24,

        borderWidth: 2.5,
        borderColor: Cores.laranja,

        borderBottomWidth: 0,

        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },

    nome: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande3,

        textAlign: "center",
    },

    email: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,

        marginTop: 4,
    },

    // =========================
    // CARD
    // =========================

    card: {
        width: "100%",

        backgroundColor: `${Cores.primaria}50`,

        borderWidth: 1,
        borderColor: `${Cores.laranja}55`,

        borderRadius: 16,

        padding: 20,

        marginBottom: 18,
    },

    cardTitulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande1,

        marginBottom: 14,
    },

    linhaInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: 12,

        borderBottomWidth: 1,
        borderBottomColor: `${Cores.cinza_escuro}80`,
    },

    linhaInfoUltima: {
        borderBottomWidth: 0,

        paddingBottom: 0,
    },

    infoLabel: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,
    },

    infoValor: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },

    // =========================
    // SAIR
    // =========================

    botaoSair: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        borderWidth: 1,
        borderColor: `${Cores.laranja}55`,

        borderRadius: 16,

        paddingVertical: 16,

        gap: 8,
    },

    botaoSairTexto: {
        color: Cores.laranja,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.medio1,
    },

});