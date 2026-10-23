import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  onAuthStateChanged,
  type User,
} from "firebase/auth";

import { autenticacao } from "../firebase/Firebase";

import {
  criarConta,
  entrar as entrarServico,
  sair as sairServico,
} from "../services/AutenticacaoService";

import {
  buscarUsuario,
  criarUsuario,
  atualizarUsuario,
} from "../services/UsuarioService";

import { enviarImagem } from "../services/uploadImagem";

import type { UsuarioTipo } from "../types/Usuario";

type StatusAutenticacao =
  | "idle"
  | "loading"
  | "success"
  | "error";

type AuthContextoTipo = {
  usuarioFirebase: User | null;
  perfil: UsuarioTipo | null;

  autenticado: boolean;
  carregando: boolean;
  status: StatusAutenticacao;

  cadastrar: (
    nome: string,
    email: string,
    senha: string,
  ) => Promise<void>;

  entrar: (
    email: string,
    senha: string,
  ) => Promise<void>;

  deslogar: () => Promise<void>;

  recarregarPerfil: () => Promise<void>;

  atualizarFotoPerfil: (
    arquivo: File,
  ) => Promise<void>;
};

export const AuthContext =
  createContext<AuthContextoTipo | undefined>(
    undefined,
  );

type AuthProviderProps = {
  Children: ReactNode;
};

export function AuthProvider({
  Children,
}: AuthProviderProps) {
  const [
    usuarioFirebase,
    setUsuarioFirebase,
  ] = useState<User | null>(null);

  const [perfil, setPerfil] =
    useState<UsuarioTipo | null>(null);

  const [carregando, setCarregando] =
    useState(true);

  const [status, setStatus] =
    useState<StatusAutenticacao>("idle");

  // Atualiza a foto no armazenamento e salva sua URL no Firestore.
  const atualizarFotoPerfil = async (
    arquivo: File,
  ): Promise<void> => {
    if (!usuarioFirebase) {
      throw new Error("Usuário não autenticado.");
    }

    const urlFoto = await enviarImagem(arquivo);

    await atualizarUsuario(usuarioFirebase.uid, {
      fotoPerfil: urlFoto,
    });

    setPerfil((perfilAtual) =>
      perfilAtual
        ? {
            ...perfilAtual,
            fotoPerfil: urlFoto,
          }
        : perfilAtual,
    );
  };

  useEffect(() => {
    const cancelarObservador =
      onAuthStateChanged(
        autenticacao,
        async (usuario) => {
          setCarregando(true);

          try {
            setUsuarioFirebase(usuario);

            if (!usuario) {
              setPerfil(null);
              setStatus("idle");
              return;
            }

            const perfilEncontrado =
              await buscarUsuario(usuario.uid);

            setPerfil(perfilEncontrado);
            setStatus("success");
          } catch {
            setPerfil(null);
            setStatus("error");
          } finally {
            setCarregando(false);
          }
        },
      );

    return cancelarObservador;
  }, []);

  const cadastrar = async (
    nome: string,
    email: string,
    senha: string,
  ): Promise<void> => {
    setStatus("loading");

    try {
      const credencial =
        await criarConta(email, senha);

      // Cria o perfil enquanto o usuário está autenticado.
      await criarUsuario({
        uid: credencial.user.uid,
        nome,
        email,
      });

      // Encerra a sessão após o cadastro.
      await sairServico();

      setUsuarioFirebase(null);
      setPerfil(null);
      setStatus("success");
    } catch (error) {
      try {
        await sairServico();
      } catch {
        // Preserva o erro original.
      }

      setUsuarioFirebase(null);
      setPerfil(null);
      setStatus("error");

      throw error;
    }
  };

  const entrar = async (
    email: string,
    senha: string,
  ): Promise<void> => {
    setStatus("loading");

    try {
      const credencial =
        await entrarServico(email, senha);

      const perfilEncontrado =
        await buscarUsuario(credencial.user.uid);

      setUsuarioFirebase(credencial.user);
      setPerfil(perfilEncontrado);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      throw error;
    }
  };

  const deslogar =
    async (): Promise<void> => {
      setStatus("loading");

      try {
        await sairServico();

        setUsuarioFirebase(null);
        setPerfil(null);
        setStatus("idle");
      } catch (error) {
        setStatus("error");
        throw error;
      }
    };

  const recarregarPerfil =
    async (): Promise<void> => {
      if (!usuarioFirebase) {
        setPerfil(null);
        return;
      }

      const perfilAtualizado =
        await buscarUsuario(usuarioFirebase.uid);

      setPerfil(perfilAtualizado);
    };

  return (
    <AuthContext.Provider
      value={{
        usuarioFirebase,
        perfil,

        autenticado:
          usuarioFirebase !== null,

        carregando,
        status,

        cadastrar,
        entrar,
        deslogar,
        recarregarPerfil,
        atualizarFotoPerfil,
      }}
    >
      {Children}
    </AuthContext.Provider>
  );
}

export default AuthContext;