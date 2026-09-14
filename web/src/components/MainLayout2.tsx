import {
  useContext,
} from "react";

import { Outlet } from "react-router-dom";

import { Header2 } from "./Header2";
import Footer2 from "./Footer2";
import { MenuLateral } from "./MenuLateral";

import { LayoutContexto } from "../contexts/LayoutContexto";

import { useAutenticacao } from "../hooks/useAutenticacao";

import PerfilImagem from "../assets/img/Perfil.png";

import estilos from "./MainLayout2.module.css";

function MainLayout2() {
  const {
    menuAbertoContexto,
  } = useContext(LayoutContexto);

  const {
    perfil,
    usuarioFirebase,
  } = useAutenticacao();

  const nome =
    perfil?.nome ??
    usuarioFirebase?.email?.split("@")[0] ??
    "Atleta";

  const frasePerfil =
    perfil?.frasePerfil ??
    "Evoluir um treino de cada vez.";

  return (
    <div className={estilos.conteiner}>
      <MenuLateral />

      <main
        className={`${estilos.principal} ${
          menuAbertoContexto
            ? estilos.menuAberto
            : estilos.menuFechado
        }`}
      >
        <Header2
          nome={nome}
          fotoPerfil={PerfilImagem}
          frasePerfil={frasePerfil}
        />

        <Outlet />

        <Footer2 />
      </main>
    </div>
  );
}

export default MainLayout2;