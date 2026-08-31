import React, { useState } from "react";
import { Image, Alert, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { UsuarioTipo } from "@/types/Usuario";
import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function Index() {
  const [usuario, setUsuario] = useState<UsuarioTipo>({
    codigo: "",
    nome: "",
    email: "",
    senha: "",
    permissao: "usuario",
  });

  const verificarUsuario = async () => {
    if (!usuario.email || !usuario.senha) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, informe um e-mail e senha."
      );
      return;
    }

    // Por enquanto, apenas para testar a navegação.
    // Aqui posteriormente entra a validação do usuário.
    Alert.alert("Login", `Tentando entrar com ${usuario.email}`);
  };

  return (

    <SafeAreaView style={estilos.conteiner}>
<Image
  source={require("../../assets/images/layout/logo.png")}
  style={estilos.logo}
    />
      <TextInput
        style={estilos.campo}
        placeholder="E-mail"
        placeholderTextColor={Cores.primaria}
        value={usuario.email}
        onChangeText={(valor) =>
          setUsuario({ ...usuario, email: valor })
        }
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={estilos.campo}
        placeholder="Senha"
        placeholderTextColor={Cores.secundaria}
        value={usuario.senha}
        onChangeText={(valor) =>
          setUsuario({ ...usuario, senha: valor })
        }
        secureTextEntry
      />

      <Pressable
        style={estilos.botao}
        onPress={verificarUsuario}
      >
        <Text style={estilos.rotulo}>Entrar</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          estilos.botaoNovoUsuario,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Text style={estilos.rotulo}>Criar conta</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.secundaria,
  },

  titulo: {
    fontFamily: Fontes.logo,
    fontSize: Fontes.extraGrande,
    color: Cores.primaria,
    marginBottom: 20,
  },

  campo: {
    backgroundColor: Cores.secundaria,
    color: Cores.primaria,
    fontFamily: Fontes.titulo,
    fontSize: Fontes.medio1,
    height: 50,
    width: 300,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  logo: {
    height: 200,
    width: 320,
    margin: 50,    
  },

  botao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.primaria,
    borderColor: Cores.primaria,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },

  rotulo: {
    color: Cores.secundaria,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.medio1,
  },

  botaoNovoUsuario: {
    backgroundColor: Cores.primaria,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});