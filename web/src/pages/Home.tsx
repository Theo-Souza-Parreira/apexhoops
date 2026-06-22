import estilos from './Home.module.css'
import { useNavigate } from 'react-router-dom'


function Home() {

      const navegacao = useNavigate()

        const acessar = () => {
        navegacao('login')
    }


  return (
    <div className={estilos.pageContainer}>
      
      {/* PRIMEIRA SEÇÃO (TELA INICIAL) */}
      <section className={estilos.banner}>
        <div className={estilos.conteudo}>

          <h1 className={estilos.titulo}> Treine. </h1>
          <h1 className={estilos.titulo}> Evolua. </h1>
          <h1 className={estilos.titulo2}> Supere. </h1>

          <button 
            className={estilos.botao}
            onClick={acessar}
          >
            Conhecer
          </button>

          <p className={estilos.texto}>“Treine melhor, evolua mais rápido. <br/> Uma plataforma de basquete feita para melhorar desempenho.”</p>

        </div>
      </section>

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