import { useState } from 'react'
import {
    FaBasketballBall,
    FaFire,
    FaStar,
    FaCalendarAlt,
    FaChevronLeft,
    FaChevronRight,
    FaArrowRight
} from 'react-icons/fa'

import estilos from './Treinos.module.css'


export function Treinos() {

    const [dataAtual, setDataAtual] = useState(new Date())

    const ano = dataAtual.getFullYear()
    const mes = dataAtual.getMonth()

    const primeiroDia = new Date(ano, mes, 1).getDay()
    const ultimoDia = new Date(ano, mes + 1, 0).getDate()

    const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ]

    const diasTreinados = [2, 4, 6, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29]

    const voltarMes = () => {
        setDataAtual(new Date(ano, mes - 1, 1))
    }

    const avancarMes = () => {
        setDataAtual(new Date(ano, mes + 1, 1))
    }

    const dias = []

    for (let i = 0; i < primeiroDia; i++) {
        dias.push(null)
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
        dias.push(dia)
    }


    return (
        <div className={estilos.conteiner}>

            {/* CABEÇALHO */}

            <header className={estilos.cabecalho}>
                <div>
                    <h1>Meus Treinos</h1>
                    <p>Acompanhe sua rotina e evolução</p>
                </div>
            </header>


            {/* CARDS */}

            <section className={estilos.resumo}>

                <div className={estilos.card}>
                    <span>Total de treinos</span>
                    <strong>37</strong>
                </div>

                <div className={estilos.card}>
                    <span>Tempo treinado</span>
                    <strong>24h 18min</strong>
                </div>

                <div className={estilos.card}>
                    <span>Pontuação média</span>
                    <strong>782</strong>
                </div>

                <div className={estilos.card}>
                    <span>Sequência atual</span>
                    <strong>6 dias</strong>
                </div>

            </section>


            {/* CONTEÚDO PRINCIPAL */}

            <section className={estilos.conteudo}>

                {/* CALENDÁRIO */}

                <div className={estilos.calendario}>

                    <div className={estilos.cabecalhoCalendario}>

                        <button
                            className={estilos.botaoMes}
                            onClick={voltarMes}
                        >
                            <FaChevronLeft />
                        </button>

                        <h2>
                            {meses[mes]} {ano}
                        </h2>

                        <button
                            className={estilos.botaoMes}
                            onClick={avancarMes}
                        >
                            <FaChevronRight />
                        </button>

                    </div>


                    <div className={estilos.diasSemana}>
                        <span>D</span>
                        <span>S</span>
                        <span>T</span>
                        <span>Q</span>
                        <span>Q</span>
                        <span>S</span>
                        <span>S</span>
                    </div>


                    <div className={estilos.dias}>

                        {dias.map((dia, index) => {

                            if (!dia) {
                                return (
                                    <div
                                        key={`vazio-${index}`}
                                        className={estilos.diaVazio}
                                    />
                                )
                            }

                            const treinou = diasTreinados.includes(dia)

                            return (
                                <div
                                    key={dia}
                                    className={`${estilos.dia} ${
                                        treinou
                                            ? estilos.treinado
                                            : estilos.naoTreinado
                                    }`}
                                >
                                    {dia}
                                </div>
                            )
                        })}

                    </div>


                    <div className={estilos.legenda}>

                        <div>
                            <span className={estilos.pontoTreino}></span>
                            Treinou
                        </div>

                        <div>
                            <span className={estilos.pontoNaoTreino}></span>
                            Não treinou
                        </div>

                    </div>

                </div>


                {/* RESUMO */}

                <div className={estilos.resumoTreinos}>

                    <div className={estilos.tituloResumo}>
                        <div>
                            <h2>Resumo dos treinos</h2>
                            <p>Seu desempenho</p>
                        </div>
                    </div>


                    <div className={estilos.listaResumo}>

                        <div className={estilos.itemResumo}>

                            <div className={estilos.icone}>
                                <FaBasketballBall />
                            </div>

                            <div className={estilos.info}>
                                <span>Treino principal</span>
                                <strong>Arremesso</strong>
                            </div>

                        </div>


                        <div className={estilos.itemResumo}>

                            <div className={estilos.icone}>
                                <FaFire />
                            </div>

                            <div className={estilos.info}>
                                <span>Treino mais realizado</span>
                                <strong>Controle de bola</strong>
                                <small>12 sessões</small>
                            </div>

                        </div>


                        <div className={estilos.itemResumo}>

                            <div className={estilos.icone}>
                                <FaStar />
                            </div>

                            <div className={estilos.info}>
                                <span>Melhor desempenho</span>
                                <strong>Finalização</strong>
                                <small>94% de aproveitamento</small>
                            </div>

                        </div>


                        <div className={estilos.itemResumo}>

                            <div className={estilos.icone}>
                                <FaCalendarAlt />
                            </div>

                            <div className={estilos.info}>
                                <span>Último treino</span>
                                <strong>Arremesso</strong>
                                <small>12 de setembro</small>
                            </div>

                        </div>

                    </div>


                    <button className={estilos.historico}>
                        <span>Ver histórico completo</span>
                        <FaArrowRight />
                    </button>

                </div>

            </section>

        </div>
    )
}