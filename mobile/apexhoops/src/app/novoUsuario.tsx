import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { Perguntas, Pergunta } from "@/constants/Perguntas";
import { UsuarioTipo } from "@/types/Usuario";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
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
import { useAutenticacao } from "@/hooks/useAutenticacao";

// --------------------------------------------------
// FUNÇÕES AUXILIARES
// --------------------------------------------------

// Digita 25122005 e mostra 25/12/2005
const formatarData = (texto: string) => {
  const n = texto.replace(/\D/g, "").slice(0, 8);
  if (n.length <= 2) return n;
  if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
};

const dataValida = (texto: string) => {
  if (texto.length !== 10) return false;
  const [d, m, a] = texto.split("/").map(Number);
  const data = new Date(a, m - 1, d);
  return (
    data.getFullYear() === a &&
    data.getMonth() === m - 1 &&
    data.getDate() === d &&
    a >= 1920 &&
    data <= new Date()
  );
};

// "25/12/2005" -> "2005-12-25" (vazio continua vazio)
const dataParaISO = (texto: string) =>
  texto ? texto.split("/").reverse().join("-") : "";

type Fase = "perguntas" | "conta";

// Botão circular de avançar (fora do componente, para não ser recriado a cada tecla)
function BotaoAvancar({ ativo, onPress }: { ativo: boolean; onPress: () => void }) {
  return (
    <Pressable
      disabled={!ativo}
      onPress={onPress}
      style={({ pressed }) => [
        estilos.botaoAvancar,
        !ativo && estilos.botaoDesabilitado,
        { opacity: pressed ? 0.75 : ativo ? 1 : 0.35 },
      ]}
    >
      <MaterialIcons name="arrow-forward" size={30} color={Cores.secundaria} />
    </Pressable>
  );
}

