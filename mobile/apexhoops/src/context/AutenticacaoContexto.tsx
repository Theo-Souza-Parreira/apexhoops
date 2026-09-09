import React, { createContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UsuarioTipo } from '@/types/Usuario'

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

  // Verifica e recupera o usuário logado
  useEffect(() => {
    async function carregarSessaoSalva() {
      try {
        const sessaoSalva = await AsyncStorage.getItem('@Cinefilia:usuario')
        if (sessaoSalva) {
          // Se achou o usuário no dispositivo, salva no estado global
          setUsuarioContexto(JSON.parse(sessaoSalva))
        }
      } catch (error) {
        console.log('Erro ao carregar dados do AsyncStorage:', error)
      } finally {
        setCarregando(false)
      }
    }

    carregarSessaoSalva()
  }, [])

  // Salva usuário
  const logarContexto = async (dadosUsuario: UsuarioTipo) => {
    try {
      setUsuarioContexto(dadosUsuario)
      // Salva a string JSON no dispositivo de forma persistente
      await AsyncStorage.setItem('@Cinefilia:usuario', JSON.stringify(dadosUsuario))
    } catch (error) {
      console.log('Erro ao salvar dados no AsyncStorage:', error)
    }
  }

  // Remove usuário
  const deslogarContexto = async () => {
    try {
      setUsuarioContexto(null)
      await AsyncStorage.removeItem('@Cinefilia:usuario')
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