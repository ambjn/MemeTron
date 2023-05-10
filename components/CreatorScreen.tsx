import { View, Text } from "react-native";
import { useState, useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { memes } from "../assets/list";
import { ScrollView } from "native-base";
import MemeSelector from "./MemeSelector";
import { Meme } from "../hook/useApi";

interface RouterProps {
  route: RouteProp<{ params: { meme: string } }, "params">;
}
const CreatorScreen = (props: RouterProps) => {
  const [selected, setSelected] = useState<string>();
  const [selectedName, setSelectedName] = useState<string>();

  useEffect(() => {
    const { meme } = props.route.params || { meme: "10-Guy" };
    setSelected(memes[meme]);
    setSelectedName(meme);
  }, [props.route]);

  const memeSelected = (meme: Meme) => {
    setSelected(meme.image);
    setSelectedName(meme.name);
  };
  return (
    <ScrollView>
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
