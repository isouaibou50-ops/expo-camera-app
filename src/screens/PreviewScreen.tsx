// src/screens/PreviewScreen.tsx
import React from "react";
import { View, Image, Button, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Preview">;

export default function PreviewScreen({ route, navigation }: Props) {
  const { photoUri } = route.params;

  if (!photoUri) {
    Alert.alert("Error", "No photo found");
    navigation.goBack();
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} />
      <View style={styles.buttonRow}>
        <Button title="Retake" onPress={() => navigation.goBack()} />
        <Button
          title="Continue"
          onPress={() => navigation.navigate("Crop", { photoUri })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { flex: 1, resizeMode: "contain" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#111",
  },
});
