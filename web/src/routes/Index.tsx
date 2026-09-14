import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../components/MainLayout";
import MainLayout2 from "../components/MainLayout2";
import RotaProtegida from "../components/RotaProtegida";

import { AuthProvider } from "../contexts/AuthContext";
import { LayoutProvider } from "../contexts/LayoutContexto";

import Home from "../pages/public/Home";
import { Login } from "../pages/public/Login";
import { Cadastro } from "../pages/public/Cadastro";
import { Baixar } from "../pages/public/Baixar";
import { Sobre } from "../pages/public/Sobre";

import { Perfil } from "../pages/authenticated/Perfil";
import { Estatisticas } from "../pages/authenticated/Estatisticas";
import { Home2 } from "../pages/authenticated/Home2";
import { Treinos } from "../pages/authenticated/Treinos";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider
        Children={
          <LayoutProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="login"
                  element={<Login />}
                />

                <Route
                  path="cadastrar"
                  element={<Cadastro />}
                />

                <Route
                  path="baixar"
                  element={<Baixar />}
                />

                <Route
                  path="sobre"
                  element={<Sobre />}
                />
              </Route>

              <Route element={<RotaProtegida />}>
                <Route element={<MainLayout2 />}>
                  <Route
                    path="/home2"
                    element={<Home2 />}
                  />

                  <Route
                    path="/status"
                    element={<Estatisticas />}
                  />

                  <Route
                    path="/treinos"
                    element={<Treinos />}
                  />

                  <Route
                    path="/perfil"
                    element={<Perfil />}
                  />
                </Route>
              </Route>
            </Routes>
          </LayoutProvider>
        }
      />
    </BrowserRouter>
  );
}

export default AppRoutes;