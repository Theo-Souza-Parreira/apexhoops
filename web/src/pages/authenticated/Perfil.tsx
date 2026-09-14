// Perfil.tsx

import { useState } from "react";

import {
  FiActivity,
  FiAward,
  FiEdit2,
  FiMapPin,
  FiSave,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiX,
} from "react-icons/fi";

import {
  GiBasketballBasket,
  GiBodyHeight,
  GiWeight,
} from "react-icons/gi";

import PerfilImagem from "../../assets/img/Perfil.png";

import estilos from "./Perfil.module.css";

type NivelAtleta =
  | "Iniciante"
  | "Intermediário"
  | "Avançado";

type Posicao =
  | "Armador"
  | "Ala-armador"
  | "Ala"
  | "Ala-pivô"
  | "Pivô";

type MaoDominante =
  | "Direita"
  | "Esquerda"
  | "Ambidestra";

type PerfilDados = {
  nome: string;
  cidade: string;
  nivel: NivelAtleta;
  posicao: Posicao;
  altura: string;
  peso: string;
  maoDominante: MaoDominante;
  idade: string;
  focoPrincipal: string;
  descricaoFoco: string;
  prioridadeTecnica: string;
  prioridadeFisica: string;
  sessoesSemanais: string;
};

type Caracteristica = {
  titulo: string;
  descricao: string;
};

const dadosIniciais: PerfilDados = {
  nome: "Paulo",
  cidade: "Hortolândia, SP",
  nivel: "Intermediário",
  posicao: "Pivô",
  altura: "2,02",
  peso: "101",
  maoDominante: "Direita",
  idade: "17",
  focoPrincipal: "Jogo no garrafão e rebote",
  descricaoFoco:
    "Desenvolver presença física, posicionamento, finalizações próximas à cesta e eficiência nos rebotes ofensivos e defensivos.",
  prioridadeTecnica: "Finalização",
  prioridadeFisica: "Força",
  sessoesSemanais: "4",
};

const caracteristicas: Caracteristica[] = [
  {
    titulo: "Jogo próximo à cesta",
    descricao:
      "Prioriza movimentações no garrafão, finalizações e presença ofensiva próxima ao aro.",
  },
  {
    titulo: "Rebote",
    descricao:
      "Foco em posicionamento, box out e aproveitamento de segundas oportunidades.",
  },
  {
    titulo: "Presença física",
    descricao:
      "Utiliza força e contato para criar espaço e proteger a posição dentro do garrafão.",
  },
];

