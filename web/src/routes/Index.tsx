import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from '../components/MainLayout'
import MainLayout2 from '../components/MainLayout2.tsx'

import { AuthProvider } from '../contexts/AuthContext'
import Home from '../pages/public/Home.tsx'
import { Login } from '../pages/public/Login.tsx'
import { Cadastro } from '../pages/public/Cadastro.tsx'
import { Contato } from '../pages/public/Contato.tsx'
import { Baixar } from '../pages/public/Baixar.tsx'
import { Sobre } from '../pages/public/Sobre.tsx'
import { Perfil } from '../pages/authenticated/Perfil.tsx'
import { Estatisticas } from '../pages/authenticated/Estatisticas.tsx'
import { Home2 } from '../pages/authenticated/Home2.tsx'
import { Treinos } from '../pages/authenticated/Treinos.tsx'
import { LayoutProvider } from '../contexts/LayoutContexto'

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider Children={
        <LayoutProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='contato' element={<Contato />} />
              <Route path='login' element={<Login />} />
              <Route path='cadastrar' element={<Cadastro />} />
              <Route path='baixar' element={<Baixar />} />
              <Route path='sobre' element={<Sobre />} />
            </Route>
            <Route element={<MainLayout2 />}>
                <Route path='/home2' element={<Home2/>} />
                <Route path='status' element={<Estatisticas />} />
                <Route path='treinos' element={<Treinos />} />
                <Route path='perfil' element={<Perfil />}/>
            </Route>
          </Routes>
        </LayoutProvider>
      } />
    </BrowserRouter >
  )
}

export default AppRoutes;