import React, { useState } from "react";
import { Image, Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { UsuarioTipo } from "@/types/Usuario";
import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function Index() {
  const [usuario, setUsuario] = useState<UsuarioTipo>(
    {codigo: '', nome: '', email: '', senha: '', permissao: "usuario",}
  )

  const verificarUsuario = async () => {

    if (!usuario.email || !usuario.senha) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, informe um e-mail e senha."
      )
      return
    }

    // Por enquanto, apenas para testar a navegação.
    // Aqui posteriormente entra a validação do usuário.
    Alert.alert("Login", `Tentando entrar com ${usuario.email}`)
  }

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

          <Text style={estilos.tituloLogin}>Login</Text>

          <TextInput
            style={estilos.campo}
            placeholder="E-mail"
            placeholderTextColor={Cores.branco}
            value={usuario.email}
            onChangeText={(valor) => setUsuario({ ...usuario, email: valor })}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={estilos.campo}
            placeholder="Senha"
            placeholderTextColor={Cores.branco}
            value={usuario.senha}
            onChangeText={(valor) => setUsuario({ ...usuario, senha: valor })}
            secureTextEntry
          />

          <Pressable
            style={({ pressed }) => [
              estilos.botao,
              { opacity: pressed ? 0.9 : 1 },
            ]}
            onPress={verificarUsuario}
          >
            <Text style={estilos.rotulo}>Logar</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              estilos.esquecisenha,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={estilos.esquecisenhaTexto}>Esqueci Senha</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              estilos.botaoNovoUsuario,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={estilos.novoUsuarioTexto}>Cadastra-se</Text>
          </Pressable>
        
        </View>

      </SafeAreaView>

    </LinearGradient>
  );
}

const estilos = StyleSheet.create({

 fundo: {
    flex: 1,
  },

  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    height: 110,    
    width: 330,     
    resizeMode: "contain",
    marginTop: 25,  
  },

  titulo: {
    fontFamily: Fontes.logo,
    fontSize: Fontes.extraGrande,
    color: Cores.primaria,
    marginBottom: 20,
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

  tituloLogin: {
    color: Cores.branco,
    fontFamily: Fontes.titulo2,
    fontSize: Fontes.grande2,
    marginBottom: 15,
  },

  campo: {
    backgroundColor: `${Cores.cinza_clara}35`,
    color: Cores.branco, 
    fontFamily: Fontes.titulo1,
    fontSize: Fontes.medio1,
    height: 50,
    width: 185, 
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 2, 
    borderColor: Cores.cinza_escuro, 
  },

  botao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.cinza_clara,
    borderColor: Cores.primaria,
    height: 55, 
    width: 185, 
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

  esquecisenha: {
    marginTop: 3, 
  },

  esquecisenhaTexto: {
    color: Cores.branco,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.medio2,
  },

  botaoNovoUsuario: {
    marginTop: 2, 
    padding: 5, 
  },

  novoUsuarioTexto: {
    color: Cores.laranja,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.medio2,
  },

});