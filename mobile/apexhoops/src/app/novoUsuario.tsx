import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { UsuarioTipo } from "@/types/Usuario";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { autenticacao, banco } from "@/services/Firebase";
import { doc, setDoc } from "firebase/firestore"

export default function NovoUsuario() {
  const [usuario, setUsuario] = useState<UsuarioTipo>({
    codigo: "",
    nome: "",
    email: "",
    senha: "",
    permissao: "usuario",
  });

  const verificarUsuario = async () => {

    if (!usuario.nome || !usuario.email || !usuario.senha) {
        Alert.alert(
            "Campos obrigatórios",
            "Preencha todos os campos."
        )
        return
    }

    try {

        // Cria o usuário no Firebase Authentication
        const resultado = await createUserWithEmailAndPassword(
            autenticacao,
            usuario.email,
            usuario.senha,
        )

        // UID gerado pelo Firebase
        const uid = resultado.user.uid

        // Salva os dados do usuário no Firestore
        await setDoc(doc(banco, "usuarios", uid), {
            codigo: uid,
            nome: usuario.nome,
            email: usuario.email,
            permissao: usuario.permissao
        })

        Alert.alert(
            "Cadastro realizado!",
            "Sua conta foi criada com sucesso.",
            [
                {
                    text: "OK",
                    onPress: () => router.replace("/")
                }
            ]
        )

    } catch (error) {

        if (error instanceof FirebaseError) {

            switch (error.code) {

                case "auth/email-already-in-use":
                    Alert.alert(
                        "E-mail já cadastrado",
                        "Já existe uma conta com esse e-mail."
                    )
                    break

                case "auth/invalid-email":
                    Alert.alert(
                        "E-mail inválido",
                        "Digite um e-mail válido."
                    )
                    break

                case "auth/weak-password":
                    Alert.alert(
                        "Senha fraca",
                        "A senha precisa ter pelo menos 6 caracteres."
                    )
                    break

                case "permission-denied":
                    Alert.alert(
                        "Sem permissão",
                        "O Firestore não permitiu salvar os dados."
                    )
                    break

                default:
                    Alert.alert(
                        "Erro no cadastro",
                        `Código: ${error.code}`
                    )
            }

        } else {

            Alert.alert(
                "Erro",
                "Não foi possível realizar o cadastro."
            )
        }
    }
}

  const logar = () => {
    router.push("/");
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
          <Text style={estilos.tituloLogin}>Cadastro</Text>

          <TextInput
            style={estilos.campo}
            placeholder="Nome"
            placeholderTextColor={Cores.branco}
            value={usuario.nome}
            onChangeText={(valor) => setUsuario({ ...usuario, nome: valor })}
            keyboardType="default"
            autoCapitalize="none"
          />

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
            <Text style={estilos.rotulo}>Próximo Passo</Text>
          </Pressable>

          <Text style={estilos.esquecisenhaTexto}>Já tem conta?</Text>

          <Pressable
            style={({ pressed }) => [
              estilos.botaoNovoUsuario,
              { opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={logar}
          >
            <Text style={estilos.novoUsuarioTexto}>Entrar</Text>
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
    alignItems: "center",
    paddingTop: 60,
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
    fontSize: Fontes.grande3,
    marginBottom: 15,
  },

  campo: {
    backgroundColor: `${Cores.cinza_clara}35`,
    color: Cores.branco,
    fontFamily: Fontes.titulo1,
    fontSize: Fontes.medio1,
    height: 50,
    width: 200,
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
