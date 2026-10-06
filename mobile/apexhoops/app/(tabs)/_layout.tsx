import { Tabs } from "expo-router";

import {
  View,
  StyleSheet,
  type ColorValue,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

const ALTURA_MENU = 105;
const TAMANHO_ICONE = 22;

type IconeMenuProps = {
  nome: keyof typeof MaterialIcons.glyphMap;
  cor: ColorValue;
};

type FundoMenuProps = {
  alturaHud: number;
};

function IconeMenu({
  nome,
  cor,
}: IconeMenuProps) {
  return (
    <View style={estilos.caixaIcone}>
      <MaterialIcons
        name={nome}
        size={TAMANHO_ICONE}
        color={cor}
      />
    </View>
  );
}

function FundoMenu({
  alturaHud,
}: FundoMenuProps) {
  return (
    <View
      style={estilos.containerFundo}
      pointerEvents="none"
    >
      {/* Fundo do menu */}
      <View style={estilos.fundoMenu} />

      {/* Área da navegação do sistema */}
      {alturaHud > 0 && (
        <View
          style={[
            estilos.fundoHud,
            {
              height: alturaHud,
            },
          ]}
        />
      )}
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[
        Cores.primaria,
        Cores.preto,
        Cores.musgo,
      ]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={estilos.fundo}
    >
      <Tabs
        screenOptions={{
          headerShown: false,

          sceneStyle: {
            paddingBottom:
              ALTURA_MENU + insets.bottom,

            backgroundColor:
              "transparent",
          },

          tabBarActiveTintColor:
            Cores.laranja,

          tabBarInactiveTintColor:
            Cores.branco,

          tabBarStyle: {
            position: "absolute",

            left: 0,
            right: 0,
            bottom: 0,

            height:
              ALTURA_MENU + insets.bottom,

            paddingTop: 18,
            paddingBottom:
              insets.bottom,

            backgroundColor:
              "transparent",

            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,

            elevation: 0,

            shadowOpacity: 0,
          },

          tabBarBackground: () => (
            <FundoMenu
              alturaHud={
                insets.bottom
              }
            />
          ),

          tabBarItemStyle: {
            paddingVertical: 5,
          },

          tabBarLabelStyle: {
            fontFamily:
              Fontes.titulo2,

            fontSize: 13,

            marginTop: 20,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Início",

            tabBarIcon: ({
              color,
            }) => (
              <IconeMenu
                nome="home"
                cor={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="sobre"
          options={{
            title: "Sobre",

            tabBarIcon: ({
              color,
            }) => (
              <IconeMenu
                nome="info-outline"
                cor={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="status"
          options={{
            title: "Status",

            tabBarIcon: ({
              color,
            }) => (
              <IconeMenu
                nome="show-chart"
                cor={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="treinos"
          options={{
            title: "Treinos",

            tabBarIcon: ({
              color,
            }) => (
              <IconeMenu
                nome="bar-chart"
                cor={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",

            tabBarIcon: ({
              color,
            }) => (
              <IconeMenu
                nome="person-outline"
                cor={color}
              />
            ),
          }}
        />
      </Tabs>
    </LinearGradient>
  );
}

const estilos =
  StyleSheet.create({
    fundo: {
      flex: 1,
    },

    containerFundo: {
      ...StyleSheet.absoluteFill,
      justifyContent: "flex-end",
    },

    fundoMenu: {
      height: ALTURA_MENU,

      backgroundColor:
        Cores.musgo,

      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,

      borderTopWidth: 2,
      borderTopColor:
        Cores.cinza_escuro,
    },

    fundoHud: {
      width: "100%",

      backgroundColor:
        Cores.fundoHud,
    },

    caixaIcone: {
      width: 58,
      height: 58,

      alignItems: "center",
      justifyContent: "center",

      backgroundColor:
        `${Cores.cinza_clara}15`,

      borderRadius: 20,

      borderWidth: 2,
      borderColor:
        Cores.cinza_escuro,
    },
  });