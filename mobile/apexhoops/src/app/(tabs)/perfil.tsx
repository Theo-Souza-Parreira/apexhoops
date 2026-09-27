import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function Perfil() {

    return (

        <LinearGradient
            colors={[Cores.primaria, Cores.preto, Cores.musgo]}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={estilos.fundo}
        >
            <SafeAreaView style={estilos.container}>

                <View style={estilos.cabecalho}>
                    <Text style={estilos.titulo}>
                        Perfil
                    </Text>

                    <Text style={estilos.subtitulo}>
                        Em construção
                    </Text>
                </View>

            </SafeAreaView>
        </LinearGradient>
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
        marginBottom: 25,
    },

    titulo: {
        color: Cores.laranja,

        fontFamily: Fontes.titulo1,
        fontSize: Fontes.grande4,
    },

    subtitulo: {
        color: Cores.textoSecundaria,

        fontFamily: Fontes.secundaria,
        fontSize: Fontes.medio1,

        marginTop: 4,
    },

});