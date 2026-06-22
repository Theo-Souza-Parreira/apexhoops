import estilos from './Home.module.css'
import HomeImage from "../assets/HomeImage.png"
import { useNavigate } from 'react-router-dom'


function Home() {

      const navegacao = useNavigate()

        const acessar = () => {
        navegacao('login')
    }


  return (
    <div className={estilos.pageContainer}>
      
      {/* PRIMEIRA SEÇÃO (TELA INICIAL) */}
      <section className={estilos.secaoHero}>
        <div className={estilos.content}>
          <h1 className={estilos.title}>
            Visualização e
            <br/>
            análise dos dados
            <br/>
            de treinos de basquete
          </h1>
          
          <h2 className={estilos.context}>
            O Apex Hoops Viewer organiza usuários, treinos,
            métricas e estatísticas geradas pelo aplicativo mobile de treinamento,
            apoiando análise administrativa e evolução dos atletas.
          </h2>

          <button className={estilos.btn} onClick={acessar}>
            Acessar sistema
          </button>
        </div>

        <div className={estilos.ladoDireito}>
          <img className={estilos.img} src={HomeImage} alt="Dashboard Preview" />
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