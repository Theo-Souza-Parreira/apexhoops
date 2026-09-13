import estilos from './MenuLateral.module.css'
import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutContexto } from '../contexts/LayoutContexto'
import { useAutenticacao } from '../hooks/useAutenticacao'
import { MdMenu, MdMenuOpen, MdBarChart, MdPerson, MdLogout } from 'react-icons/md'
import { FaHome } from 'react-icons/fa'
import { FaDumbbell } from "react-icons/fa6"

import Home from '../assets/icone/Home.svg?react'
import Estatisticas from '../assets/icone/Estatisticas.svg?react'
import Treinos from '../assets/icone/Treinos.svg?react'
import Perfil from '../assets/icone/Perfil.svg?react'
import Sair from '../assets/icone/Sair.svg?react'
import MenuAberto from '../assets/icone/MenuAberto.svg?react'
import MenuFechado from '../assets/icone/MenuFechado.svg?react'


export function MenuLateral() {

    const location = useLocation()

    const {
        menuAbertoContexto,
        setMenuAbertoContexto
    } = useContext(LayoutContexto)

    const controlarMenu = () => {
        setMenuAbertoContexto(!menuAbertoContexto)
    }

    const navegacao = useNavigate()

    const { deslogar } = useAutenticacao()

    const sair = async () => {
        await deslogar()
        navegacao('/')
    }


    return (
        <aside
            className={estilos.conteiner}
            style={{
                width: menuAbertoContexto ? '175px' : '70px'
            }}
        >

            <button
                className={estilos.botaoMenu}
                onClick={controlarMenu}
            >
                { menuAbertoContexto ? <MenuAberto /> : <MenuFechado />}
            </button>

            <nav className={estilos.itemConteiner}>

                <Link
                    className={`${estilos.item} ${
                        location.pathname === '/home2'
                            ? estilos.ativo
                            : ''
                    }`}
                    to="/home2"
                >
                    <Home />

                    { menuAbertoContexto && <span className={estilos.rotulo}> Inicial </span> }
                </Link>

                <Link
                    className={`${estilos.item} ${
                        location.pathname === '/status'
                            ? estilos.ativo
                            : ''
                    }`}
                    to="/status"
                >
                    <Estatisticas />

                    { menuAbertoContexto && <span className={estilos.rotulo}> Estatísticas </span> }
                </Link>

                <Link
                    className={`${estilos.item} ${
                        location.pathname === '/treinos'
                            ? estilos.ativo
                            : ''
                    }`}
                    to="/treinos"
                >
                    <Treinos />

                    { menuAbertoContexto && <span className={estilos.rotulo}> Treinos </span> }
                </Link>

                <Link
                    className={`${estilos.item} ${
                        location.pathname === '/perfil'
                            ? estilos.ativo
                            : ''
                    }`}
                    to="/perfil"
                >
                    <Perfil />

                    { menuAbertoContexto && <span className={estilos.rotulo}> Perfil </span> }
                </Link>

            </nav>

            <div className={estilos.sairContainer}>

                <button
                    className={estilos.item}
                    onClick={sair}
                >
                    <Sair />

                    { menuAbertoContexto && <span className={estilos.rotulo}> Sair </span> }
                </button>

            </div>

        </aside>
    )
}