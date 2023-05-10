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
  Spinner,
  Modal,
} from "native-base";
import MemeSelector from "./MemeSelector";
import { Meme, useApi } from "../hook/useApi";

interface RouterProps {
  route: RouteProp<{ params: { meme: string } }, "params">;
}
const CreatorScreen = (props: RouterProps) => {
  const { createMeme } = useApi();

  const [selected, setSelected] = useState<any>();
  const [selectedName, setSelectedName] = useState<string>();

  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const { meme } = props.route.params || { meme: "10-Guy" };
    setSelected(memes[meme]);
    setSelectedName(meme);
  }, [props.route]);

  const memeSelected = (meme: Meme) => {
    setSelected(meme.image);
    setSelectedName(meme.name);
  };
  const doCreateMeme = async () => {
    setLoading(true);
    const memeBlob = await createMeme(top, bottom, selectedName!);
    setLoading(false);

    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(memeBlob.data);

    fileReaderInstance.onload = () => {
      const base64Data = fileReaderInstance.result;
      setResult(base64Data);
      setShowModal(true);
    };
  };

    

  return (
    <ScrollView>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size='lg'>
        <Modal.Content maxWidth={400}>
          <Modal.CloseButton />
          <Modal.Header>Your Meme</Modal.Header>
          <Modal.Body>
            <Image
              source={{ uri: result }}
              alt='Result'
              resizeMode='contain'
              width={"400"}
              height={"200"}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button flex={1} onPress={() => {}}>
              Download
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {loading && (
        <HStack space={2} m={10} justifyContent='center'>
          <Spinner accessibilityLabel='Loading meme' color='secondary.500' />
          <Heading color='secondary.500' fontSize='md'>
            Loading meme...
          </Heading>
        </HStack>
      )}
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
              colorScheme={"secondary"}
              onPress={() => doCreateMeme()}
              size={"md"}>
              Create Meme
            </Button>
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
