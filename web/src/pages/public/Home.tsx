import estilos from './Home.module.css'


function Home() {



  return (
    <div className={estilos.pageContainer}>
      
      {/* PRIMEIRA SEÇÃO (TELA INICIAL) */}

    <div className={estilos.bg}>

      <div className={estilos.name}>
          <h1><span className={estilos.apex}>Apex</span> Hoops</h1>
      </div>
    
      <div className={estilos.desc}>
          <h2>Treine com propósito, evolua com consistência e transforme seu jogo.</h2>
      </div>
    
    <div className={estilos.containerBotao}>
      <button className={estilos.botao}>
        CONHEÇA
      </button>
    </div>

    </div>
      
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