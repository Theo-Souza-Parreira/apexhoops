import estilos from './Home2.module.css'

import Bola from '../../assets/icone/Bola.svg?react'
import Estatisticas from '../../assets/icone/Estatisticas.svg?react'
import Estrela from '../../assets/icone/Estrela.svg?react'
import Fogo from '../../assets/icone/Fogo.svg?react'
import Relogio from '../../assets/icone/Relogio.svg?react'
import Dica from '../../assets/icone/Dica.svg?react'

export function Home2() {
    return (
        <div className={estilos.conteiner}>

            <header className={estilos.cabecalho}>

                <div className={estilos.introducao}>

                    <p className={estilos.subtitulo}>
                        PAINEL DO ATLETA
                    </p>

                    <h1>
                        Bora treinar, <span>Nome!</span>
                    </h1>

                    <p className={estilos.mensagem}>
                        Acompanhe sua evolução e veja como está seu desempenho.
                    </p>

                </div>

                <div className={estilos.destaque}>

                    <Fogo className={estilos.iconeFogo} />

                    <div className={estilos.destaqueTexto}>
                        <strong>
                            Sequência atual
                        </strong>

                        <p>
                            5 dias
                        </p>
                    </div>

                </div>

            </header>

            <section className={estilos.resumo}>

                <div className={estilos.card}>

                    <div className={estilos.iconeContainer}>
                        <Bola className={estilos.iconeBola} />
                    </div>

                    <div className={estilos.cardTexto}>
                        <p>
                            Treinos concluídos
                        </p>

                        <strong>
                            24
                        </strong>
                    </div>

                </div>


                <div className={estilos.card}>

                    <div className={estilos.iconeContainer}>
                        <Relogio className={estilos.iconeBranco} />
                    </div>

                    <div className={estilos.cardTexto}>
                        <p>
                            Tempo treinado
                        </p>

                        <strong>
                            18h 42min
                        </strong>
                    </div>

                </div>


                <div className={estilos.card}>

                    <div className={estilos.iconeContainer}>
                        <Estrela className={estilos.iconeBranco} />
                    </div>

                    <div className={estilos.cardTexto}>
                        <p>
                            Média de desempenho
                        </p>

                        <strong>
                            87%
                        </strong>
                    </div>

                </div>

            </section>

            <main className={estilos.conteudo}>

                <section className={estilos.evolucao}>

                    <div className={estilos.tituloSecao}>

                        <div className={estilos.tituloComIcone}>

                            <div className={estilos.iconeTitulo}>
                                <Estatisticas className={estilos.iconeBranco} />
                            </div>

                            <div>
                                <p>
                                    DESEMPENHO
                                </p>

                                <h2>
                                    Sua evolução
                                </h2>
                            </div>

                        </div>

                        <span>
                            Últimos 30 dias
                        </span>

                    </div>


                    <div className={estilos.grafico}>

                        <div className={estilos.linha}>
                            <span>100</span>
                            <div></div>
                        </div>

                        <div className={estilos.linha}>
                            <span>75</span>
                            <div></div>
                        </div>

                        <div className={estilos.linha}>
                            <span>50</span>
                            <div></div>
                        </div>

                        <div className={estilos.linha}>
                            <span>25</span>
                            <div></div>
                        </div>

                        <div className={estilos.linha}>
                            <span>0</span>
                            <div></div>
                        </div>


                        <div className={estilos.barraContainer}>

                            <div
                                className={estilos.barra}
                                style={{ height: '45%' }}
                            />

                            <div
                                className={estilos.barra}
                                style={{ height: '58%' }}
                            />

                            <div
                                className={estilos.barra}
                                style={{ height: '52%' }}
                            />

                            <div
                                className={estilos.barra}
                                style={{ height: '68%' }}
                            />

                            <div
                                className={estilos.barra}
                                style={{ height: '73%' }}
                            />

                            <div
                                className={estilos.barra}
                                style={{ height: '81%' }}
                            />

                            <div
                                className={estilos.barra}
                                style={{ height: '87%' }}
                            />

                        </div>

                    </div>


                    <div className={estilos.graficoLegenda}>
                        <span>Semana 1</span>
                        <span>Semana 2</span>
                        <span>Semana 3</span>
                        <span>Semana 4</span>
                    </div>

                </section>

                <section className={estilos.ultimoTreino}>

                    <div className={estilos.tituloSecao}>

                        <div>
                            <p>
                                ÚLTIMO TREINO
                            </p>

                            <h2>
                                Seu desempenho
                            </h2>
                        </div>

                    </div>


                    <div className={estilos.treinoPrincipal}>

                        <div>

                            <span className={estilos.tag}>
                                FINALIZADO
                            </span>

                            <h3>
                                Arremesso e Finalização
                            </h3>

                            <p>
                                Hoje • 42 minutos
                            </p>

                        </div>

                        <strong>
                            92%
                        </strong>

                    </div>


                    <div className={estilos.dadosTreino}>

                        <div>
                            <span>
                                Pontuação
                            </span>

                            <strong>
                                920 pts
                            </strong>
                        </div>

                        <div>
                            <span>
                                Nível
                            </span>

                            <strong>
                                Intermediário
                            </strong>
                        </div>

                    </div>

                </section>

                <section className={estilos.recentes}>

                    <div className={estilos.tituloSecao}>

                        <div>
                            <p>
                                HISTÓRICO
                            </p>

                            <h2>
                                Treinos recentes
                            </h2>
                        </div>

                        <button type="button">
                            Ver todos
                        </button>

                    </div>


                    <div className={estilos.tabela}>

                        <div className={estilos.tabelaCabecalho}>

                            <span>
                                Treino
                            </span>

                            <span>
                                Data
                            </span>

                            <span>
                                Duração
                            </span>

                            <span>
                                Desempenho
                            </span>

                        </div>


                        <div className={estilos.tabelaLinha}>

                            <strong>
                                Fundamentos e Controle
                            </strong>

                            <span>
                                10/09/2026
                            </span>

                            <span>
                                38 min
                            </span>

                            <b>
                                89%
                            </b>

                        </div>


                        <div className={estilos.tabelaLinha}>

                            <strong>
                                Arremesso e Finalização
                            </strong>

                            <span>
                                08/09/2026
                            </span>

                            <span>
                                42 min
                            </span>

                            <b>
                                92%
                            </b>

                        </div>


                        <div className={estilos.tabelaLinha}>

                            <strong>
                                Controle de Bola
                            </strong>

                            <span>
                                06/09/2026
                            </span>

                            <span>
                                31 min
                            </span>

                            <b>
                                84%
                            </b>

                        </div>

                    </div>

                </section>

                <aside className={estilos.dica}>

                    <div className={estilos.dicaIcone}>
                        <Dica className={estilos.iconeBranco} />
                    </div>

                    <p>
                        DICA DE HOJE
                    </p>

                    <h3>
                        Consistência vence intensidade.
                    </h3>

                    <span className={estilos.dicaTexto}>
                        Treine um pouco melhor a cada dia.
                    </span>

                </aside>

            </main>

        </div>
    )
}