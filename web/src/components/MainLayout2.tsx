import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { Header2 } from './Header2'
import Footer2 from './Footer2'
import { MenuLateral } from './MenuLateral'
import { LayoutContexto } from '../contexts/LayoutContexto'
import Perfil from '../assets/img/Perfil.png'
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

                    <Header2
      nome="Paulo"
        fotoPerfil={Perfil}   
    />

                <Outlet />
           
                 <Footer2 />
            </main>

           

        </div>
    )
}

export default MainLayout2