import { useEffect, useState } from "react";
import { Image, Heading, Row, Pressable, Center } from "native-base";
import { Meme, useApi } from "../hook/useApi";

interface MemeProps {
  activeMeme?: string;
  onSelect: (meme: Meme) => void;
}

const MemeSelector = (props: MemeProps) => {
  const { getMemes } = useApi();
  const [memes, setMemes] = useState<Meme[] | null>(null);
  useEffect(() => {
    const loadMemes = () => {
      getMemes().then((results) => {
        setMemes(results);
      });
    };
    loadMemes();
  }, []);

  const memeSelected = (meme: Meme) => {
    props.onSelect(meme);
  };

  return (
    <>
      <Center>
        <Heading>Select Your Meme</Heading>
      </Center>
      <Row flexWrap={"wrap"} mb={5} mt={5} justifyContent={"center"} space={2}>
        {memes?.map((meme) => (
          <Pressable
            onPress={() => memeSelected(meme)}
            key={meme.name}
            shadow='2'>
            <Image
              source={meme.image}
              size={"lg"}
              alt={`meme:${meme.name}`}
              borderColor={"cyan.600"}
              borderWidth={props.activeMeme === meme.name ? 4 : 0}
            />
          </Pressable>
        ))}
      </Row>
    </>
  );
};
export default MemeSelector;
