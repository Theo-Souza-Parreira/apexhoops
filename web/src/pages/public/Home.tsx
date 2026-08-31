import estilos from './Home.module.css'


function Home() {



  return (
    <div className={estilos.pageContainer}>
      
      {/* PRIMEIRA SEÇÃO (TELA INICIAL) */}

<section className={estilos.bg}>
        
        {/* Container para agrupar o conteúdo à esquerda */}
        <div className={estilos.conteudoBanner}>
          
          <div className={estilos.name}>
            <h1>
              <span className={estilos.apex}>Apex</span> Hoops
            </h1>
          </div>
        
          <div className={estilos.desc}>
            <h2>Treine com propósito, evolua com <br /> consistência e transforme seu jogo.</h2>
          </div>
        
          <button className={estilos.botao}>
            CONHEÇA
            {/* Ícone de seta renderizado nativamente com SVG */}
            <span className={estilos.iconeSeta}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="20" 
                height="20" 
                fill="currentColor"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </span>
          </button>
          
        </div>

      </section>
        {/* SEGUNDA SEÇÃO (CONTEÚDO PARA BAIXO) */}
      <section className={estilos.bg2}>
        
      </section>

    </div>
  )
}

export default Home