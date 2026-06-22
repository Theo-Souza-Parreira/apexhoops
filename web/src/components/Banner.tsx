import estilos from './Banner.module.css'
import { useNavigate } from 'react-router-dom'

export function Banner(){
    
    const navegacao = useNavigate()

        const acessar = () => {
        navegacao('login')
    }
    
    return(
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
    )
}