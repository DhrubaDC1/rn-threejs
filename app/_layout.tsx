import { useFonts } from "expo-font";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import HomeScreen from "./(tabs)";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return <HomeScreen />;
}
