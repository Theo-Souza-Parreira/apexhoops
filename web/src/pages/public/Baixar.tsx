import { FiDownload, FiShield } from "react-icons/fi";
import Cesta from "../../assets/img/Cesta.png";
import Apple from "../../assets/img/Apple.png";
import Playstore from "../../assets/img/Playstore.png";

import estilos from "./Baixar.module.css";

export function Baixar() {
  return (
    <main className={estilos.pagina}>
      <section
        className={estilos.hero}
        aria-labelledby="titulo-baixar"
        style={{ backgroundImage: `url(${Cesta})` }}
      >
        <div className={estilos.heroConteudo}>
          <span className={estilos.rotulo}>
            SEU TREINO, NA SUA MÃO
          </span>

          <h1 id="titulo-baixar">
            Baixe o
            <span>Apex Hoops</span>
          </h1>

          <p className={estilos.descricao}>
            Transforme seu tempo livre em evolução.
            <br />
            O app que te acompanha nos treinos,
            <br />
            na quadra e na sua jornada.
          </p>

          <div
            className={estilos.lojas}
            aria-label="Aplicativo disponível para dispositivos móveis"
          >
            <div className={estilos.loja}>
              <img
                src={Apple}
                alt="Disponível na App Store"
              />
            </div>

            <div className={estilos.loja}>
              <img
                src={Playstore}
                alt="Disponível no Google Play"
              />
            </div>
          </div>

          <div className={estilos.informacoes}>
            <div className={estilos.informacao}>
              <FiDownload
                className={estilos.iconeInformacao}
                aria-hidden="true"
              />
              <span>Rápido e fácil de instalar</span>
            </div>

            <div
              className={estilos.separadorInformacoes}
              aria-hidden="true"
            />

            <div className={estilos.informacao}>
              <FiShield
                className={estilos.iconeInformacao}
                aria-hidden="true"
              />
              <span>Seguro e confiável</span>
            </div>
          </div>
        </div>

        <div
          className={estilos.linhasDecorativas}
          aria-hidden="true"
        >
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}
