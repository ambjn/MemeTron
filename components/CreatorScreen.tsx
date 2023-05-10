import { useState, useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { memes } from "../assets/list";
import {
  HStack,
  Heading,
  ScrollView,
  VStack,
  Center,
  Image,
  FormControl,
  Input,
  Button,
} from "native-base";
import MemeSelector from "./MemeSelector";
import { Meme } from "../hook/useApi";

interface RouterProps {
  route: RouteProp<{ params: { meme: string } }, "params">;
}
const CreatorScreen = (props: RouterProps) => {
  const [selected, setSelected] = useState<any>();
  const [selectedName, setSelectedName] = useState<string>();

  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();

  useEffect(() => {
    const { meme } = props.route.params || { meme: "10-Guy" };
    setSelected(memes[meme]);
    setSelectedName(meme);
  }, [props.route]);

  const memeSelected = (meme: Meme) => {
    setSelected(meme.image);
    setSelectedName(meme.name);
  };
  const doCreateMeme= () => {}
  return (
    <ScrollView>
      {!loading && (
        <HStack space={2} mb={10} m={4}>
          <VStack space={2} w={"60%"}>
            <FormControl>
              <Input
                placeholder='Top Text'
                onChangeText={(text) => {
                  setTop(text);
                }}></Input>
            </FormControl>
            <FormControl>
              <Input
                placeholder='Bottom Text'
                onChangeText={(text) => {
                  setBottom(text);
                }}></Input>
            </FormControl>
            <Button 
            colorScheme={'secondary'}
            onPress={() => doCreateMeme()} size={'md'}>Create Meme</Button>
          </VStack>
          <Center>
            <Image
              source={selected}
              alt='Selected Meme'
              key={`meme:${selected}`}
            />
          </Center>
        </HStack>
      )}
      <MemeSelector
        onSelect={(meme) => {
          memeSelected(meme);
        }}
        activeMeme={selectedName}
      />
    </ScrollView>
  );
};

export default CreatorScreen;
