import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";




export default function Status() {

    return (

            <SafeAreaView style={estilos.container}>

                <View style={estilos.cabecalho}>
                    <Text style={estilos.titulo}>
                        Estatísticas
                    </Text>
                </View>

                <View style={estilos.radarContainer}>

                </View>

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
        paddingTop: 25,
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