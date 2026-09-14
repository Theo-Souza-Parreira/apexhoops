import { useEffect, useState } from "react";

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

import { useAutenticacao } from "../../hooks/useAutenticacao";

import {
    atualizarUsuario,
} from "../../services/UsuarioService";

import type {
    MaoDominante,
    NivelAtleta,
    Posicao,
    UsuarioTipo,
} from "../../types/Usuario";

import estilos from "./Perfil.module.css";

type PerfilFormulario = {
    nome: string;
    frasePerfil: string;
    cidade: string;
    nivel: NivelAtleta;
    posicao: Posicao;
    altura: string;
    peso: string;
    dataNascimento: string;
    maoDominante: MaoDominante;
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

const perfilVazio: PerfilFormulario = {
    nome: "",
    frasePerfil: "",
    cidade: "",
    nivel: "Iniciante",
    posicao: "Armador",
    altura: "",
    peso: "",
    dataNascimento: "",
    maoDominante: "Direita",
    focoPrincipal: "",
    descricaoFoco: "",
    prioridadeTecnica: "",
    prioridadeFisica: "",
    sessoesSemanais: "3",
};

const caracteristicas: Caracteristica[] = [
    {
        titulo: "Desenvolvimento técnico",
        descricao:
            "Evolução dos fundamentos individuais de acordo com o perfil e a posição do atleta.",
    },
    {
        titulo: "Consistência",
        descricao:
            "Construção de uma rotina de treinamento organizada e progressiva.",
    },
    {
        titulo: "Evolução individual",
        descricao:
            "Treinamentos direcionados às prioridades técnicas e físicas do atleta.",
    },
];

function converterPerfilParaFormulario(
    perfil: UsuarioTipo,
): PerfilFormulario {
    return {
        nome: perfil.nome,
        frasePerfil:
            perfil.frasePerfil ?? "",
        cidade: perfil.cidade ?? "",
        nivel: perfil.nivel ?? "Iniciante",
        posicao: perfil.posicao ?? "Armador",
        altura:
            perfil.altura !== undefined
                ? String(perfil.altura).replace(".", ",")
                : "",
        peso:
            perfil.peso !== undefined
                ? String(perfil.peso)
                : "",
        dataNascimento:
            perfil.dataNascimento ?? "",
        maoDominante:
            perfil.maoDominante ?? "Direita",
        focoPrincipal:
            perfil.focoPrincipal ?? "",
        descricaoFoco:
            perfil.descricaoFoco ?? "",
        prioridadeTecnica:
            perfil.prioridadeTecnica ?? "",
        prioridadeFisica:
            perfil.prioridadeFisica ?? "",
        sessoesSemanais:
            perfil.sessoesSemanais !== undefined
                ? String(perfil.sessoesSemanais)
                : "3",
    };
}

function calcularIdade(
    dataNascimento: string,
): number | null {
    if (!dataNascimento) {
        return null;
    }

    const nascimento =
        new Date(`${dataNascimento}T00:00:00`);

    if (Number.isNaN(nascimento.getTime())) {
        return null;
    }

    const hoje = new Date();

    let idade =
        hoje.getFullYear() -
        nascimento.getFullYear();

    const aniversarioNesteAno =
        new Date(
            hoje.getFullYear(),
            nascimento.getMonth(),
            nascimento.getDate(),
        );

    if (hoje < aniversarioNesteAno) {
        idade -= 1;
    }

    return idade;
}

export function Perfil() {
    const {
        usuarioFirebase,
        perfil,
        recarregarPerfil,
    } = useAutenticacao();

    const [rascunho, setRascunho] =
        useState<PerfilFormulario>(
            perfil
                ? converterPerfilParaFormulario(perfil)
                : perfilVazio,
        );

    const [editando, setEditando] =
        useState(false);

    const [salvando, setSalvando] =
        useState(false);

    const [mensagemErro, setMensagemErro] =
        useState("");

    const [mensagemSucesso, setMensagemSucesso] =
        useState("");

    useEffect(() => {
        if (!perfil || editando) {
            return;
        }

        setRascunho(
            converterPerfilParaFormulario(perfil),
        );
    }, [perfil, editando]);

    const atualizarCampo = <
        K extends keyof PerfilFormulario,
    >(
        campo: K,
        valor: PerfilFormulario[K],
    ) => {
        setRascunho((dadosAtuais) => ({
            ...dadosAtuais,
            [campo]: valor,
        }));
    };

    const iniciarEdicao = () => {
        if (!perfil) {
            return;
        }

        setMensagemErro("");
        setMensagemSucesso("");

        setRascunho(
            converterPerfilParaFormulario(perfil),
        );

        setEditando(true);
    };

    const cancelarEdicao = () => {
        if (perfil) {
            setRascunho(
                converterPerfilParaFormulario(perfil),
            );
        }

        setMensagemErro("");
        setEditando(false);
    };

    const salvarPerfil = async () => {
        if (!usuarioFirebase) {
            setMensagemErro(
                "Não foi possível identificar o usuário autenticado.",
            );
            return;
        }

        const altura =
            Number(
                rascunho.altura.replace(",", "."),
            );

        const peso =
            Number(
                rascunho.peso.replace(",", "."),
            );

        const sessoesSemanais =
            Number(rascunho.sessoesSemanais);

        if (
            !rascunho.nome.trim() ||
            !rascunho.cidade.trim() ||
            !rascunho.dataNascimento ||
            !rascunho.focoPrincipal.trim() ||
            !rascunho.prioridadeTecnica.trim() ||
            !rascunho.prioridadeFisica.trim()
        ) {
            setMensagemErro(
                "Preencha todas as informações obrigatórias do perfil.",
            );
            return;
        }

        if (
            !Number.isFinite(altura) ||
            altura <= 0
        ) {
            setMensagemErro(
                "Informe uma altura válida.",
            );
            return;
        }

        if (
            !Number.isFinite(peso) ||
            peso <= 0
        ) {
            setMensagemErro(
                "Informe um peso válido.",
            );
            return;
        }

        setSalvando(true);
        setMensagemErro("");
        setMensagemSucesso("");

        try {
            await atualizarUsuario(
                usuarioFirebase.uid,
                {
                    nome: rascunho.nome.trim(),

                    frasePerfil:
                        rascunho.frasePerfil.trim(),

                    cidade: rascunho.cidade.trim(),


                    nivel: rascunho.nivel,
                    posicao: rascunho.posicao,

                    altura,
                    peso,

                    dataNascimento:
                        rascunho.dataNascimento,

                    maoDominante:
                        rascunho.maoDominante,

                    focoPrincipal:
                        rascunho.focoPrincipal.trim(),

                    descricaoFoco:
                        rascunho.descricaoFoco.trim(),

                    prioridadeTecnica:
                        rascunho.prioridadeTecnica.trim(),

                    prioridadeFisica:
                        rascunho.prioridadeFisica.trim(),

                    sessoesSemanais,

                    perfilCompleto: true,
                },
            );

            await recarregarPerfil();

            setEditando(false);

            setMensagemSucesso(
                "Perfil atualizado com sucesso.",
            );
        } catch {
            setMensagemErro(
                "Não foi possível salvar as alterações do perfil.",
            );
        } finally {
            setSalvando(false);
        }
    };

    if (!perfil) {
        return (
            <div className={estilos.conteiner}>
                <p>
                    Não foi possível carregar o perfil do
                    atleta.
                </p>
            </div>
        );
    }

    const dadosExibidos =
        editando
            ? rascunho
            : converterPerfilParaFormulario(perfil);

    const idade =
        calcularIdade(
            dadosExibidos.dataNascimento,
        );

    return (
        <div className={estilos.conteiner}>
            <header
                className={estilos.cabecalhoPagina}
            >
                <div>
                    <p>PERFIL DO ATLETA</p>

                    <h1>
                        Seu <span>perfil</span>
                    </h1>

                    <span
                        className={
                            estilos.descricaoPagina
                        }
                    >
                        Informações utilizadas para
                        personalizar seus treinos e
                        acompanhar seu desenvolvimento.
                    </span>

                    {mensagemErro && (
                        <p
                            className={estilos.mensagemErro}
                            role="alert"
                        >
                            {mensagemErro}
                        </p>
                    )}

                    {mensagemSucesso && (
                        <p
                            className={
                                estilos.mensagemSucesso
                            }
                            role="status"
                        >
                            {mensagemSucesso}
                        </p>
                    )}
                </div>

                <div
                    className={estilos.acoesEdicao}
                >
                    {editando ? (
                        <>
                            <button
                                type="button"
                                className={
                                    estilos.botaoCancelar
                                }
                                onClick={cancelarEdicao}
                                disabled={salvando}
                            >
                                <FiX aria-hidden="true" />
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className={
                                    estilos.botaoSalvar
                                }
                                onClick={salvarPerfil}
                                disabled={salvando}
                            >
                                <FiSave aria-hidden="true" />

                                {salvando
                                    ? "Salvando..."
                                    : "Salvar alterações"}
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className={
                                estilos.botaoEditar
                            }
                            onClick={iniciarEdicao}
                        >
                            <FiEdit2 aria-hidden="true" />
                            Editar perfil
                        </button>
                    )}
                </div>
            </header>

            <div className={estilos.gradePrincipal}>
                <section
                    className={estilos.identidade}
                >
                    <div className={estilos.areaPerfil}>
                        <div
                            className={estilos.fotoPerfil}
                        >
                            <img
                                src={PerfilImagem}
                                alt={`Foto de perfil de ${dadosExibidos.nome}`}
                            />
                        </div>

                        <div
                            className={
                                estilos.dadosPrincipais
                            }
                        >
                            {editando ? (
                                <select
                                    className={
                                        estilos.campoCompacto
                                    }
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
                                <span
                                    className={estilos.nivel}
                                >
                                    {dadosExibidos.nivel.toUpperCase()}
                                </span>
                            )}

                            {editando ? (
                                <input
                                    className={
                                        estilos.campoNome
                                    }
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
                                <h2>{dadosExibidos.nome}</h2>
                            )}

                            <p>Atleta Apex Hoops</p>

                            {editando ? (
                                <input
                                    className={estilos.campoEdicao}
                                    type="text"
                                    maxLength={60}
                                    value={rascunho.frasePerfil}
                                    aria-label="Frase do atleta"
                                    placeholder="Ex.: Evoluir um treino de cada vez."
                                    onChange={(event) =>
                                        atualizarCampo(
                                            "frasePerfil",
                                            event.target.value,
                                        )
                                    }
                                />
                            ) : (
                                <span>
                                    {dadosExibidos.frasePerfil ||
                                        "Evoluir um treino de cada vez."}
                                </span>
                            )}  

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
                                            value={
                                                rascunho.posicao
                                            }
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
                                            {dadosExibidos.posicao}
                                        </strong>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={estilos.separador}
                    />

                    <div
                        className={estilos.resumoPerfil}
                    >
                        <div>
                            <FiMapPin aria-hidden="true" />

                            {editando ? (
                                <input
                                    className={
                                        estilos.campoCidade
                                    }
                                    type="text"
                                    value={rascunho.cidade}
                                    aria-label="Cidade do atleta"
                                    placeholder="Cidade, UF"
                                    onChange={(event) =>
                                        atualizarCampo(
                                            "cidade",
                                            event.target.value,
                                        )
                                    }
                                />
                            ) : (
                                <span>
                                    {dadosExibidos.cidade ||
                                        "Cidade não informada"}
                                </span>
                            )}
                        </div>

                        <div>
                            <FiActivity
                                aria-hidden="true"
                            />

                            <span>
                                Atleta Apex Hoops
                            </span>
                        </div>
                    </div>
                </section>

                <section className={estilos.foco}>
                    <div
                        className={estilos.tituloSecao}
                    >
                        <div>
                            <p>OBJETIVO ATUAL</p>

                            <h2>
                                Foco de treinamento
                            </h2>
                        </div>

                        <FiTarget
                            className={
                                estilos.iconeTitulo
                            }
                            aria-hidden="true"
                        />
                    </div>

                    <div
                        className={
                            estilos.focoPrincipal
                        }
                    >
                        <span>FOCO PRINCIPAL</span>

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
                                {dadosExibidos
                                    .focoPrincipal ||
                                    "Ainda não definido"}
                            </h3>
                        )}

                        {editando ? (
                            <textarea
                                className={
                                    estilos.textareaEdicao
                                }
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
                                {dadosExibidos
                                    .descricaoFoco ||
                                    "Complete seu perfil para personalizar melhor seus treinamentos."}
                            </p>
                        )}
                    </div>

                    <div
                        className={
                            estilos.focoSecundario
                        }
                    >
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
                                    {dadosExibidos
                                        .prioridadeTecnica ||
                                        "Não definida"}
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
                                    {dadosExibidos
                                        .prioridadeFisica ||
                                        "Não definida"}
                                </strong>
                            )}
                        </div>
                    </div>
                </section>

                <section
                    className={estilos.informacoes}
                >
                    <div
                        className={estilos.tituloSecao}
                    >
                        <div>
                            <p>DADOS DO ATLETA</p>

                            <h2>
                                Informações físicas
                            </h2>
                        </div>

                        <FiUser
                            className={
                                estilos.iconeTitulo
                            }
                            aria-hidden="true"
                        />
                    </div>

                    <div
                        className={
                            estilos.gradeInformacoes
                        }
                    >
                        <article
                            className={
                                estilos.cardInformacao
                            }
                        >
                            <div
                                className={
                                    estilos.iconeInformacao
                                }
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
                                <span>Altura</span>

                                {editando ? (
                                    <div
                                        className={
                                            estilos.campoComUnidade
                                        }
                                    >
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={
                                                rascunho.altura
                                            }
                                            aria-label="Altura"
                                            placeholder="1,80"
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
                                        {dadosExibidos.altura
                                            ? `${dadosExibidos.altura} m`
                                            : "Não informada"}
                                    </strong>
                                )}
                            </div>
                        </article>

                        <article
                            className={
                                estilos.cardInformacao
                            }
                        >
                            <div
                                className={
                                    estilos.iconeInformacao
                                }
                            >
                                <GiWeight
                                    aria-hidden="true"
                                />
                            </div>

                            <div
                                className={
                                    estilos.conteudoInformacao
                                }
                            >
                                <span>Peso</span>

                                {editando ? (
                                    <div
                                        className={
                                            estilos.campoComUnidade
                                        }
                                    >
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={rascunho.peso}
                                            aria-label="Peso"
                                            placeholder="80"
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
                                        {dadosExibidos.peso
                                            ? `${dadosExibidos.peso} kg`
                                            : "Não informado"}
                                    </strong>
                                )}
                            </div>
                        </article>

                        <article
                            className={
                                estilos.cardInformacao
                            }
                        >
                            <div
                                className={
                                    estilos.iconeInformacao
                                }
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
                                            dadosExibidos
                                                .maoDominante
                                        }
                                    </strong>
                                )}
                            </div>
                        </article>

                        <article
                            className={
                                estilos.cardInformacao
                            }
                        >
                            <div
                                className={
                                    estilos.iconeInformacao
                                }
                            >
                                <FiUser aria-hidden="true" />
                            </div>

                            <div
                                className={
                                    estilos.conteudoInformacao
                                }
                            >
                                <span>
                                    Data de nascimento
                                </span>

                                {editando ? (
                                    <input
                                        className={
                                            estilos.campoEdicao
                                        }
                                        type="date"
                                        value={
                                            rascunho
                                                .dataNascimento
                                        }
                                        aria-label="Data de nascimento"
                                        onChange={(event) =>
                                            atualizarCampo(
                                                "dataNascimento",
                                                event.target.value,
                                            )
                                        }
                                    />
                                ) : (
                                    <strong>
                                        {idade !== null
                                            ? `${idade} anos`
                                            : "Não informada"}
                                    </strong>
                                )}
                            </div>
                        </article>
                    </div>
                </section>

                <section
                    className={estilos.estiloJogo}
                >
                    <div
                        className={estilos.tituloSecao}
                    >
                        <div>
                            <p>PERFIL DE JOGO</p>

                            <h2>Características</h2>
                        </div>

                        <FiAward
                            className={
                                estilos.iconeTitulo
                            }
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
                                        className={
                                            estilos.marcador
                                        }
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

                <section className={estilos.plano}>
                    <div
                        className={estilos.tituloSecao}
                    >
                        <div>
                            <p>PLANO ATUAL</p>

                            <h2>
                                Treinamento recomendado
                            </h2>
                        </div>

                        <FiTrendingUp
                            className={
                                estilos.iconeTitulo
                            }
                            aria-hidden="true"
                        />
                    </div>

                    <div
                        className={
                            estilos.planoConteudo
                        }
                    >
                        <div>
                            <span>Plano</span>

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
                                        dadosExibidos
                                            .sessoesSemanais
                                    }{" "}
                                    treinos
                                </strong>
                            )}
                        </div>

                        <div>
                            <span>Nível</span>

                            <strong>
                                {dadosExibidos.nivel}
                            </strong>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Perfil;