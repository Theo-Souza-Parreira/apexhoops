import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

import { AuthContext } from "../../contexts/AuthContext";

import estilos from "./Login.module.css";

type FormValues = {
  email: string;
  senha: string;
};

const loginSchema = z.object({
  email: z.email({
    message: "Informe um e-mail válido.",
  }),

  senha: z
    .string()
    .min(6, {
      message: "A senha deve conter entre 6 a 18 caracteres.",
    })
    .max(18, {
      message: "A senha deve conter entre 6 a 18 caracteres.",
    }),
});

export function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navegacao = useNavigate();

  const { autenticar } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const autenticarUsuario = (data: FormValues) => {
    autenticar(data.email);

    navegacao("/home2");
  };

  const novoUsuario = () => {
    navegacao("/cadastrar");
  };

  return (
    <main className={estilos.paginaLogin}>
      <section
        className={estilos.painelVisual}
        aria-label="Apresentação Apex Hoops"
      >
        <div className={estilos.conteudoVisual}>
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
        aria-labelledby="titulo-login"
      >
        <div className={estilos.cardLogin}>
          <header className={estilos.cabecalho}>
            <h2 id="titulo-login">
              Entrar
            </h2>

            <span
              className={estilos.linhaTitulo}
              aria-hidden="true"
            />

            <p>
              Acesse sua conta e continue evoluindo
              com a Apex Hoops.
            </p>
          </header>

          <form
            className={estilos.formulario}
            onSubmit={handleSubmit(autenticarUsuario)}
            noValidate
          >
            <div className={estilos.grupoCampo}>
              <label htmlFor="email">
                E-mail
              </label>

              <div
                className={`${estilos.campoContainer} ${
                  errors.email ? estilos.campoComErro : ""
                }`}
              >
                <FiMail
                  className={estilos.iconeCampo}
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
                  className={estilos.mensagemErro}
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className={estilos.grupoCampo}>
              <label htmlFor="senha">
                Senha
              </label>

              <div
                className={`${estilos.campoContainer} ${
                  errors.senha ? estilos.campoComErro : ""
                }`}
              >
                <FiLock
                  className={estilos.iconeCampo}
                  aria-hidden="true"
                />

                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Sua senha"
                  {...register("senha")}
                />

                <button
                  type="button"
                  className={estilos.botaoSenha}
                  onClick={() =>
                    setMostrarSenha(
                      (valorAtual) => !valorAtual
                    )
                  }
                  aria-label={
                    mostrarSenha
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {mostrarSenha ? (
                    <FiEyeOff aria-hidden="true" />
                  ) : (
                    <FiEye aria-hidden="true" />
                  )}
                </button>
              </div>

              {errors.senha && (
                <p
                  className={estilos.mensagemErro}
                  role="alert"
                >
                  {errors.senha.message}
                </p>
              )}
            </div>

            <div className={estilos.acoesSenha}>
              <span>
                Esqueceu sua senha?
              </span>
            </div>

            <button
              type="submit"
              className={estilos.botaoEntrar}
            >
              ENTRAR

              <span aria-hidden="true">
                →
              </span>
            </button>

            <div
              className={estilos.separador}
              aria-hidden="true"
            >
              <span />
              <p>OU</p>
              <span />
            </div>

            <p className={estilos.cadastro}>
              Ainda não tem uma conta?

              <button
                type="button"
                onClick={novoUsuario}
              >
                Crie agora
              </button>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}