import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";
import CreatorScreen from "./components/CreatorScreen";
import { NativeBaseProvider } from "native-base";

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name='Home' component={HomeScreen} />
            <Drawer.Screen name='About' component={AboutScreen} />
            <Drawer.Screen name='Creator' component={CreatorScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
