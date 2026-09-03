import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    RobotoMonoBold: require("../../assets/fonts/RobotoMono-Bold.ttf"),
    RobotoMonoRegular: require("../../assets/fonts/RobotoMono-Regular.ttf"),

    SpaceGroteskBold: require("../../assets/fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskRegular: require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
    SpaceGroteskLight: require("../../assets/fonts/SpaceGrotesk-Light.ttf"),

    ZenDotsRegular: require("../../assets/fonts/ZenDots-Regular.ttf"),

    InterBold: require("../../assets/fonts/Inter-Bold.ttf"),
    InterRegular: require("../../assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />

      <Slot />

    </SafeAreaProvider>
  );
}