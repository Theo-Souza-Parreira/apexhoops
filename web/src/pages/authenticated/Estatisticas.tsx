import estilos from "./Estatisticas.module.css";

import Bola from "../../assets/icone/Bola.svg?react";
import EstatisticasIcone from "../../assets/icone/Estatisticas.svg?react";
import Estrela from "../../assets/icone/Estrela.svg?react";
import Relogio from "../../assets/icone/Relogio.svg?react";

type DistribuicaoTreino = {
  nome: string;
  treinos: number;
  percentual: number;
};

type EvolucaoMensal = {
  periodo: string;
  desempenho: number;
};

type Fundamento = {
  nome: string;
  desempenho: number;
};

const distribuicaoTreinos: DistribuicaoTreino[] = [
  {
    nome: "Arremesso",
    treinos: 1,
    percentual: 1,
  },
  {
    nome: "Drible",
    treinos: 5,
    percentual: 63,
  },
  {
    nome: "Resistência",
    treinos: 4,
    percentual: 50,
  },
  {
    nome: "Força",
    treinos: 3,
    percentual: 38,
  },
  {
    nome: "Passe",
    treinos: 2,
    percentual: 25,
  },
  {
    nome: "Finalização",
    treinos: 2,
    percentual: 25,
  },
];

const evolucaoMensal: EvolucaoMensal[] = [
  {
    periodo: "Abr",
    desempenho: 58,
  },
  {
    periodo: "Mai",
    desempenho: 63,
  },
  {
    periodo: "Jun",
    desempenho: 68,
  },
  {
    periodo: "Jul",
    desempenho: 72,
  },
  {
    periodo: "Ago",
    desempenho: 77,
  },
  {
    periodo: "Set",
    desempenho: 82,
  },
];

const fundamentos: Fundamento[] = [
  {
    nome: "Arremesso",
    desempenho: 84,
  },
  {
    nome: "Controle de bola",
    desempenho: 76,
  },
  {
    nome: "Finalização",
    desempenho: 81,
  },
  {
    nome: "Condicionamento",
    desempenho: 69,
  },
  {
    nome: "Posicionamento",
    desempenho: 74,
  },
];

