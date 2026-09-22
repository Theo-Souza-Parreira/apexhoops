import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function TabsLayout() {

  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor:  Cores.primaria,
            tabBarInactiveTintColor: Cores.secundaria,
            tabBarStyle: {
                backgroundColor: Cores.primaria,
                paddingBottom: insets.bottom || 16,
                height: 60 + (insets.bottom || 0),
                borderTopWidth: 0,
                paddingTop: 10,
            }
        }} 
      >
        <Tabs.Screen 
          name='home'
          options={{
              tabBarIcon: ({color}) => (
                  <MaterialIcons name="home" size={Fontes.grande2} color={color} />
              ) 
          }} 
        />

      </Tabs>
    </>
  );
}
