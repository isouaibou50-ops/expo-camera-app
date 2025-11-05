// src/screens/CroppedPreviewScreen.tsx
import React from "react";
import { View, Image, Button, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "CroppedPreview">;

export default function CroppedPreviewScreen({ route, navigation }: Props) {
  const { croppedUri } = route.params;

  if (!croppedUri) {
    Alert.alert("Error", "No cropped image found");
    navigation.goBack();
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: croppedUri }} style={styles.image} />
      <View style={styles.buttons}>
        <Button title="Retake" onPress={() => navigation.navigate("Camera")} />
        <Button title="Confirm" onPress={() => Alert.alert("Confirmed!")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { flex: 1, resizeMode: "contain" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#111",
  },
});
