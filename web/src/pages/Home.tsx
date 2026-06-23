import estilos from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { Banner } from '../components/Banner'


function Home() {

      const navegacao = useNavigate()


  return (
    <div className={estilos.pageContainer}>
      
      {/* PRIMEIRA SEÇÃO (TELA INICIAL) */}
      <Banner />

      {/* SEGUNDA SEÇÃO (CONTEÚDO PARA BAIXO) */}
      <section className={estilos.secaoRecursos}>
        <div className={estilos.recursosContent}>
          
          <h2 className={estilos.secaoTitle}>O que você pode gerenciar pelo PC?</h2>
          
          <div className={estilos.cardsGrid}>
            <div className={estilos.card}>
              <span className={estilos.cardIcon}>🏀</span>
              <h3>Desempenho</h3>
              <p>Monitore mapas de calor de arremessos e evolução de acertos dos atletas.</p>
            </div>

            <div className={estilos.card}>
              <span className={estilos.cardIcon}>📊</span>
              <h3>Estatísticas</h3>
              <p>Gere relatórios completos de treinos semanais e evolução física.</p>
            </div>


          </div>

        </div>
      </section>

    </div>
  )
}

export default Home