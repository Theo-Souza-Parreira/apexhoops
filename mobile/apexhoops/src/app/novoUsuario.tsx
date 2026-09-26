import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { UsuarioTipo } from "@/types/Usuario";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";

import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { autenticacao, banco } from "@/services/Firebase";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Cadastro() {

  const [usuario, setUsuario] = useState<UsuarioTipo>({
    codigo: "",
    nome: "",
    email: "",
    senha: "",
    permissao: "usuario",
    dataNascimento: "",
    altura: "",
    peso: "",
    posicao: "",
    mao: "",
    nivel: "",
    experiencia: "",
  });

  const [etapa, setEtapa] = useState(1);

  // --------------------------------------------------
  // CADASTRO NO FIREBASE
  // --------------------------------------------------

  const verificarUsuario = async () => {

    if (
      !usuario.nome ||
      !usuario.email ||
      !usuario.senha ||
      !usuario.experiencia ||
      !usuario.posicao ||
      !usuario.mao ||
      !usuario.nivel
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todas as etapas antes de finalizar o cadastro."
      );

      return;
    }

    try {

      const resultado = await createUserWithEmailAndPassword(
        autenticacao,
        usuario.email,
        usuario.senha
      );

      const uid = resultado.user.uid;

      await setDoc(doc(banco, "usuarios", uid), {
        codigo: uid,
        nome: usuario.nome,
        email: usuario.email,
        permissao: usuario.permissao,
        dataNascimento: usuario.dataNascimento,
        altura: usuario.altura,
        peso: usuario.peso,
        experiencia: usuario.experiencia,
        posicao: usuario.posicao,
        mao: usuario.mao,
        nivel: usuario.nivel,
      });

      Alert.alert(
        "Cadastro realizado!",
        "Sua conta foi criada com sucesso.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(tabs)/home"),
          },
        ]
      );

    } catch (error) {

      if (error instanceof FirebaseError) {

        switch (error.code) {

          case "auth/email-already-in-use":

            Alert.alert(
              "E-mail já cadastrado",
              "Já existe uma conta com esse e-mail."
            );

            break;

          case "auth/invalid-email":

            Alert.alert(
              "E-mail inválido",
              "Digite um e-mail válido."
            );

            break;

          case "auth/weak-password":

            Alert.alert(
              "Senha fraca",
              "A senha precisa ter pelo menos 6 caracteres."
            );

            break;

          case "permission-denied":

            Alert.alert(
              "Sem permissão",
              "O Firestore não permitiu salvar os dados."
            );

            break;

          default:

            Alert.alert(
              "Erro no cadastro",
              `Código: ${error.code}`
            );

            break;
        }

      } else {

        Alert.alert(
          "Erro",
          "Não foi possível realizar o cadastro."
        );

      }
    }
  };

  const logar = () => {
    router.push("/");
  };


  // --------------------------------------------------
  // COMPONENTE DO BOTÃO DE AVANÇAR
  // --------------------------------------------------

  const BotaoAvancar = ({
    ativo,
    onPress,
  }: {
    ativo: boolean;
    onPress: () => void;
  }) => {

    return (
      <Pressable
        disabled={!ativo}
        onPress={onPress}
        style={({ pressed }) => [
          estilos.botaoAvancar,

          !ativo && estilos.botaoDesabilitado,

          {
            opacity: pressed ? 0.75 : ativo ? 1 : 0.35,
          },
        ]}
      >

        <MaterialIcons
          name="arrow-forward"
          size={30}
          color={Cores.secundaria}
        />

      </Pressable>
    );
  };


  // --------------------------------------------------
  // TELA
  // --------------------------------------------------

  return (
    <LinearGradient
      colors={[
        Cores.primaria,
        Cores.preto,
        Cores.musgo,
      ]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={estilos.fundo}
    >

      <SafeAreaView style={estilos.conteiner}>

        {/* ==================================================
            ETAPA 1
        ================================================== */}

        {etapa === 1 && (

          <>

            <Image
              source={require("../../assets/images/layout/logo.png")}
              style={estilos.logo}
            />

            <Text style={estilos.subtitulo}>
              Treine como a Elite
            </Text>

            <View style={estilos.card}>

              <Text style={estilos.tituloLogin}>
                Cadastro
              </Text>


              <TextInput
                style={estilos.campo}
                placeholder="Nome"
                placeholderTextColor={Cores.cinza_clara}
                value={usuario.nome}
                onChangeText={(nome) =>
                  setUsuario({
                    ...usuario,
                    nome,
                  })
                }
              />


              <TextInput
                style={estilos.campo}
                placeholder="E-mail"
                placeholderTextColor={Cores.cinza_clara}
                keyboardType="email-address"
                autoCapitalize="none"
                value={usuario.email}
                onChangeText={(email) =>
                  setUsuario({
                    ...usuario,
                    email,
                  })
                }
              />


              <TextInput
                style={estilos.campo}
                placeholder="Senha"
                placeholderTextColor={Cores.cinza_clara}
                secureTextEntry
                value={usuario.senha}
                onChangeText={(senha) =>
                  setUsuario({
                    ...usuario,
                    senha,
                  })
                }
              />


              <Pressable
                style={({ pressed }) => [
                  estilos.botao,
                  {
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
                onPress={() => setEtapa(2)}
              >

                <Text style={estilos.rotulo}>
                  Próximo Passo
                </Text>

              </Pressable>


              <Text style={estilos.esquecisenhaTexto}>
                Já tem conta?
              </Text>


              <Pressable
                style={estilos.botaoNovoUsuario}
                onPress={logar}
              >

                <Text style={estilos.novoUsuarioTexto}>
                  Entrar
                </Text>

              </Pressable>

            </View>

          </>

        )}


        {/* ==================================================
            ETAPA 2 — EXPERIÊNCIA
        ================================================== */}

        {etapa === 2 && (

          <View style={estilos.perguntaContainer}>

            <Text style={estilos.pergunta}>
              Você já teve algum contato com basquete?
            </Text>


            <View style={estilos.blocoOpcoes}>

              {[
                "Nunca joguei",
                "Joguei poucas vezes",
                "Jogo casualmente",
                "Jogo sempre ou em equipe",
              ].map((experiencia) => (

                <Pressable
                  key={experiencia}
                  onPress={() =>
                    setUsuario({
                      ...usuario,
                      experiencia,
                    })
                  }
                  style={({ pressed }) => [
                    estilos.opcao,

                    usuario.experiencia === experiencia &&
                      estilos.opcaoSelecionada,

                    {
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >

                  <MaterialIcons
                    name="bar-chart"
                    size={30}
                    color={Cores.laranja}
                    style={estilos.iconeExperiencia}
                  />

                  <Text style={estilos.textoOpcao}>
                    {experiencia}
                  </Text>

                </Pressable>

              ))}

            </View>


            <BotaoAvancar
              ativo={!!usuario.experiencia}
              onPress={() => setEtapa(3)}
            />


            <Pressable
              onPress={() => setEtapa(1)}
            >

              <Text style={estilos.voltar}>
                Voltar
              </Text>

            </Pressable>

          </View>

        )}


        {/* ==================================================
            ETAPA 3 — POSIÇÃO
        ================================================== */}

        {etapa === 3 && (

          <View style={estilos.perguntaContainer}>

            <Text style={estilos.pergunta}>
              Em qual posição você joga ou pretende jogar?
            </Text>


            <View style={estilos.blocoOpcoes}>

              {[
                {
                  codigo: "PG",
                  nome: "Armador",
                },

                {
                  codigo: "SG",
                  nome: "Ala-armador",
                },

                {
                  codigo: "SF",
                  nome: "Ala",
                },

                {
                  codigo: "PF",
                  nome: "Ala-pivô",
                },

                {
                  codigo: "C",
                  nome: "Pivô",
                },

              ].map((posicao) => (

                <Pressable
                  key={posicao.codigo}
                  onPress={() =>
                    setUsuario({
                      ...usuario,
                      posicao: posicao.codigo,
                    })
                  }
                  style={({ pressed }) => [
                    estilos.opcao,

                    usuario.posicao === posicao.codigo &&
                      estilos.opcaoSelecionada,

                    {
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >

                  <Text style={estilos.codigoOpcao}>
                    ({posicao.codigo})
                  </Text>

                  <Text style={estilos.textoOpcao}>
                    {posicao.nome}
                  </Text>

                </Pressable>

              ))}

            </View>


            <BotaoAvancar
              ativo={!!usuario.posicao}
              onPress={() => setEtapa(4)}
            />


            <Pressable
              onPress={() => setEtapa(2)}
            >

              <Text style={estilos.voltar}>
                Voltar
              </Text>

            </Pressable>

          </View>

        )}


        {/* ==================================================
            ETAPA 4 — MÃO DOMINANTE
        ================================================== */}

        {etapa === 4 && (

          <View style={estilos.perguntaContainer}>

            <Text style={estilos.pergunta}>
              Qual é sua mão dominante?
            </Text>


            <View style={estilos.blocoOpcoes}>

              {[
                "Direita",
                "Esquerda",
              ].map((mao) => (

                <Pressable
                  key={mao}
                  onPress={() =>
                    setUsuario({
                      ...usuario,
                      mao,
                    })
                  }
                  style={({ pressed }) => [
                    estilos.opcao,

                    usuario.mao === mao &&
                      estilos.opcaoSelecionada,

                    {
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >

                  <MaterialIcons
                    name="sports-basketball"
                    size={28}
                    color={Cores.laranja}
                    style={estilos.iconeExperiencia}
                  />

                  <Text style={estilos.textoOpcao}>
                    {mao}
                  </Text>

                </Pressable>

              ))}

            </View>


            <BotaoAvancar
              ativo={!!usuario.mao}
              onPress={() => setEtapa(5)}
            />


            <Pressable
              onPress={() => setEtapa(3)}
            >

              <Text style={estilos.voltar}>
                Voltar
              </Text>

            </Pressable>

          </View>

        )}


        {/* ==================================================
            ETAPA 5 — NÍVEL
        ================================================== */}

        {etapa === 5 && (

          <View style={estilos.perguntaContainer}>

            <Text style={estilos.pergunta}>
              Como você considera seu nível no basquete?
            </Text>


            <View style={estilos.blocoOpcoes}>

              {[
                "Iniciante",
                "Intermediário",
                "Avançado",
              ].map((nivel) => (

                <Pressable
                  key={nivel}
                  onPress={() =>
                    setUsuario({
                      ...usuario,
                      nivel,
                    })
                  }
                  style={({ pressed }) => [
                    estilos.opcao,

                    usuario.nivel === nivel &&
                      estilos.opcaoSelecionada,

                    {
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >

                  <MaterialIcons
                    name="bar-chart"
                    size={30}
                    color={Cores.laranja}
                    style={estilos.iconeExperiencia}
                  />

                  <Text style={estilos.textoOpcao}>
                    {nivel}
                  </Text>

                </Pressable>

              ))}

            </View>


            <BotaoAvancar
              ativo={!!usuario.nivel}
              onPress={verificarUsuario}
            />


            <Pressable
              onPress={() => setEtapa(4)}
            >

              <Text style={estilos.voltar}>
                Voltar
              </Text>

            </Pressable>

          </View>

        )}

      </SafeAreaView>

    </LinearGradient>
  );
}


// ======================================================
// ESTILOS
// ======================================================

const estilos = StyleSheet.create({

  fundo: {
    flex: 1,
  },


  conteiner: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },


  // --------------------------------------------------
  // PRIMEIRA TELA
  // --------------------------------------------------

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
    fontFamily: Fontes.primaria,
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


  // --------------------------------------------------
  // TELAS DE PERGUNTAS
  // --------------------------------------------------

  perguntaContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
  },


  pergunta: {
    width: 280,
    color: Cores.branco,
    fontFamily: Fontes.primaria,
    fontSize: Fontes.grande1,
    textAlign: "justify",
    lineHeight: 27,
    marginBottom: 25,
  },


  blocoOpcoes: {
    width: 280,
    padding: 12,
    borderRadius: 18,
    backgroundColor: `${Cores.cinza_clara}12`,
    borderWidth: 2,
    borderColor: Cores.cinza_escuro,
    gap: 12,
  },


  opcao: {
    width: "100%",
    minHeight: 58,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: `${Cores.preto}80`,
    flexDirection: "row",
    alignItems: "center",
  },


  opcaoSelecionada: {
    backgroundColor: `${Cores.laranja}35`,
    borderWidth: 1,
    borderColor: Cores.laranja,
  },


  iconeExperiencia: {
    width: 45,
  },


  codigoOpcao: {
    width: 50,
    color: Cores.branco,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.medio2,
  },


  textoOpcao: {
    flex: 1,
    color: Cores.branco,
    fontFamily: Fontes.primaria,
    fontSize: Fontes.medio1,
  },


  // --------------------------------------------------
  // BOTÃO CIRCULAR
  // --------------------------------------------------

  botaoAvancar: {
    width: 58,
    height: 58,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: Cores.laranja,
    alignItems: "center",
    justifyContent: "center",
  },


  botaoDesabilitado: {
    opacity: 0.35,
  },


  voltar: {
    marginTop: 18,
    color: Cores.laranja,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.medio2,
  },

});