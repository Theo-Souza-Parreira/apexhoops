import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function BoasVindas() {
  return (
    <LinearGradient
      colors={[Cores.primaria, Cores.preto, Cores.musgo]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={estilos.fundo}
    >
      <SafeAreaView style={estilos.conteiner}>
        <Image
          source={require("../../assets/images/layout/logo.png")}
          style={estilos.logo}
        />

        <Text style={estilos.subtitulo}>Treine como a Elite</Text>

        <View style={estilos.card}>
          <Text style={estilos.titulo}>Vamos começar</Text>

          <Text style={estilos.textoApoio}>
            Responda algumas perguntas para montarmos treinos feitos para você.
          </Text>

          <Pressable
            style={({ pressed }) => [estilos.botao, { opacity: pressed ? 0.9 : 1 }]}
            onPress={() => router.push("/novoUsuario")}
          >
            <Text style={estilos.rotulo}>Começar</Text>
          </Pressable>

          <Text style={estilos.pergunta}>Já tem conta?</Text>

          <Pressable
            style={({ pressed }) => [estilos.botaoEntrar, { opacity: pressed ? 0.85 : 1 }]}
            onPress={() => router.push("/login")}
          >
            <Text style={estilos.entrarTexto}>Entrar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const estilos = StyleSheet.create({
  fundo: { flex: 1 },

  conteiner: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },

  logo: {
    height: 110,
    width: 330,
    resizeMode: "contain",
    marginTop: 25,
  },

  subtitulo: {
    fontFamily: Fontes.primaria,
    fontSize: Fontes.medio1,
    color: Cores.cinza_clara,
    margin: 25,
  },

  card: {
    backgroundColor: `${Cores.cinza_clara}12`,
    width: 280,
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Cores.cinza_escuro,
  },

  titulo: {
    color: Cores.branco,
    fontFamily: Fontes.titulo2,
    fontSize: Fontes.grande3,
    marginBottom: 15,
  },

  textoApoio: {
    width: 220,
    color: Cores.cinza_clara,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.medio1,
    textAlign: "center",
    marginBottom: 10,
  },

  botao: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.cinza_clara,
    borderColor: Cores.primaria,
    height: 55,
    width: 200,
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 15,
    marginBottom: 10,
  },

  rotulo: {
    color: Cores.secundaria,
    fontFamily: Fontes.titulo2,
    fontSize: Fontes.grande1,
  },

  pergunta: {
    color: Cores.branco,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.medio2,
    marginTop: 3,
  },

  botaoEntrar: {
    marginTop: 2,
    padding: 5,
  },

  entrarTexto: {
    color: Cores.laranja,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.medio2,
  },
});