import { Outlet } from 'react-router-dom'
import { useContext } from 'react'

import Footer from './Footer'
import { MenuLateral } from './MenuLateral'
import { LayoutContexto } from '../contexts/LayoutContexto'

import estilos from './MainLayout2.module.css'


function MainLayout2() {

    const { menuAbertoContexto } = useContext(LayoutContexto)

    return (
        <div className={estilos.conteiner}>

            <MenuLateral />

            <main
                className={`${estilos.principal} ${
                    menuAbertoContexto
                        ? estilos.menuAberto
                        : estilos.menuFechado
                }`}
            >
                <Outlet />
            </main>

            <Footer />

        </div>
    )
}

export default MainLayout2