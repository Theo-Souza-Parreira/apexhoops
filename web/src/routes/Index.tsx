import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from '../contexts/AuthContext'
import Home from '../pages/Home'
import { Login } from '../pages/Login'
import { Cadastro } from '../pages/Cadastro'
import MainLayout from '../components/MainLayout'
import { Contato } from '../pages/Contato'
import { Baixar } from '../pages/Baixar'
import { Sobre } from '../pages/Sobre'


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
        </Routes>
      } />
    </BrowserRouter >
  )
}

export default AppRoutes;