import { createContext, useState } from 'react'
import { type ReactNode } from 'react';

interface LayoutProviderProps {
  children: ReactNode
}

interface LayoutTipoContexto {
  menuAbertoContexto: boolean
  setMenuAbertoContexto: (menu: boolean) => void
}

export const LayoutContexto = createContext<LayoutTipoContexto>({
  menuAbertoContexto: false,
  setMenuAbertoContexto: () => {},
})

export const LayoutProvider = ({children}: LayoutProviderProps) => {

  const [menuAbertoContexto, setMenuAbertoContexto] = useState(false)

  return (
    <LayoutContexto.Provider value={{ menuAbertoContexto, setMenuAbertoContexto }}>
      {children}
    </LayoutContexto.Provider>
  )
}
