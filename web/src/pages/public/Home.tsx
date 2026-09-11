import estilos from "./Home.module.css";

type Beneficio = {
  titulo: string;
  descricao: string;
  icone: string;
};

type Programa = {
  titulo: string;
  descricao: string;
  icone: string;
};

type Depoimento = {
  nome: string;
  texto: string;
};

const beneficios: Beneficio[] = [
  {
    titulo: "Treinos",
    descricao: "personalizados",
    icone: "◎",
  },
  {
    titulo: "Evolução",
    descricao: "comprovada",
    icone: "▥",
  },
  {
    titulo: "Comunidade",
    descricao: "ativa",
    icone: "◉",
  },
  {
    titulo: "Resultados",
    descricao: "que falam por si",
    icone: "★",
  },
];

const programas: Programa[] = [
  {
    titulo: "Fundamentos",
    descricao:
      "Desenvolva as bases essenciais do jogo com treinos focados em técnica e controle.",
    icone: "◉",
  },
  {
    titulo: "Condicionamento",
    descricao:
      "Melhore seu físico, resistência e explosão com treinos intensos e eficientes.",
    icone: "▰",
  },
  {
    titulo: "Performance",
    descricao:
      "Eleve seu jogo para o próximo nível com estratégias e treinos avançados.",
    icone: "↗",
  },
];

const depoimentos: Depoimento[] = [
{
    nome: "Lucas M.",
    texto:
        "Uma nova forma de treinar basquete, unindo tecnologia, prática e evolução."
},
{
    nome: "Gabriel S.",
    texto:
        "O Apex Hoops nasceu para tornar o treinamento de basquete mais acessível e organizado."
},
{
    nome: "Matheus A.",
    texto:
        "Mais do que um aplicativo, uma proposta para aproximar tecnologia e basquete."
},];

function Home() {
  return (
    <main className={estilos.pageContainer}>
      <section
        className={estilos.bg}
        aria-labelledby="titulo-home"
      >
        <div className={estilos.conteudoBanner}>
          <div className={estilos.name}>
            <h1 id="titulo-home">
              <span className={estilos.apex}>Apex</span> Hoops
            </h1>
          </div>

          <div className={estilos.desc}>
            <h2>
              Treine com propósito, evolua com
              <br />
              consistência e transforme seu jogo.
            </h2>
          </div>

          <a
            href="#publico"
            className={estilos.botao}
          >
            CONHEÇA

            <span
              className={estilos.iconeSeta}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </span>
          </a>
        </div>

        <div className={estilos.faixaBeneficios}>
          {beneficios.map((beneficio) => (
            <article
              key={beneficio.titulo}
              className={estilos.beneficio}
            >
              <span
                className={estilos.beneficioIcone}
                aria-hidden="true"
              >
                {beneficio.icone}
              </span>

              <div>
                <strong>{beneficio.titulo}</strong>
                <span>{beneficio.descricao}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className={estilos.blocoInstitucional}>
        <section
          id="publico"
          className={estilos.bg2}
          aria-labelledby="titulo-publico"
        >
          <div className={estilos.publicoConteudo}>
            <h2 id="titulo-publico">
              Para quem é o
              <span>Apex Hoops?</span>
            </h2>

            <p>
              Se você leva o basquete a sério e quer evoluir de verdade,
              este é o lugar certo.
            </p>

            <ul className={estilos.listaPublico}>
              <li>Atletas iniciantes ao avançado</li>
              <li>Quem busca performance e disciplina</li>
              <li>Quem quer fazer parte de algo maior</li>
            </ul>

            <a
              href="#programas"
              className={estilos.botaoSecundario}
            >
              SAIBA MAIS
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section
          id="programas"
          className={estilos.programasSobre}
          aria-labelledby="titulo-programas"
        >
          <div className={estilos.container}>
            <h2
              id="titulo-programas"
              className={estilos.tituloSecao}
            >
              Nossos <span>Programas</span>
            </h2>

            <div className={estilos.gradeProgramas}>
              {programas.map((programa) => (
                <article
                  key={programa.titulo}
                  className={estilos.cardPrograma}
                >
                  <span
                    className={estilos.iconePrograma}
                    aria-hidden="true"
                  >
                    {programa.icone}
                  </span>

                  <h3>{programa.titulo}</h3>

                  <p>{programa.descricao}</p>

                  <a
                    href="#sobre"
                    className={estilos.linkPrograma}
                  >
                    VER MAIS
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>

            <div
              id="sobre"
              className={estilos.sobreIntegrado}
            >
              <div
                className={estilos.sobreImagem}
                role="img"
                aria-label="Atleta de basquete treinando"
              />

              <div className={estilos.sobreConteudo}>
                <span className={estilos.rotuloSecao}>
                  SOBRE NÓS
                </span>

                <h2>
                  Mais que treinos,
                  <br />
                  formamos <span>atletas.</span>
                </h2>

                <p>
                  Apex Hoops nasceu para transformar jogadores dentro e
                  fora das quadras.
                </p>

                <ul className={estilos.listaSobre}>
                  <li>
                    <strong>Metodologia exclusiva</strong>
                    <span>
                      Treinos estruturados para resultados reais.
                    </span>
                  </li>

                  <li>
                    <strong>Acompanhamento próximo</strong>
                    <span>
                      Feedback constante e evolução contínua.
                    </span>
                  </li>

                  <li>
                    <strong>Mentalidade vencedora</strong>
                    <span>
                      Foco, disciplina e confiança.
                    </span>
                  </li>
                </ul>

                <a
                  href="#depoimentos"
                  className={estilos.botaoSecundario}
                >
                  CONHEÇA NOSSA HISTÓRIA
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        id="depoimentos"
        className={estilos.depoimentos}
        aria-labelledby="titulo-depoimentos"
      >
        <div className={estilos.container}>
          <h2
            id="titulo-depoimentos"
            className={estilos.tituloSecao}
          >
            O que nossos <span>Testers</span> dizem
          </h2>

          <div className={estilos.gradeDepoimentos}>
            {depoimentos.map((depoimento) => (
              <article
                key={depoimento.nome}
                className={estilos.cardDepoimento}
              >
                <div
                  className={estilos.estrelas}
                  aria-label="5 estrelas"
                >
                  ★★★★★
                </div>

                <blockquote>
                  “{depoimento.texto}”
                </blockquote>

                <div className={estilos.autor}>
                  <span className={estilos.avatar}>
                    {depoimento.nome.charAt(0)}
                  </span>

                  <div>
                    <strong>{depoimento.nome}</strong>
                    <span>Intrevistado do Apex Hoops</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className={estilos.footer}></footer>
    </main>
  );
}

export default Home;