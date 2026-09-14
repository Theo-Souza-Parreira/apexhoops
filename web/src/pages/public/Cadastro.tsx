import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import z from "zod";

import {
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";

import { useAutenticacao } from "../../hooks/useAutenticacao";

import estilos from "./Cadastro.module.css";

type FormValues = {
  nome: string;
  email: string;
  senha: string;
};

const cadastroSchema = z.object({
  nome: z
    .string()
    .min(2, {
      message:
        "O nome deve conter no mínimo 2 caracteres.",
    }),

  email: z.email({
    message:
      "Informe um e-mail válido.",
  }),

  senha: z
    .string()
    .min(6, {
      message:
        "A senha deve conter entre 6 a 18 caracteres.",
    })
    .max(18, {
      message:
        "A senha deve conter entre 6 a 18 caracteres.",
    }),
});

export function Cadastro() {
  const [mensagemErro, setMensagemErro] =
    useState("");

  const {
    cadastrar,
    status,
  } = useAutenticacao();

  const navegacao = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(cadastroSchema),
  });

  const cadastrarUsuario = async (
    data: FormValues,
  ) => {
    setMensagemErro("");

    try {
      await cadastrar(
        data.nome.trim(),
        data.email.trim(),
        data.senha,
      );

      navegacao("/home2");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setMensagemErro(
              "Este e-mail já está cadastrado.",
            );
            break;

          case "auth/invalid-email":
            setMensagemErro(
              "Informe um e-mail válido.",
            );
            break;

          case "auth/weak-password":
            setMensagemErro(
              "A senha informada é muito fraca.",
            );
            break;

          case "auth/network-request-failed":
            setMensagemErro(
              "Não foi possível conectar ao servidor. Verifique sua internet.",
            );
            break;

          case "auth/operation-not-allowed":
            setMensagemErro(
              "O cadastro por e-mail e senha não está habilitado.",
            );
            break;

          default:
            setMensagemErro(
              "Não foi possível criar sua conta. Tente novamente.",
            );
        }

        return;
      }

      setMensagemErro(
        "Ocorreu um erro inesperado durante o cadastro.",
      );
    }
  };

  const irParaLogin = () => {
    navegacao("/login");
  };

  return (
    <main className={estilos.paginaCadastro}>
      <section
        className={estilos.painelVisual}
        aria-label="Apresentação Apex Hoops"
      >
        <div
          className={estilos.conteudoVisual}
        >
          <h1>
            Mais que
            <br />
            treinos,
            <br />
            <span>jogadores</span>
            <br />
            <span>reais.</span>
          </h1>

          <p>
            Disciplina hoje,
            <br />
            resultados amanhã.
          </p>
        </div>
      </section>

      <section
        className={estilos.areaFormulario}
        aria-labelledby="titulo-cadastro"
      >
        <div
          className={estilos.cardCadastro}
        >
          <header
            className={estilos.cabecalho}
          >
            <h2 id="titulo-cadastro">
              Criar conta
            </h2>

            <span
              className={
                estilos.linhaTitulo
              }
              aria-hidden="true"
            />

            <p>
              Comece sua jornada e evolua
              com a Apex Hoops.
            </p>
          </header>

          <form
            className={estilos.formulario}
            onSubmit={handleSubmit(
              cadastrarUsuario,
            )}
            noValidate
          >
            <div
              className={estilos.grupoCampo}
            >
              <label htmlFor="nome">
                Nome
              </label>

              <div
                className={`${
                  estilos.campoContainer
                } ${
                  errors.nome
                    ? estilos.campoComErro
                    : ""
                }`}
              >
                <FiUser
                  className={
                    estilos.iconeCampo
                  }
                  aria-hidden="true"
                />

                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  {...register("nome")}
                />
              </div>

              {errors.nome && (
                <p
                  className={
                    estilos.mensagemErro
                  }
                  role="alert"
                >
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div
              className={estilos.grupoCampo}
            >
              <label htmlFor="email">
                E-mail
              </label>

              <div
                className={`${
                  estilos.campoContainer
                } ${
                  errors.email
                    ? estilos.campoComErro
                    : ""
                }`}
              >
                <FiMail
                  className={
                    estilos.iconeCampo
                  }
                  aria-hidden="true"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seuemail@exemplo.com"
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p
                  className={
                    estilos.mensagemErro
                  }
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div
              className={estilos.grupoCampo}
            >
              <label htmlFor="senha">
                Senha
              </label>

              <div
                className={`${
                  estilos.campoContainer
                } ${
                  errors.senha
                    ? estilos.campoComErro
                    : ""
                }`}
              >
                <FiLock
                  className={
                    estilos.iconeCampo
                  }
                  aria-hidden="true"
                />

                <input
                  id="senha"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Crie uma senha"
                  {...register("senha")}
                />
              </div>

              {errors.senha && (
                <p
                  className={
                    estilos.mensagemErro
                  }
                  role="alert"
                >
                  {errors.senha.message}
                </p>
              )}
            </div>

            {mensagemErro && (
              <p
                className={
                  estilos.mensagemErro
                }
                role="alert"
              >
                {mensagemErro}
              </p>
            )}

            <button
              type="submit"
              className={
                estilos.botaoCadastrar
              }
              disabled={
                status === "loading"
              }
            >
              {status === "loading" ? (
                "CADASTRANDO..."
              ) : (
                <>
                  CADASTRAR

                  <span
                    aria-hidden="true"
                  >
                    →
                  </span>
                </>
              )}
            </button>

            <div
              className={estilos.separador}
              aria-hidden="true"
            >
              <span />
              <p>OU</p>
              <span />
            </div>

            <p className={estilos.login}>
              Já possui uma conta?

              <button
                type="button"
                onClick={irParaLogin}
              >
                Entrar
              </button>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Cadastro;