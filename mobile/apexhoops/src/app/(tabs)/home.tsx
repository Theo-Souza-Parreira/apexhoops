import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { UsuarioTipo } from "@/types/Usuario";

export default function Home(){
    return(
        <LinearGradient
            colors={[Cores.primaria, Cores.preto, Cores.musgo]}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={estilos.fundo}
        >
           
            <SafeAreaView style={estilos.conteiner}>

                <View style={estilos.ola}>
                    
                    <Text style={estilos.titulo}>
                        Bem Vindo,

                        <Text style={estilos.titulolaranja}>
                            Nome!
                        </Text>
                    </Text>
                        
                    <View style={estilos.perfilIcone}>
                        <View style={estilos.perfilCabeca} />
                        <View style={estilos.perfilCorpo} />
                    </View>

                </View>

                <View style={estilos.titulo2}>
                    
                    <Text style={estilos.home}>
                        Home
                    </Text>

                </View>

                <View style={estilos.historico}>

                    <Text style={estilos.tituloHistorico}>
                        Última semana
                    </Text>

                    <View style={estilos.estatistica}>
                        <View style={estilos.arremessos}>
                            <Text style={estilos.icone}>●</Text>
                        </View>

                        <Text style={estilos.historicotxt1}>X</Text>
                        <Text style={estilos.historicotxt2}>arremessos</Text>
                    </View>

                    <View style={estilos.estatistica}>
                        <View style={estilos.tempo}>
                            <Text style={estilos.icone}>◉</Text>
                        </View>

                        <Text style={estilos.historicotxt1}>X</Text>
                        <Text style={estilos.historicotxt2}>min</Text>
                    </View>

                    <View style={estilos.estatistica}>
                        <View style={estilos.dias}>
                            <Text style={estilos.icone}>♨</Text>
                        </View>

                        <Text style={estilos.historicotxt1}>X</Text>
                        <Text style={estilos.historicotxt2}>dias de sequência</Text>
                    </View>

                </View>

                <View style={estilos.meta}>
                    <Text style={estilos.titulometa}>Meta</Text>
                    <View style={estilos.linha}>
                        <View style={estilos.progresso} />
                    </View>
                    <Text style={estilos.titulometa2}>X%</Text><Text style={estilos.txtmeta}>dos treinos realizados</Text>
                </View>

            </SafeAreaView>
        </LinearGradient>
    )
}

const estilos = StyleSheet.create({

    fundo: {
        flex: 1,
    },

    conteiner: {
        flex: 1,
        alignItems: "center",
        paddingTop: 45,
        paddingHorizontal: 42,
    },


    // =========================
    // CABEÇALHO
    // =========================

    ola: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginBottom: 65,
    },

    titulo: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande3,

        lineHeight: 38,
    },

    titulolaranja: {
        color: Cores.laranja,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande3,

        lineHeight: 38,
    },


    // =========================
    // PERFIL
    // =========================

    perfilIcone: {
        width: 90,
        height: 90,

        borderWidth: 2,
        borderColor: Cores.laranja,

        borderRadius: 50,

        justifyContent: "center",
        alignItems: "center",
    },

    perfilCabeca: {
        width: 24,
        height: 24,

        borderWidth: 4,
        borderColor: Cores.laranja,

        borderRadius: 20,

        marginBottom: 5,
    },

    perfilCorpo: {
        width: 55,
        height: 28,

        borderWidth: 3,
        borderColor: Cores.laranja,

        borderBottomWidth: 0,

        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },


    // =========================
    // HOME
    // =========================

    titulo2: {
        width: 143,
        height: 54,

        backgroundColor: Cores.primaria,

        justifyContent: "center",
        alignItems: "center",

        borderRadius: 6,

        marginBottom: 45,

        transform: [
            {
                rotate: "-2deg",
            },
        ],
    },

    home: {
        color: Cores.cinza_clara,

        fontFamily: Fontes.primaria,
        fontSize: Fontes.grande1,
    },


    // =========================
    // ÚLTIMA SEMANA
    // =========================

    historico: {
        width: "100%",
        height: 181,

        backgroundColor: `${Cores.primaria}45`,

        borderWidth: 1,
        borderColor: `${Cores.laranja}80`,

        borderRadius: 11,

        paddingHorizontal: 29,
        paddingTop: 15,

        marginBottom: 48,
    },

    tituloHistorico: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande1,

        marginBottom: 8,
    },

    estatistica: {
        flexDirection: "row",
        alignItems: "center",

        height: 37,
    },


    // =========================
    // ÍCONES
    // =========================

    arremessos: {
        width: 29,
        height: 29,

        borderRadius: 50,

        backgroundColor: Cores.laranja,

        justifyContent: "center",
        alignItems: "center",

        marginRight: 10,
    },

    tempo: {
        width: 29,
        height: 29,

        borderRadius: 50,

        backgroundColor: Cores.azul,

        justifyContent: "center",
        alignItems: "center",

        marginRight: 10,
    },

    dias: {
        width: 29,
        height: 29,

        borderRadius: 50,

        backgroundColor: Cores.musgo,

        justifyContent: "center",
        alignItems: "center",

        marginRight: 10,
    },

    icone: {
        color: Cores.branco,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.medio1,
    },


    // =========================
    // TEXTOS
    // =========================

    historicotxt1: {
        color: Cores.branco,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.medio2,

        marginRight: 5,
    },

    historicotxt2: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,
    },


    // =========================
    // META
    // =========================

    meta: {
        width: "100%",
        height: 164,

        backgroundColor: `${Cores.primaria}45`,

        borderWidth: 1,
        borderColor: `${Cores.laranja}80`,

        borderRadius: 11,

        paddingHorizontal: 29,
        paddingTop: 15,
    },

    titulometa: {
        color: Cores.branco,

        fontFamily: Fontes.titulo2,
        fontSize: Fontes.grande1,

        marginBottom: 14,
    },

    linha: {
        width: "100%",
        height: 37,

        borderWidth: 2,
        borderColor: Cores.laranja,

        borderRadius: 30,

        padding: 2,

        justifyContent: "center",
    },

    progresso: {
        width: "58%",
        height: "100%",

        backgroundColor: Cores.primaria,

        borderRadius: 30,
    },

    titulometa2: {
        color: Cores.branco,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.medio2,

        marginTop: 14,

        marginRight: 5,
    },

    txtmeta: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.pequeno,
    },

});