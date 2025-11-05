// src/screens/CameraScreen.tsx
import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "../../App";

type CameraScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Camera"
>;

export default function CameraScreen() {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const [isReady, setIsReady] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  // Permission loading
  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      navigation.navigate("Preview", { photoUri: photo.uri });
    } catch (err) {
      Alert.alert("Error", "Failed to take photo");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        ref={cameraRef}
        onCameraReady={() => setIsReady(true)}
      />
      <TouchableOpacity
        style={[styles.captureButton, !isReady && { opacity: 0.5 }]}
        disabled={!isReady}
        onPress={takePhoto}
      >
        <Text style={styles.buttonText}>📸</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  permissionText: { fontSize: 16, textAlign: "center", marginBottom: 12 },
  permissionButton: {
    backgroundColor: "#1e88e5",
    padding: 12,
    borderRadius: 8,
  },
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontSize: 28 },
});
