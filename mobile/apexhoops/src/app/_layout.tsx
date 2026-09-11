import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { AutenticacaoProvider } from '@/context/AutenticacaoContexto'
import { useAutenticacao } from '@/hooks/useAutenticacao' // Hook consumido internamente
import { autenticacao, FirebaseError, signInWithEmailAndPassword } from '@/services/Firebase'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'

// Impede que a Splash Screen Nativa feche automaticamente
SplashScreen.preventAutoHideAsync()

/*
  Componente interno: 
    Verifica conexão com Firebase. 
    Verifica carregamento das Fontes 
    Implementa proteção de rotas
*/
 
function Valicacoes() {

  const { usuarioContexto, carregando } = useAutenticacao()
  const segments = useSegments()
  const router = useRouter()

  const [mensagemErro, setMensagemErro] = useState('')
  const [conectadoFirebase, setConectadoFirebase] = useState(false)

  const [fontesCarregadas] = useFonts({
    RobotoMonoBold: require("../../assets/fonts/RobotoMono-Bold.ttf"),
    RobotoMonoRegular: require("../../assets/fonts/RobotoMono-Regular.ttf"),

    SpaceGroteskBold: require("../../assets/fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskRegular: require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
    SpaceGroteskLight: require("../../assets/fonts/SpaceGrotesk-Light.ttf"),

    ZenDotsRegular: require("../../assets/fonts/ZenDots-Regular.ttf"),

    InterBold: require("../../assets/fonts/Inter-Bold.ttf"),
    InterRegular: require("../../assets/fonts/Inter-Regular.ttf"),
  });

  // Teste de comunicação com o Firebase
  useEffect(() => {

    signInWithEmailAndPassword(autenticacao, 'email_invalido@email.com', '123456')
      .then(() => {
        // Esse bloco nunca será executado porque o e-mail é inválido
      })
      .catch((error) => {
        
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
              console.log(`Conexão com o Firebase estabelecida com sucesso! ${error.code}`)
              setConectadoFirebase(true)
              break;

            case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
              setMensagemErro('Chave de API do Firebase inválida!')
              break

            case 'auth/network-request-failed':
              setMensagemErro('Falha de rede! Verifique sua internet')
              break

            case 'auth/too-many-requests':
              setMensagemErro('IP bloqueado temporariamente por excesso de tentativas.')
              break

            default:
              setMensagemErro(`Erro imprevisto! ${error.code}`)
              break
          }
        } else {
          setMensagemErro(`Erro imprevisto! (${error})`)
        }
      })
      
  }, [])


  // Controla o fechamento da Splash Screen Nativa
  useEffect(() => {
    // Esconde a splash se tudo deu certo OU se houve um erro crítico de inicialização
    if ((conectadoFirebase && fontesCarregadas && !carregando) || mensagemErro) {
      SplashScreen.hideAsync()
    }
  }, [conectadoFirebase, fontesCarregadas, carregando, mensagemErro])


  // Lógica de proteção de rotas (executada após o carregamento do Firebase e da Sessão)
  useEffect(() => {
    if (!conectadoFirebase || !fontesCarregadas || carregando) return

    const grupoProtegido = segments[0] === '(tabs)'

    if (!usuarioContexto && grupoProtegido) {
      router.replace('/'); // Redireciona para login (usuário não logado)
    } else if (usuarioContexto && !grupoProtegido) {
      router.replace('/(tabs)/home'); // Redireciona para tela Inicial (se já estiver logado)
    }
  }, [usuarioContexto, conectadoFirebase, fontesCarregadas, carregando, segments]);

  // Se houver erro de conexão
  if (mensagemErro) {
    return (
      <SafeAreaView>
        <View>
          <Text>{mensagemErro}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Enquanto as fontes carregam, o Firebase testa a conexão ou o AsyncStorage lê a sessão
  if (!conectadoFirebase || !fontesCarregadas || carregando) {
    return null;
  }

  // Tudo pronto e validado
  return (
    <SafeAreaProvider>
      <StatusBar style='light' />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
      </Stack>
    </SafeAreaProvider>
  )
}


export default function RootLayout() {
  return (
    <AutenticacaoProvider>
      <Valicacoes />
    </AutenticacaoProvider>
  )
}
