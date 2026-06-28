import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from '../components/MainLayout'
import MainLayout2 from '../components/MainLayout2.tsx'

import { AuthProvider } from '../contexts/AuthContext'
import Home from '../pages/Home'
import { Login } from '../pages/Login'
import { Cadastro } from '../pages/Cadastro'
import { Contato } from '../pages/Contato'
import { Baixar } from '../pages/Baixar'
import { Sobre } from '../pages/Sobre'
import { Perfil } from '../pages/Perfil'
import { Estatisticas } from '../pages/Estatisticas.tsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider Children={
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
              <Route path='perfil' element={<Perfil />}/>
              <Route path='status' element={<Estatisticas />} />
          </Route>
        </Routes>
      } />
    </BrowserRouter >
  )
}

export default AppRoutes;