export function Perfil() {
  const [perfil, setPerfil] =
    useState<PerfilDados>(dadosIniciais);

  const [rascunho, setRascunho] =
    useState<PerfilDados>(dadosIniciais);

  const [editando, setEditando] =
    useState(false);

  const atualizarCampo = <
    K extends keyof PerfilDados,
  >(
    campo: K,
    valor: PerfilDados[K],
  ) => {
    setRascunho((dadosAtuais) => ({
      ...dadosAtuais,
      [campo]: valor,
    }));
  };

  const iniciarEdicao = () => {
    setRascunho(perfil);
    setEditando(true);
  };

  const cancelarEdicao = () => {
    setRascunho(perfil);
    setEditando(false);
  };

  const salvarPerfil = () => {
    setPerfil(rascunho);
    setEditando(false);
  };

  const dadosExibidos =
    editando ? rascunho : perfil;

  return (
    <div className={estilos.conteiner}>
      <header className={estilos.cabecalhoPagina}>
        <div>
          <p>PERFIL DO ATLETA</p>

          <h1>
            Seu <span>perfil</span>
          </h1>

          <span className={estilos.descricaoPagina}>
            Informações utilizadas para personalizar
            seus treinos e acompanhar seu
            desenvolvimento.
          </span>
        </div>

        <div className={estilos.acoesEdicao}>
          {editando ? (
            <>
              <button
                type="button"
                className={estilos.botaoCancelar}
                onClick={cancelarEdicao}
              >
                <FiX aria-hidden="true" />
                Cancelar
              </button>

              <button
                type="button"
                className={estilos.botaoSalvar}
                onClick={salvarPerfil}
              >
                <FiSave aria-hidden="true" />
                Salvar alterações
              </button>
            </>
          ) : (
            <button
              type="button"
              className={estilos.botaoEditar}
              onClick={iniciarEdicao}
            >
              <FiEdit2 aria-hidden="true" />
              Editar perfil
            </button>
          )}
        </div>
      </header>

      <main className={estilos.gradePrincipal}>
        {/* =====================================
            IDENTIDADE
        ===================================== */}

        <section className={estilos.identidade}>
          <div className={estilos.areaPerfil}>
            <div className={estilos.fotoPerfil}>
              <img
                src={PerfilImagem}
                alt={`Foto de perfil de ${perfil.nome}`}
              />
            </div>

            <div className={estilos.dadosPrincipais}>
              {editando ? (
                <select
                  className={estilos.campoCompacto}
                  value={rascunho.nivel}
                  aria-label="Nível do atleta"
                  onChange={(event) =>
                    atualizarCampo(
                      "nivel",
                      event.target
                        .value as NivelAtleta,
                    )
                  }
                >
                  <option value="Iniciante">
                    Iniciante
                  </option>

                  <option value="Intermediário">
                    Intermediário
                  </option>

                  <option value="Avançado">
                    Avançado
                  </option>
                </select>
              ) : (
                <span className={estilos.nivel}>
                  {perfil.nivel.toUpperCase()}
                </span>
              )}

              {editando ? (
                <input
                  className={estilos.campoNome}
                  type="text"
                  value={rascunho.nome}
                  aria-label="Nome do atleta"
                  onChange={(event) =>
                    atualizarCampo(
                      "nome",
                      event.target.value,
                    )
                  }
                />
              ) : (
                <h2>{perfil.nome}</h2>
              )}

              <p>
                Atleta Apex Hoops
              </p>

              <div className={estilos.posicao}>
                <GiBasketballBasket
                  aria-hidden="true"
                />

                <div>
                  <span>
                    Posição principal
                  </span>

                  {editando ? (
                    <select
                      className={
                        estilos.campoEdicao
                      }
                      value={rascunho.posicao}
                      aria-label="Posição principal"
                      onChange={(event) =>
                        atualizarCampo(
                          "posicao",
                          event.target
                            .value as Posicao,
                        )
                      }
                    >
                      <option value="Armador">
                        Armador
                      </option>

                      <option value="Ala-armador">
                        Ala-armador
                      </option>

                      <option value="Ala">
                        Ala
                      </option>

                      <option value="Ala-pivô">
                        Ala-pivô
                      </option>

                      <option value="Pivô">
                        Pivô
                      </option>
                    </select>
                  ) : (
                    <strong>
                      {perfil.posicao}
                    </strong>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={estilos.separador}
          />

          <div className={estilos.resumoPerfil}>
            <div>
              <FiMapPin aria-hidden="true" />

              {editando ? (
                <input
                  className={estilos.campoCidade}
                  type="text"
                  value={rascunho.cidade}
                  aria-label="Cidade do atleta"
                  onChange={(event) =>
                    atualizarCampo(
                      "cidade",
                      event.target.value,
                    )
                  }
                />
              ) : (
                <span>
                  {perfil.cidade}
                </span>
              )}
            </div>

            <div>
              <FiActivity aria-hidden="true" />

              <span>
                Ativo desde 2026
              </span>
            </div>
          </div>
        </section>

        {/* =====================================
            FOCO
        ===================================== */}

        <section className={estilos.foco}>
          <div className={estilos.tituloSecao}>
            <div>
              <p>OBJETIVO ATUAL</p>
              <h2>
                Foco de treinamento
              </h2>
            </div>

            <FiTarget
              className={estilos.iconeTitulo}
              aria-hidden="true"
            />
          </div>

          <div className={estilos.focoPrincipal}>
            <span>
              FOCO PRINCIPAL
            </span>

            {editando ? (
              <input
                className={
                  estilos.campoFocoPrincipal
                }
                type="text"
                value={
                  rascunho.focoPrincipal
                }
                aria-label="Foco principal"
                onChange={(event) =>
                  atualizarCampo(
                    "focoPrincipal",
                    event.target.value,
                  )
                }
              />
            ) : (
              <h3>
                {perfil.focoPrincipal}
              </h3>
            )}

            {editando ? (
              <textarea
                className={estilos.textareaEdicao}
                value={
                  rascunho.descricaoFoco
                }
                aria-label="Descrição do foco"
                rows={3}
                onChange={(event) =>
                  atualizarCampo(
                    "descricaoFoco",
                    event.target.value,
                  )
                }
              />
            ) : (
              <p>
                {perfil.descricaoFoco}
              </p>
            )}
          </div>

          <div className={estilos.focoSecundario}>
            <div>
              <span>
                Prioridade técnica
              </span>

              {editando ? (
                <input
                  className={
                    estilos.campoEdicao
                  }
                  type="text"
                  value={
                    rascunho
                      .prioridadeTecnica
                  }
                  aria-label="Prioridade técnica"
                  onChange={(event) =>
                    atualizarCampo(
                      "prioridadeTecnica",
                      event.target.value,
                    )
                  }
                />
              ) : (
                <strong>
                  {
                    perfil
                      .prioridadeTecnica
                  }
                </strong>
              )}
            </div>

            <div>
              <span>
                Prioridade física
              </span>

              {editando ? (
                <input
                  className={
                    estilos.campoEdicao
                  }
                  type="text"
                  value={
                    rascunho
                      .prioridadeFisica
                  }
                  aria-label="Prioridade física"
                  onChange={(event) =>
                    atualizarCampo(
                      "prioridadeFisica",
                      event.target.value,
                    )
                  }
                />
              ) : (
                <strong>
                  {
                    perfil
                      .prioridadeFisica
                  }
                </strong>
              )}
            </div>
          </div>
        </section>

        {/* =====================================
            INFORMAÇÕES FÍSICAS
        ===================================== */}

        <section className={estilos.informacoes}>
          <div className={estilos.tituloSecao}>
            <div>
              <p>DADOS DO ATLETA</p>

              <h2>
                Informações físicas
              </h2>
            </div>

            <FiUser
              className={estilos.iconeTitulo}
              aria-hidden="true"
            />
          </div>

          <div className={estilos.gradeInformacoes}>
            <article
              className={estilos.cardInformacao}
            >
              <div
                className={estilos.iconeInformacao}
              >
                <GiBodyHeight
                  aria-hidden="true"
                />
              </div>

              <div
                className={
                  estilos.conteudoInformacao
                }
              >
                <span>
                  Altura
                </span>

                {editando ? (
                  <div
                    className={estilos.campoComUnidade}
                  >
                    <input
                      type="text"
                      inputMode="decimal"
                      value={
                        rascunho.altura
                      }
                      aria-label="Altura"
                      onChange={(event) =>
                        atualizarCampo(
                          "altura",
                          event.target.value,
                        )
                      }
                    />

                    <span>m</span>
                  </div>
                ) : (
                  <strong>
                    {perfil.altura} m
                  </strong>
                )}
              </div>
            </article>

            <article
              className={estilos.cardInformacao}
            >
              <div
                className={estilos.iconeInformacao}
              >
                <GiWeight aria-hidden="true" />
              </div>

              <div
                className={
                  estilos.conteudoInformacao
                }
              >
                <span>
                  Peso
                </span>

                {editando ? (
                  <div
                    className={estilos.campoComUnidade}
                  >
                    <input
                      type="text"
                      inputMode="decimal"
                      value={
                        rascunho.peso
                      }
                      aria-label="Peso"
                      onChange={(event) =>
                        atualizarCampo(
                          "peso",
                          event.target.value,
                        )
                      }
                    />

                    <span>kg</span>
                  </div>
                ) : (
                  <strong>
                    {perfil.peso} kg
                  </strong>
                )}
              </div>
            </article>

            <article
              className={estilos.cardInformacao}
            >
              <div
                className={estilos.iconeInformacao}
              >
                <span aria-hidden="true">
                  D
                </span>
              </div>

              <div
                className={
                  estilos.conteudoInformacao
                }
              >
                <span>
                  Mão dominante
                </span>

                {editando ? (
                  <select
                    className={
                      estilos.campoEdicao
                    }
                    value={
                      rascunho
                        .maoDominante
                    }
                    aria-label="Mão dominante"
                    onChange={(event) =>
                      atualizarCampo(
                        "maoDominante",
                        event.target
                          .value as MaoDominante,
                      )
                    }
                  >
                    <option value="Direita">
                      Direita
                    </option>

                    <option value="Esquerda">
                      Esquerda
                    </option>

                    <option value="Ambidestra">
                      Ambidestra
                    </option>
                  </select>
                ) : (
                  <strong>
                    {
                      perfil
                        .maoDominante
                    }
                  </strong>
                )}
              </div>
            </article>

            <article
              className={estilos.cardInformacao}
            >
              <div
                className={estilos.iconeInformacao}
              >
                <FiUser aria-hidden="true" />
              </div>

              <div
                className={
                  estilos.conteudoInformacao
                }
              >
                <span>
                  Idade
                </span>

                {editando ? (
                  <div
                    className={estilos.campoComUnidade}
                  >
                    <input
                      type="number"
                      min="10"
                      max="99"
                      value={
                        rascunho.idade
                      }
                      aria-label="Idade"
                      onChange={(event) =>
                        atualizarCampo(
                          "idade",
                          event.target.value,
                        )
                      }
                    />

                    <span>anos</span>
                  </div>
                ) : (
                  <strong>
                    {perfil.idade} anos
                  </strong>
                )}
              </div>
            </article>
          </div>
        </section>

        {/* =====================================
            CARACTERÍSTICAS
        ===================================== */}

        <section className={estilos.estiloJogo}>
          <div className={estilos.tituloSecao}>
            <div>
              <p>PERFIL DE JOGO</p>

              <h2>
                Características
              </h2>
            </div>

            <FiAward
              className={estilos.iconeTitulo}
              aria-hidden="true"
            />
          </div>

          <div
            className={
              estilos.listaCaracteristicas
            }
          >
            {caracteristicas.map(
              (caracteristica) => (
                <article
                  key={
                    caracteristica.titulo
                  }
                  className={
                    estilos.caracteristica
                  }
                >
                  <span
                    className={estilos.marcador}
                    aria-hidden="true"
                  />

                  <div>
                    <strong>
                      {
                        caracteristica
                          .titulo
                      }
                    </strong>

                    <p>
                      {
                        caracteristica
                          .descricao
                      }
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        {/* =====================================
            PLANO
        ===================================== */}

        <section className={estilos.plano}>
          <div className={estilos.tituloSecao}>
            <div>
              <p>PLANO ATUAL</p>

              <h2>
                Treinamento recomendado
              </h2>
            </div>

            <FiTrendingUp
              className={estilos.iconeTitulo}
              aria-hidden="true"
            />
          </div>

          <div className={estilos.planoConteudo}>
            <div>
              <span>
                Plano
              </span>

              <strong>
                Desenvolvimento de{" "}
                {dadosExibidos.posicao}
              </strong>
            </div>

            <div>
              <span>
                Sessões semanais
              </span>

              {editando ? (
                <select
                  className={
                    estilos.campoPlano
                  }
                  value={
                    rascunho
                      .sessoesSemanais
                  }
                  aria-label="Sessões semanais"
                  onChange={(event) =>
                    atualizarCampo(
                      "sessoesSemanais",
                      event.target.value,
                    )
                  }
                >
                  <option value="2">
                    2 treinos
                  </option>

                  <option value="3">
                    3 treinos
                  </option>

                  <option value="4">
                    4 treinos
                  </option>

                  <option value="5">
                    5 treinos
                  </option>

                  <option value="6">
                    6 treinos
                  </option>
                </select>
              ) : (
                <strong>
                  {
                    perfil
                      .sessoesSemanais
                  }{" "}
                  treinos
                </strong>
              )}
            </div>

            <div>
              <span>
                Nível
              </span>

              <strong>
                {dadosExibidos.nivel}
              </strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Perfil;