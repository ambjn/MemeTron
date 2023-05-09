import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";
import CreatorScreen from "./components/CreatorScreen";
import {
  Box,
  NativeBaseProvider,
  extendTheme,
  Text,
  VStack,
  Pressable,
  HStack,
  Icon,
  Center,
  Heading,
} from "native-base";
import React from "react";

const Drawer = createDrawerNavigator();
const theme = extendTheme({}); //native-base theme

const getIcons = (screenName: string) => {
  switch (screenName) {
    case "Home":
      return "home";
    case "About":
      return "information";
    case "Creator":
      return "fire";
    default:
      return undefined;
  }
};

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Center><Heading color={'secondary.900'}>MemeTron</Heading></Center>
      <VStack mx={1} my={2} space={3}>
        {props.state.routeNames.map((name: string, index: number) => (
          <Pressable
            key={index}
            px={5}
            py={3}
            rounded={"md"}
            onPress={() => props.navigation.navigate(name)}
            bg={index === props.state.index ? "secondary.100" : "transparent"}>
            <HStack p={1} space={4} alignItems={"center"}>
              <Icon
                size={5}
                color={
                  index === props.state.index ? "secondary.600" : "gray.700"
                }
                as={
                  <MaterialCommunityIcons
                    name={getIcons(name)}
                    size={24}
                    color='black'></MaterialCommunityIcons>
                }
              />
              <Text
                fontWeight={500}
                color={
                  index === props.state.index ? "secondary.600" : "gray.700"
                }>
                {name}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </DrawerContentScrollView>
  );
};

export default function App() {
  const headerStyle = {
    headerStyle: { backgroundColor: theme.colors.secondary[600] },
    headerTintColor: "#fff",
  };
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
              name='Home'
              component={HomeScreen}
              options={{
                title: "Trending Memes",
                ...headerStyle,
              }}
            />
            <Drawer.Screen
              name='About'
              component={AboutScreen}
              options={{
                title: "MemeTron",
                ...headerStyle,
              }}
            />
            <Drawer.Screen
              name='Creator'
              component={CreatorScreen}
              options={{
                title: "About MemeTron",
                ...headerStyle,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
