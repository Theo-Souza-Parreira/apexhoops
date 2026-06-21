import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import { Login } from '../pages/Login'
import { Cadastro } from '../pages/Cadastro'
import MainLayout from '../components/MainLayout'
import { Contato } from '../pages/Contato'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
            <Route path='/' element={<Home/>}/>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path='cadastro' element={<Cadastro/>}/>
        <Route path='/' element={<Contato/>}/>
      </Routes>
    </BrowserRouter>
  )
}
/* * Rota Pai (Layout): Não tem um 'path' próprio. Ela serve exclusivamente como uma 
  * "casca protetora". Qualquer rota colocada aqui dentro herdará o MainLayout.
  */
  /* Rota Filha: O caminho é '/'. Quando acessado, o componente <Home /> 
  * é injetado diretamente no <Outlet /> do MainLayout (com Header e Footer).
  */
/* Rotas Externas: Como estão FORA do bloco do MainLayout, as páginas de 
* Login e Cadastro serão renderizadas "limpas", sem o Header e o Footer.
  */

export default AppRoutes