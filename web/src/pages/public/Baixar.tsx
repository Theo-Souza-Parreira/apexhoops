import styles from './Baixar.module.css'
import Playstore from '../../assets/img/Playstore.png'
import Apple from '../../assets/img/Apple.png'

export function Baixar() {
    return (
        <div className={styles.conteiner}>
            
            {/* Efeito de luz ambiente ao fundo */}
            <div className={styles.glowEffect}></div>

            {/* Um "card" de vidro para agrupar o conteúdo */}
            <div className={styles.card}>
                
                <h1 className={styles.titulo}>
                    Baixe o <span className={styles.brand}>Apex <span className={styles.logo}>Hoops</span></span>
                </h1>

                {/* Trocado de <h2> para <p>, pois é um texto de parágrafo descritivo */}
                <p className={styles.content}>
                    Leve seus treinos para qualquer lugar com o <strong className={styles.destaque}>Apex <span className={styles.logo}>Hoops</span></strong>.
                    <br /> Acesse exercícios personalizados, acompanhe sua evolução e desenvolva suas habilidades no basquete de forma prática e organizada, diretamente pelo celular.
                </p>

                <div className={styles.conteinerDownload}>
                    {/* Envolvi as imagens em tags <a> para que funcionem como links de clique */}
                    <a href="#android" className={styles.downloadBtn}>
                        <img src={Playstore} alt="Ícone de download na Playstore" />
                    </a>
                    
                    <a href="#ios" className={styles.downloadBtn}>
                        <img src={Apple} alt="Ícone de download na Apple Store" />
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Baixar;