export function Estatisticas() {
  return (
    <div className={estilos.conteiner}>
      <header className={estilos.cabecalhoPagina}>
        <div>
          <p>DESEMPENHO DO ATLETA</p>

          <h1>
            Suas <span>estatísticas</span>
          </h1>

          <span className={estilos.descricaoPagina}>
            Acompanhe sua frequência de treinos e a evolução dos
            principais fundamentos.
          </span>
        </div>

        <div className={estilos.periodo}>
          Últimos 30 dias
        </div>
      </header>

      <section
        className={estilos.resumo}
        aria-label="Resumo das estatísticas"
      >
        <article className={estilos.cardResumo}>
          <div className={estilos.iconeResumo}>
            <Bola />
          </div>

          <div>
            <p>Treinos realizados</p>
            <strong>24</strong>
          </div>
        </article>

        <article className={estilos.cardResumo}>
          <div className={estilos.iconeResumo}>
            <Relogio />
          </div>

          <div>
            <p>Tempo total</p>
            <strong>18h 42min</strong>
          </div>
        </article>

        <article className={estilos.cardResumo}>
          <div className={estilos.iconeResumo}>
            <Estrela />
          </div>

          <div>
            <p>Desempenho médio</p>
            <strong>78%</strong>
          </div>
        </article>

        <article className={estilos.cardResumo}>
          <div className={estilos.iconeResumo}>
            <EstatisticasIcone />
          </div>

          <div>
            <p>Frequência semanal</p>
            <strong>4x</strong>
          </div>
        </article>
      </section>

      <main className={estilos.gradePrincipal}>
        <section className={estilos.distribuicao}>
          <div className={estilos.tituloSecao}>
            <div>
              <p>FOCO DOS TREINOS</p>
              <h2>Distribuição por fundamento</h2>
            </div>

            <span>
              24 treinos
            </span>
          </div>

          <p className={estilos.textoAuxiliar}>
            Quantidade de sessões realizadas em cada vertente do
            treinamento.
          </p>

          <div className={estilos.listaDistribuicao}>
            {distribuicaoTreinos.map((item) => (
              <div
                key={item.nome}
                className={estilos.itemDistribuicao}
              >
                <div className={estilos.dadosDistribuicao}>
                  <span>{item.nome}</span>

                  <strong>
                    {item.treinos}{" "}
                    {item.treinos === 1 ? "treino" : "treinos"}
                  </strong>
                </div>

                <div className={estilos.trilho}>
                  <div
                    className={estilos.progresso}
                    style={{
                      width: `${item.percentual}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={estilos.evolucao}>
          <div className={estilos.tituloSecao}>
            <div>
              <p>EVOLUÇÃO</p>
              <h2>Desempenho geral</h2>
            </div>

            <strong className={estilos.valorDestaque}>
              +24%
            </strong>
          </div>

          <p className={estilos.textoAuxiliar}>
            Evolução estimada do desempenho nos últimos seis meses.
          </p>

          <div className={estilos.graficoEvolucao}>
            <div className={estilos.escala}>
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className={estilos.areaBarras}>
              {evolucaoMensal.map((item) => (
                <div
                  key={item.periodo}
                  className={estilos.colunaGrafico}
                >
                  <div className={estilos.valorGrafico}>
                    {item.desempenho}%
                  </div>

                  <div className={estilos.areaBarra}>
                    <div
                      className={estilos.barraEvolucao}
                      style={{
                        height: `${item.desempenho}%`,
                      }}
                    />
                  </div>

                  <span>
                    {item.periodo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={estilos.fundamentos}>
          <div className={estilos.tituloSecao}>
            <div>
              <p>ANÁLISE TÉCNICA</p>
              <h2>Desempenho por fundamento</h2>
            </div>
          </div>

          <div className={estilos.listaFundamentos}>
            {fundamentos.map((fundamento) => (
              <div
                key={fundamento.nome}
                className={estilos.fundamento}
              >
                <div className={estilos.fundamentoCabecalho}>
                  <span>
                    {fundamento.nome}
                  </span>

                  <strong>
                    {fundamento.desempenho}%
                  </strong>
                </div>

                <div className={estilos.trilhoFundamento}>
                  <div
                    className={estilos.progressoFundamento}
                    style={{
                      width: `${fundamento.desempenho}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={estilos.consistencia}>
          <div className={estilos.tituloSecao}>
            <div>
              <p>CONSISTÊNCIA</p>
              <h2>Frequência semanal</h2>
            </div>
          </div>

          <div className={estilos.semana}>
            <div className={estilos.diaAtivo}>
              <strong>SEG</strong>
              <span>Treino</span>
            </div>

            <div className={estilos.diaAtivo}>
              <strong>TER</strong>
              <span>Treino</span>
            </div>

            <div className={estilos.diaDescanso}>
              <strong>QUA</strong>
              <span>Descanso</span>
            </div>

            <div className={estilos.diaAtivo}>
              <strong>QUI</strong>
              <span>Treino</span>
            </div>

            <div className={estilos.diaAtivo}>
              <strong>SEX</strong>
              <span>Treino</span>
            </div>

            <div className={estilos.diaDescanso}>
              <strong>SÁB</strong>
              <span>Descanso</span>
            </div>

            <div className={estilos.diaDescanso}>
              <strong>DOM</strong>
              <span>Descanso</span>
            </div>
          </div>

          <div className={estilos.resumoConsistencia}>
            <div>
              <span>Média semanal</span>
              <strong>4 treinos</strong>
            </div>

            <div>
              <span>Maior sequência</span>
              <strong>5 dias</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Estatisticas;