import { BrowserRouter, Routes, Route } from 'react-router-dom'

import  Home from '../pages/Home'
import { Login } from '../pages/Login'
import { Cadastro } from '../pages/Cadastro'
import { Contato } from '../pages/Contato'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path='home' element={<Home/>}/>
        <Route path='cadastro' element={<Cadastro/>}/>
        <Route path='/' element={<Contato/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes