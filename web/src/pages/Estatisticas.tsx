import estilos from "./Estatisticas.module.css";
import Grafico from "../assets/img/Grafico.png";

export function Estatisticas() {
  return (
    <div className={estilos.pageContainer}>
      <div className={estilos.layout}>
        <aside className={estilos.leftPanel}>
          <img src={Grafico} />

          <div className={estilos.focusBlock}>
            <h3 className={estilos.focusTitle}>DESEMPENHO EM FOCO</h3>
            <p className={estilos.focusText}>
              Acompanhe sua evolução nos arremessos e veja seus resultados se
              transformando em consistência.
            </p>
          </div>

          <div className={estilos.tipCard}>
            <p className={estilos.tipLabel}>🏀 DICA DO DIA</p>
            <p className={estilos.tipText}>
              Mantenha o foco no fundamento e na consistência. Pequenos ajustes,
              grandes resultados.
            </p>
          </div>
        </aside>

        <section className={estilos.rightPanel}>
          <div className={estilos.pageHeader}>
            <h1 className={estilos.pageTitle}>Arremesso</h1>
            <p className={estilos.pageSubtitle}>
              Análise completa do seu desempenho nos arremessos.
            </p>
          </div>

          <div className={estilos.statsGrid}>
            <div className={estilos.statCard}>
              <p className={estilos.statLabel}>🏀 ARREMESSOS CERTOS</p>
              <p className={estilos.statValue}>245</p>
              <p className={estilos.statSub}>Total de cestas</p>
              <p className={estilos.trendUp}>
                ▲ 12% em relação ao período anterior
              </p>
            </div>

            <div className={estilos.statCard}>
              <p className={estilos.statLabel}>🏀 ARREMESSOS TENTADOS</p>
              <p className={estilos.statValue}>412</p>
              <p className={estilos.statSub}>Total de tentativas</p>
              <p className={estilos.trendUp}>
                ▲ 8% em relação ao período anterior
              </p>
            </div>

            <div className={estilos.statCard}>
              <p className={estilos.statLabel}>🎯 TAXA DE CONVERSÃO</p>
              <p className={estilos.statValue}>59.5%</p>
              <p className={estilos.statSub}>Aproveitamento geral</p>
              <p className={estilos.trendUp}>
                ▲ 4.3% em relação ao período anterior
              </p>
            </div>

            <div className={estilos.statCard}>
              <p className={estilos.statLabel}>🏆 PONTOS MARCADOS</p>
              <p className={estilos.statValue}>490</p>
              <p className={estilos.statSub}>Total de pontos</p>
              <p className={estilos.trendUp}>
                ▲ 14% em relação ao período anterior
              </p>
            </div>
          </div>

          <div className={estilos.averageCard}>
            <p className={estilos.statLabel}>📈 MÉDIA DE PONTOS POR JOGO</p>
            <div className={estilos.averageBody}>
              <p className={estilos.statValue}>18.7</p>
              <div>
                <p className={estilos.statSub}>Média por partida</p>
                <p className={estilos.trendUp}>
                  ▲ 9% em relação ao período anterior
                </p>
              </div>
            </div>
          </div>

          <p className={estilos.quote}>
            <span className={estilos.quoteMarks}>"</span>
            Grandes resultados nascem da repetição diária.
            <span className={estilos.quoteMarks}>"</span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Estatisticas;
