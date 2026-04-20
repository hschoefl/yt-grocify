import { useState } from "react";
import { Text, View } from "react-native";

const PlannerFormCard = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Produce");
  const [priority, setPriority] = useState("medium");

  return (
    <View>
      <Text>PlannerFormCard</Text>
    </View>
  );
};

export default PlannerFormCard;
