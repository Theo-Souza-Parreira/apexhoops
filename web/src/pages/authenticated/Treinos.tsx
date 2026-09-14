import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import estilos from './Treinos.module.css'


export function Treinos() {

    const hoje = new Date()

    const [mesAtual, setMesAtual] = useState(
        new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            1
        )
    )


    const diasTreinados = [
        2,
        4,
        6,
        8,
        10,
        12,
        15,
        17,
        19,
        22,
        24,
        26,
        29
    ]


    const ano = mesAtual.getFullYear()
    const mes = mesAtual.getMonth()


    const nomeMes = mesAtual.toLocaleDateString(
        'pt-BR',
        {
            month: 'long',
            year: 'numeric'
        }
    )


    const quantidadeDias = new Date(
        ano,
        mes + 1,
        0
    ).getDate()


    const primeiroDia = new Date(
        ano,
        mes,
        1
    ).getDay()


    const mesAnterior = () => {

        setMesAtual(
            new Date(
                ano,
                mes - 1,
                1
            )
        )
    }


    const proximoMes = () => {

        setMesAtual(
            new Date(
                ano,
                mes + 1,
                1
            )
        )
    }


    const diasCalendario = []



    for (let i = 0; i < primeiroDia; i++) {

        diasCalendario.push(
            <div
                key={`vazio-${i}`}
                className={estilos.diaVazio}
            />
        )
    }


    for (
        let dia = 1;
        dia <= quantidadeDias;
        dia++
    ) {

        const foiTreinado =
            diasTreinados.includes(dia)


        diasCalendario.push(
            <div
                key={dia}
                className={`
                    ${estilos.dia}
                    ${
                        foiTreinado
                            ? estilos.treinado
                            : estilos.naoTreinado
                    }
                `}
            >
                {dia}
            </div>
        )
    }


    return (

        <div className={estilos.conteiner}>

            {/* ========================================
                CABEÇALHO
            ======================================== */}

            <header className={estilos.cabecalho}>

                <h1>
                    Meus Treinos
                </h1>

                <p className={estilos.subtitulo}>
                    Acompanhe sua rotina de treinamento
                </p>

            </header>


            {/* ========================================
                RESUMO
            ======================================== */}

            <section className={estilos.resumo}>

                <div className={estilos.card}>
                    <span>
                        Total de treinos
                    </span>

                    <strong>
                        37
                    </strong>
                </div>


                <div className={estilos.card}>
                    <span>
                        Tempo total
                    </span>

                    <strong>
                        24h 18min
                    </strong>
                </div>


                <div className={estilos.card}>
                    <span>
                        Pontuação média
                    </span>

                    <strong>
                        782
                    </strong>
                </div>


                <div className={estilos.card}>
                    <span>
                        Sequência atual
                    </span>

                    <strong>
                        6 dias
                    </strong>
                </div>

            </section>


            {/* ========================================
                CONTEÚDO
            ======================================== */}

            <section className={estilos.conteudo}>


                {/* ========================================
                    CALENDÁRIO
                ======================================== */}

                <div className={estilos.calendario}>

                    <div className={estilos.cabecalhoCalendario}>

                        <button
                            className={estilos.botaoMes}
                            onClick={mesAnterior}
                            type="button"
                            aria-label="Mês anterior"
                        >
                            <FiChevronLeft />
                        </button>


                        <h2>
                            {nomeMes}
                        </h2>


                        <button
                            className={estilos.botaoMes}
                            onClick={proximoMes}
                            type="button"
                            aria-label="Próximo mês"
                        >
                            <FiChevronRight />
                        </button>

                    </div>


                    {/* ========================================
                        DIAS DA SEMANA
                    ======================================== */}

                    <div className={estilos.diasSemana}>

                        <span>D</span>
                        <span>S</span>
                        <span>T</span>
                        <span>Q</span>
                        <span>Q</span>
                        <span>S</span>
                        <span>S</span>

                    </div>


                    {/* ========================================
                        DIAS
                    ======================================== */}

                    <div className={estilos.dias}>

                        {diasCalendario}

                    </div>


                    {/* ========================================
                        LEGENDA
                    ======================================== */}

                    <div className={estilos.legenda}>

                        <div>
                            <span
                                className={
                                    estilos.pontoTreino
                                }
                            />

                            Treinou
                        </div>


                        <div>
                            <span
                                className={
                                    estilos.pontoNaoTreino
                                }
                            />

                            Não treinou
                        </div>

                    </div>

                </div>


                {/* ========================================
                    RESUMO DOS TREINOS
                ======================================== */}

                <div className={estilos.resumoTreinos}>

                    <div className={estilos.tituloResumo}>

                        <h2>
                            Resumo dos treinos
                        </h2>

                        <p>
                            Sua rotina de fechamento
                        </p>

                    </div>


                    <div className={estilos.listaResumo}>

                        <div className={estilos.itemResumo}>

                            <div className={estilos.icone}>
                                🏀
                            </div>

                            <div className={estilos.info}>

                                <span>
                                    Treino principal
                                </span>

                                <strong>
                                    Arremesso
                                </strong>

                            </div>

                        </div>


                        <div className={estilos.itemResumo}>

                            <div className={estilos.icone}>
                                🔥
                            </div>

                            <div className={estilos.info}>

                                <span>
                                    Treino mais realizado
                                </span>

                                <strong>
                                    Caçador de bola
                                </strong>

                                <small>
                                    12 sessões
                                </small>

                            </div>

                        </div>


                        <div className={estilos.itemResumo}>

                            <div className={estilos.icone}>
                                ⭐
                            </div>

                            <div className={estilos.info}>

                                <span>
                                    Melhor desempenho
                                </span>

                                <strong>
                                    Finalização
                                </strong>

                                <small>
                                    94% de aproveitamento
                                </small>

                            </div>

                        </div>


                        <div className={estilos.itemResumo}>

                            <div className={estilos.icone}>
                                📅
                            </div>

                            <div className={estilos.info}>

                                <span>
                                    Último treino
                                </span>

                                <strong>
                                    Arremesso
                                </strong>

                                <small>
                                    12 de setembro
                                </small>

                            </div>

                        </div>

                    </div>


                    <button
                        className={estilos.historico}
                        type="button"
                    >
                        <span>
                            Ver histórico completo
                        </span>

                        <FiChevronRight />

                    </button>

                </div>

            </section>

        </div>
    )
}