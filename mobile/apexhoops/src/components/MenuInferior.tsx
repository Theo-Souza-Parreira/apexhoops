import { router, usePathname, Href } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function MenuInferior() {
  const pathname = usePathname();

    const itens: {
        nome: string;
        rota: Href;
        icone: keyof typeof MaterialIcons.glyphMap;
    }[] = [
        {
            nome: "Início",
            rota: "/(tabs)/home",
            icone: "home",
        },
        {
            nome: "Status",
            rota: "/(tabs)/home",
            icone: "show-chart",
        },
        {
            nome: "Treinos",
            rota: "/(tabs)/home",
            icone: "bar-chart",
        },
        {
            nome: "Perfil",
            rota: "/(tabs)/home",
            icone: "person-outline",
        },
    ];

  return (
    <View style={estilos.menu}>
      {itens.map((item) => {
        const ativo = pathname === item.rota;
        const Icone = item.icone;

        return (
          <Pressable
            key={item.nome}
            style={estilos.item}
            onPress={() => router.push(item.rota)}
          >
            <View style={[
              estilos.icone,
              ativo && estilos.iconeAtivo
            ]}>

                <MaterialIcons
                    name={item.icone}
                    size={28}
                    color={ativo ? Cores.laranja : Cores.branco}
                />

            </View>

            <Text style={[
              estilos.texto,
              ativo && estilos.textoAtivo
            ]}>
              {item.nome}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  menu: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,

    height: 120,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: Cores.musgo,

    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: Cores.cinza_escuro,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
  },

  icone: {
    width: 68,
    height: 68,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: `${Cores.cinza_clara}15`,

    borderRadius: 20,
    borderWidth: 2,
    borderColor: Cores.cinza_escuro,
  },

  iconeAtivo: {
    borderColor: Cores.cinza_escuro,
  },

  texto: {
    marginTop: 5,

    color: Cores.branco,
    fontFamily: Fontes.titulo2,
    fontSize: 11,
  },

  textoAtivo: {
    color: Cores.laranja,
  },
});