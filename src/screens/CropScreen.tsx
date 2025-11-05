import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { PanGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "Crop">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CropScreen({ route, navigation }: Props) {
  const { photoUri } = route.params;

  const [cropBox, setCropBox] = useState({
    x: 50,
    y: 100,
    width: 200,
    height: 200,
  });

  const cropImage = async () => {
    try {
      const result = await manipulateAsync(
        photoUri,
        [
          {
            crop: {
              originX: cropBox.x,
              originY: cropBox.y,
              width: cropBox.width,
              height: cropBox.height,
            },
          },
        ],
        { compress: 1, format: SaveFormat.JPEG }
      );
      Alert.alert("Success", "Image cropped!");
      console.log("Cropped URI:", result.uri);
      // TODO: Navigate forward or save
    } catch (err) {
      Alert.alert("Error", "Failed to crop image");
      console.error(err);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.image} />
        <View
          style={[
            styles.cropBox,
            {
              left: cropBox.x,
              top: cropBox.y,
              width: cropBox.width,
              height: cropBox.height,
            },
          ]}
        />
        <View style={styles.buttons}>
          <Button title="Crop" onPress={cropImage} />
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { flex: 1, resizeMode: "contain" },
  cropBox: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#00ff00",
    backgroundColor: "rgba(0,255,0,0.2)",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#111",
  },
});
