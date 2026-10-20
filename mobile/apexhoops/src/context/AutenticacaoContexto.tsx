import React, { createContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { onAuthStateChanged } from 'firebase/auth'
import { UsuarioTipo } from '@/types/Usuario'
import { autenticacao } from '@/services/Firebase'

interface AutenticacaoContextoObjeto {
  usuarioContexto: UsuarioTipo | null
  carregando: boolean
  logarContexto: (dadosUsuario: UsuarioTipo) => Promise<void>
  deslogarContexto: () => Promise<void>
}

export const AutenticacaoContexto = createContext<AutenticacaoContextoObjeto | undefined>(undefined);

export function AutenticacaoProvider({ children }: { children: ReactNode }) {

  const [usuarioContexto, setUsuarioContexto] = useState<UsuarioTipo | null>(null)
  const [carregando, setCarregando] = useState(true)

  // Flags internas: o "carregando = false" só acontece quando
  // o AsyncStorage E o Firebase Auth já responderam.
  const [sessaoPronta, setSessaoPronta] = useState(false)
  const [firebasePronto, setFirebasePronto] = useState(false)

  // --------------------------------------------------
  // 1) Carrega a sessão salva no AsyncStorage (perfil)
  // --------------------------------------------------
  useEffect(() => {
    async function carregarSessaoSalva() {
      try {
        const sessaoSalva = await AsyncStorage.getItem('@ApexHoops:usuario')
        if (sessaoSalva) {
          setUsuarioContexto(JSON.parse(sessaoSalva))
        }
      } catch (error) {
        console.log('Erro ao carregar dados do AsyncStorage:', error)
      } finally {
        setSessaoPronta(true)
      }
    }

    carregarSessaoSalva()
  }, [])

  // --------------------------------------------------
  // 2) Escuta o Firebase Auth (fonte da verdade do token)
  //    Se o Firebase disser "ninguém logado", limpamos
  //    também o AsyncStorage pra evitar estado híbrido.
  // --------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(autenticacao, async (user) => {
      console.log('🔥 Firebase Auth user:', user?.uid ?? 'null')

      if (!user) {
        try {
          await AsyncStorage.removeItem('@ApexHoops:usuario')
        } catch (error) {
          console.log('Erro ao limpar AsyncStorage:', error)
        }
        setUsuarioContexto(null)
      }

      setFirebasePronto(true)
    })

    return unsubscribe
  }, [])

  // --------------------------------------------------
  // 3) Só libera o app quando os dois estiverem prontos
  // --------------------------------------------------
  useEffect(() => {
    if (sessaoPronta && firebasePronto) {
      setCarregando(false)
    }
  }, [sessaoPronta, firebasePronto])

  // Salva usuário
  const logarContexto = async (dadosUsuario: UsuarioTipo) => {
    try {
      setUsuarioContexto(dadosUsuario)
      await AsyncStorage.setItem('@ApexHoops:usuario', JSON.stringify(dadosUsuario))
    } catch (error) {
      console.log('Erro ao salvar dados no AsyncStorage:', error)
    }
  }

  // Remove usuário
  const deslogarContexto = async () => {
    try {
      setUsuarioContexto(null)
      await AsyncStorage.removeItem('@ApexHoops:usuario')
    } catch (error) {
      console.log('Erro ao remover dados do AsyncStorage:', error)
    }
  }

  return (
    <AutenticacaoContexto.Provider value={{ usuarioContexto, carregando, logarContexto, deslogarContexto }}>
      {children}
    </AutenticacaoContexto.Provider>
  )
}