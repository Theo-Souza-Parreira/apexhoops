import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FirebaseError } from "firebase/app";
import {
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail,
} from "react-icons/fi";
import { useAutenticacao } from "../../hooks/useAutenticacao";
import estilos from "./Login.module.css";

import { recuperarSenha } from "../../services/AutenticacaoService";



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
    const [mostrarSenha, setMostrarSenha] =
        useState(false);

    const navegacao = useNavigate();

    const { entrar, status } =
        useAutenticacao();

    const [mensagemErro, setMensagemErro] =
        useState("");

    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [recuperandoSenha, setRecuperandoSenha] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
    });

    const solicitarRecuperacaoSenha = async () => {
        setMensagemErro("");
        setMensagemSucesso("");

        // O valor será obtido diretamente do campo no próximo ajuste.
        const campoEmail = document.querySelector<HTMLInputElement>("#email");
        const emailInformado = campoEmail?.value.trim() ?? "";

        if (!emailInformado) {
            setMensagemErro("Informe seu e-mail no campo acima para recuperar a senha.");
            return;
        }

        setRecuperandoSenha(true);

        try {
            await recuperarSenha(emailInformado);

            setMensagemSucesso(
                "Se houver uma conta associada a esse e-mail, você receberá as instruções para redefinir sua senha. Confira também a pasta de spam."
            );
        } catch (error) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/invalid-email":
                        setMensagemErro("Informe um e-mail válido.");
                        break;

                    case "auth/too-many-requests":
                        setMensagemErro("Muitas tentativas. Aguarde alguns minutos e tente novamente.");
                        break;

                    case "auth/network-request-failed":
                        setMensagemErro("Falha de conexão. Verifique sua internet.");
                        break;

                    default:
                        setMensagemErro("Não foi possível solicitar a recuperação agora. Tente novamente.");
                }
            } else {
                setMensagemErro("Ocorreu um erro inesperado ao solicitar a recuperação.");
            }
        } finally {
            setRecuperandoSenha(false);
        }
    };

    const autenticarUsuario = async (
        data: FormValues,
    ) => {
        setMensagemErro("");

    try {
      await entrar(
        data.email.trim(),
        data.senha,
      );

      navegacao("/home2");
    
    } catch (error) {
    if (
        error instanceof Error &&
        error.message === "EMAIL_NAO_VERIFICADO"
    ) {
        setMensagemErro(
        "Seu e-mail ainda não foi verificado. Confira sua caixa de entrada e clique no link enviado pelo Apex Hoops."
        );
        return;
    }

    if (error instanceof FirebaseError) {
        switch (error.code) {
        case "auth/invalid-credential":
            setMensagemErro("E-mail ou senha incorretos.");
            break;

        case "auth/invalid-email":
            setMensagemErro("Informe um e-mail válido.");
            break;

        case "auth/too-many-requests":
            setMensagemErro(
            "Muitas tentativas de acesso. Aguarde alguns minutos."
            );
            break;

        case "auth/network-request-failed":
            setMensagemErro(
            "Não foi possível conectar ao servidor. Verifique sua internet."
            );
            break;

        default:
            setMensagemErro(
            "Não foi possível entrar na sua conta."
            );
        }

        return;
    }

    setMensagemErro(
        "Ocorreu um erro inesperado durante o login."
    );
    }

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
                                className={`${estilos.campoContainer} ${errors.email ? estilos.campoComErro : ""
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
                                className={`${estilos.campoContainer} ${errors.senha ? estilos.campoComErro : ""}`}
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
                            <button
                                type="button"
                                onClick={solicitarRecuperacaoSenha}
                                disabled={recuperandoSenha}
                            >
                                {recuperandoSenha
                                    ? "Enviando..."
                                    : "Esqueceu sua senha?"}
                            </button>
                        </div>
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
                                className={estilos.mensagemSucesso}
                                role="status"
                            >
                                {mensagemSucesso}
                            </p>
                        )}
                        <button
                            type="submit"
                            className={estilos.botaoEntrar}
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? (
                                "ENTRANDO..."
                            ) : (
                                <>
                                    ENTRAR

                                    <span aria-hidden="true">
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