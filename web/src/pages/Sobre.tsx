import estilos from "./Sobre.module.css";
import {
  BiLogoReact,
  BiLogoTypescript,
  BiLogoNodejs,
  BiLogoFirebase,
  BiLogoGit,
} from "react-icons/bi";

export function Sobre() {
    const tecnologias = [
    { nome: "React", icon: <BiLogoReact /> },
    { nome: "TypeScript", icon: <BiLogoTypescript /> },
    { nome: "Node.js", icon: <BiLogoNodejs /> },
    { nome: "Firebase", icon: <BiLogoFirebase /> },
    { nome: "Git / GitHub", icon: <BiLogoGit /> },
    ]
  return (
    <div className={estilos.container}>

      <section className={estilos.hero}>
        <h1><span className={estilos.apex}>Apex</span> Hoops</h1>
        <p>Plataforma digital para treinos de basquete</p>
        <span className={estilos.texto}>
          Democratizando o acesso ao desenvolvimento esportivo através da
          tecnologia.
        </span>
      </section>

      <section className={estilos.section}>
        <h2>O problema</h2>
        <p>
          O basquete é um esporte que exige constância, técnica e orientação
          adequada para evolução. No entanto, muitos jovens praticantes
          enfrentam dificuldades para desenvolver suas habilidades de forma
          estruturada. A falta de acesso a treinadores especializados e o alto
          custo de acompanhamento profissional acabam limitando o progresso
          técnico de grande parte dos atletas. Além disso, a ausência de uma
          plataforma organizada que centralize treinos por nível e posição faz
          com que muitos jogadores treinem de forma aleatória, sem um
          direcionamento claro. Isso gera estagnação no desenvolvimento e reduz
          o potencial de evolução dentro do esporte.
        </p>
      </section>

      <section className={estilos.section}>
        <h2>Nossa solução</h2>
        <p>
          O Apex Hoops surge como uma plataforma digital voltada para
          democratizar o acesso ao treinamento de basquete. O sistema foi
          desenvolvido para oferecer treinos estruturados, organizados por nível
          de habilidade e posição do atleta, permitindo que qualquer jogador
          consiga evoluir de forma guiada, mesmo sem acompanhamento profissional
          constante. A proposta é utilizar a tecnologia como ferramenta de
          inclusão esportiva, conectando jovens atletas a uma metodologia de
          treino mais acessível, prática e eficiente. Dessa forma, o projeto
          busca transformar a forma como o treino individual é realizado,
          tornando-o mais inteligente, organizado e acessível.
        </p>
      </section>

      <section className={estilos.section}>
        <h2>Funcionalidades</h2>

        <div className={estilos.cards}>
          <div className={estilos.card}>Treinos por nível</div>
          <div className={estilos.card}>Treinos por posição</div>
          <div className={estilos.card}>Evolução do atleta</div>
          <div className={estilos.card}>Cadastro de usuário</div>
          <div className={estilos.card}>Biblioteca de exercícios</div>
        </div>
      </section>

      <section className={estilos.section}>
        <h2>Tecnologias</h2>

        <div className={estilos.techGrid}>
          {tecnologias.map((tech, index) => (
            <div key={index} className={estilos.techCard}>
              <div className={estilos.icon}>{tech.icon}</div>
              <span>{tech.nome}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
