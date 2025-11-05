import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "./screens/CameraScreen";
import PreviewScreen from "./screens/PreviewScreen";
import CroppedPreviewScreen from "./screens/CroppedPreviewScreen";

export type RootStackParamList = {
  Camera: undefined;
  Preview: { photoUri: string };
  Crop: { photoUri: string };
  CroppedPreview: { croppedUri: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: "Take Photo" }}
        />
        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
          options={{ title: "Preview" }}
        />
        <Stack.Screen name="CroppedPreview" component={CroppedPreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
