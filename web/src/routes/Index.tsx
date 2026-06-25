import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import { Login } from '../pages/Login'
import { Cadastro } from '../pages/Cadastro'
import MainLayout from '../components/MainLayout'
import { Contato } from '../pages/Contato'
import { Baixar } from '../pages/Baixar'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='contato' element={<Contato />} />
          <Route path='login' element={<Login />} />
          <Route path='cadastrar' element={<Cadastro />} />
          <Route path='baixar' element={<Baixar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;