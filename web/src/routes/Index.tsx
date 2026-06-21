import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import { Login } from '../pages/Login'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes