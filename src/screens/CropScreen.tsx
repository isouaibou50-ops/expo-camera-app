import React from "react";
import { View, StyleSheet, Image, Button, Dimensions, Alert } from "react-native";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = NativeStackScreenProps<RootStackParamList, "Crop">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CropScreen({ route, navigation }: Props) {
  const { photoUri } = route.params;

  // Shared values
  const boxX = useSharedValue(50);
  const boxY = useSharedValue(100);
  const boxWidth = useSharedValue(200);
  const boxHeight = useSharedValue(200);

  // Drag crop box
  const onDragBox = (event: PanGestureHandlerGestureEvent) => {
    boxX.value = withTiming(boxX.value + event.nativeEvent.translationX);
    boxY.value = withTiming(boxY.value + event.nativeEvent.translationY);
  };

  // Drag handle (bottom-right) to resize
  const onResizeHandle = (event: PanGestureHandlerGestureEvent) => {
    boxWidth.value = withTiming(boxWidth.value + event.nativeEvent.translationX);
    boxHeight.value = withTiming(boxHeight.value + event.nativeEvent.translationY);
  };

  const animatedBoxStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: boxX.value,
    top: boxY.value,
    width: boxWidth.value,
    height: boxHeight.value,
    borderWidth: 2,
    borderColor: "#00ff00",
    backgroundColor: "rgba(0,255,0,0.2)",
  }));

  const animatedHandleStyle = useAnimatedStyle(() => ({
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#00ff00",
    borderRadius: 4,
    left: boxX.value + boxWidth.value - 10, // center the handle
    top: boxY.value + boxHeight.value - 10,
  }));

  const cropImage = async () => {
    try {
      const crop = {
        originX: boxX.value,
        originY: boxY.value,
        width: boxWidth.value,
        height: boxHeight.value,
      };
      const result = await manipulateAsync(photoUri, [{ crop }], {
        compress: 1,
        format: SaveFormat.JPEG,
      });
      Alert.alert("Success", "Image cropped!");
      console.log("Cropped URI:", result.uri);
    } catch (err) {
      Alert.alert("Error", "Failed to crop image");
      console.error(err);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.image} />
        
        {/* Draggable crop box */}
        <PanGestureHandler onGestureEvent={onDragBox}>
          <Animated.View style={animatedBoxStyle} />
        </PanGestureHandler>

        {/* Resizable handle */}
        <PanGestureHandler onGestureEvent={onResizeHandle}>
          <Animated.View style={animatedHandleStyle} />
        </PanGestureHandler>

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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#111",
  },
});
