import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { Meme, TrendingMeme, useApi } from "../hook/useApi";
import {
  Center,
  ScrollView,
  Skeleton,
  VStack,
  Heading,
  useTheme,
  theme,
  Container,
} from "native-base";
import Swiper from "react-native-swiper";
import MemeSelector from "./MemeSelector";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const HomeScreen = (props: RouterProps) => {
  const theme = useTheme();
  const { getTrending } = useApi();
  const [memes, setMemes] = useState<TrendingMeme[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMemes = async () => {
      const results = await getTrending();
      setMemes(results);
      setLoading(false);
    };
    loadMemes();
  }, []);

  const memeSelected = (meme: Meme) => {
    props.navigation.navigate("Creator", { meme: meme.name });
  };

  return (
    <ScrollView>
      {loading && (
        <Center w='100%' mt={8}>
          <VStack w='90%' space={4}>
            <Skeleton.Text px='2' />
            <Skeleton h='80' />
          </VStack>
        </Center>
      )}
      {!loading && (
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          showsPagination={false}>
          {memes?.map((meme, index) => (
            <View key={index}>
              <VStack alignItems={"center"} space={4} mt={5}>
                <Heading style={styles.text}>{meme.title}</Heading>
                <Image
                  style={{ width: "90%", height: 300 }}
                  resizeMode='contain'
                  source={{ uri: meme.url }}
                />
              </VStack>
            </View>
          ))}
        </Swiper>
      )}
        <MemeSelector
          onSelect={(meme) => {
            memeSelected(meme);
          }}
        />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  wrapper: { height: 400 },
  text: {
    color: theme.colors.primary[500],
    fontSize: 30,
    fontWeight: "bold",
  },
});
export default HomeScreen;