export default function Cadastro() {

  const { logarContexto } = useAutenticacao();

  const [fase, setFase] = useState<Fase>("perguntas");
  const [indice, setIndice] = useState(0);

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
    foco: "",
    habilidadesBasquete: [],
    habilidadesFisico: [],
    frequencia: "",
    tempoTreino: "",
    locais: [],
  });

  const visiveis = Perguntas.filter((p) => !p.condicao || p.condicao(usuario));
  const pergunta = visiveis[indice];
  const valor = usuario[pergunta.campo];

  const definir = (campo: Pergunta["campo"], novoValor: string | string[]) =>
    setUsuario({ ...usuario, [campo]: novoValor });

  const alternar = (campo: Pergunta["campo"], opcao: string) => {
    const atual = (usuario[campo] as string[]) ?? [];
    definir(
      campo,
      atual.includes(opcao) ? atual.filter((o) => o !== opcao) : [...atual, opcao]
    );
  };

  // A resposta pode avançar?
  const respostaValida = () => {
    if (pergunta.tipo === "multipla") return (valor as string[]).length > 0;

    const texto = String(valor ?? "");
    if (texto === "") return !!pergunta.opcional;
    if (pergunta.mascara === "data") return dataValida(texto);
    if (pergunta.tipo === "texto") return Number(texto) > 0;
    return true;
  };

  const avancar = () => {
    if (indice < visiveis.length - 1) setIndice(indice + 1);
    else setFase("conta");
  };

  const voltar = () => {
    if (fase === "conta") {
      setFase("perguntas");
      setIndice(visiveis.length - 1);
    } else if (indice > 0) {
      setIndice(indice - 1);
    } else {
      router.back();
    }
  };

  // --------------------------------------------------
  // CADASTRO NO FIREBASE (só depois de todas as perguntas)
  // --------------------------------------------------


  
  const criarConta = async () => {

    const nome = usuario.nome.trim();
    const email = usuario.email.trim();

    if (!nome || !email || !usuario.senha) {
      Alert.alert("Campos obrigatórios", "Informe nome, e-mail e senha.");
      return;
    }

    try {
      const resultado = await createUserWithEmailAndPassword(
        autenticacao,
        email,
        usuario.senha
      );

      const uid = resultado.user.uid;

      // A senha nunca vai para o Firestore
      const { senha: _senha, ...dados } = usuario;

      const dadosFinais = {
        ...dados,
        codigo: uid,
        nome,
        email,
        dataNascimento: dataParaISO(usuario.dataNascimento),
        habilidadesBasquete: dados.foco === "fisico" ? [] : dados.habilidadesBasquete,
        habilidadesFisico: dados.foco === "basquete" ? [] : dados.habilidadesFisico,
      };
      
      await setDoc(doc(banco, "usuarios", uid), dadosFinais);

      await logarContexto({ ...dadosFinais, senha: "" });

      Alert.alert("Cadastro realizado!", "Sua conta foi criada com sucesso.", [
        { text: "OK", onPress: () => router.replace("/(tabs)/home") },
      ]);

    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            Alert.alert("E-mail já cadastrado", "Já existe uma conta com esse e-mail.");
            break;
          case "auth/invalid-email":
            Alert.alert("E-mail inválido", "Digite um e-mail válido.");
            break;
          case "auth/weak-password":
            Alert.alert("Senha fraca", "A senha precisa ter pelo menos 6 caracteres.");
            break;
          case "permission-denied":
            Alert.alert("Sem permissão", "O Firestore não permitiu salvar os dados.");
            break;
          default:
            Alert.alert("Erro no cadastro", `Código: ${error.code}`);
        }
      } else {
        Alert.alert("Erro", "Não foi possível realizar o cadastro.");
      }
    }
  };

  // --------------------------------------------------
  // TELA
  // --------------------------------------------------

  return (
    <LinearGradient
      colors={[Cores.primaria, Cores.preto, Cores.musgo]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={estilos.fundo}
    >
      <SafeAreaView style={estilos.conteiner}>

        {/* ===== PERGUNTAS ===== */}
        {fase === "perguntas" && (
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={estilos.perguntaContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={estilos.progresso}>
              Pergunta {indice + 1} de {visiveis.length}
            </Text>

            <Text style={estilos.pergunta}>{pergunta.titulo}</Text>

            {pergunta.opcional && (
              <Text style={estilos.opcional}>Opcional, você pode pular.</Text>
            )}

            {pergunta.tipo === "texto" ? (
              <TextInput
                style={estilos.campoPergunta}
                placeholder={pergunta.placeholder}
                placeholderTextColor={Cores.cinza_clara}
                keyboardType="numeric"
                maxLength={pergunta.mascara === "data" ? 10 : 3}
                value={String(valor ?? "")}
                onChangeText={(texto) =>
                  definir(
                    pergunta.campo,
                    pergunta.mascara === "data"
                      ? formatarData(texto)
                      : texto.replace(/\D/g, "")
                  )
                }
              />
            ) : (
              <View style={estilos.blocoOpcoes}>
                {pergunta.opcoes?.map((opcao) => {
                  const selecionada =
                    pergunta.tipo === "multipla"
                      ? (valor as string[]).includes(opcao.valor)
                      : valor === opcao.valor;

                  return (
                    <Pressable
                      key={opcao.valor}
                      onPress={() =>
                        pergunta.tipo === "multipla"
                          ? alternar(pergunta.campo, opcao.valor)
                          : definir(pergunta.campo, opcao.valor)
                      }
                      style={({ pressed }) => [
                        estilos.opcao,
                        selecionada && estilos.opcaoSelecionada,
                        { opacity: pressed ? 0.8 : 1 },
                      ]}
                    >
                      {opcao.detalhe ? (
                        <Text style={estilos.codigoOpcao}>({opcao.detalhe})</Text>
                      ) : pergunta.icone ? (
                        <MaterialIcons
                          name={pergunta.icone as keyof typeof MaterialIcons.glyphMap}
                          size={28}
                          color={Cores.laranja}
                          style={estilos.iconeExperiencia}
                        />
                      ) : null}

                      <Text style={estilos.textoOpcao}>{opcao.rotulo}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            <BotaoAvancar ativo={respostaValida()} onPress={avancar} />

            <Pressable onPress={voltar}>
              <Text style={estilos.voltar}>Voltar</Text>
            </Pressable>
          </ScrollView>
        )}

        {/* ===== CRIAR CONTA ===== */}
        {fase === "conta" && (
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={estilos.perguntaContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={estilos.card}>
              <Text style={estilos.tituloLogin}>Quase lá</Text>

              <Text style={estilos.textoApoio}>
                Crie sua conta para salvar seu perfil e começar a treinar.
              </Text>

              <TextInput
                style={estilos.campo}
                placeholder="Nome"
                placeholderTextColor={Cores.cinza_clara}
                value={usuario.nome}
                onChangeText={(nome) => setUsuario({ ...usuario, nome })}
              />

              <TextInput
                style={estilos.campo}
                placeholder="E-mail"
                placeholderTextColor={Cores.cinza_clara}
                keyboardType="email-address"
                autoCapitalize="none"
                value={usuario.email}
                onChangeText={(email) => setUsuario({ ...usuario, email })}
              />

              <TextInput
                style={estilos.campo}
                placeholder="Senha"
                placeholderTextColor={Cores.cinza_clara}
                secureTextEntry
                value={usuario.senha}
                onChangeText={(senha) => setUsuario({ ...usuario, senha })}
              />

              <Pressable
                style={({ pressed }) => [estilos.botao, { opacity: pressed ? 0.9 : 1 }]}
                onPress={criarConta}
              >
                <Text style={estilos.rotulo}>Criar conta</Text>
              </Pressable>
            </View>

            <Pressable onPress={voltar}>
              <Text style={estilos.voltar}>Voltar</Text>
            </Pressable>
          </ScrollView>
        )}

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


  // --------------------------------------------------
  // TELAS DE PERGUNTAS
  // --------------------------------------------------

  perguntaContainer: {
    flexGrow: 1,
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

    textoApoio: {
    width: 220,
    color: Cores.cinza_clara,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.medio1,
    textAlign: "center",
    marginBottom: 10,
  },

  progresso: {
    width: 280,
    color: Cores.cinza_clara,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.pequeno,
    marginBottom: 8,
  },

  opcional: {
    width: 280,
    color: Cores.cinza_clara,
    fontFamily: Fontes.secundaria,
    fontSize: Fontes.pequeno,
    marginTop: -15,
    marginBottom: 15,
  },

  campoPergunta: {
    width: 280,
    height: 56,
    textAlign: "center",
    backgroundColor: `${Cores.cinza_clara}35`,
    color: Cores.branco,
    fontFamily: Fontes.titulo1,
    fontSize: Fontes.medio2,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Cores.cinza_escuro,
  },


});