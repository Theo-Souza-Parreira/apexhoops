import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,

        tabBarActiveTintColor: Cores.laranja,
        tabBarInactiveTintColor: Cores.branco,

        tabBarStyle: {
          backgroundColor: Cores.musgo,
          paddingBottom: insets.bottom || 10,
          height: 70 + (insets.bottom || 0),
          borderTopWidth: 0,
          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontFamily: Fontes.secundaria,
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="home"
              size={Fontes.grande2}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="status"
        options={{
          title: "Status",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="show-chart"
              size={Fontes.grande2}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="treinos"
        options={{
          title: "Treinos",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="fitness-center"
              size={Fontes.grande2}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="person-outline"
              size={Fontes.grande2}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}