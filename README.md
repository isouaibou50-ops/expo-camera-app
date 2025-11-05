# Expo Question Capture App

## Overview
This project implements the **AI Study Companion / Brainly style camera flow**:

1. Open camera and capture photo
2. Preview captured photo
3. Select a question using a draggable and resizable rectangle
4. Crop the question region
5. Preview cropped question with Retake or Confirm

## Tech Stack
- Expo SDK 52
- React Native + TypeScript
- react-native-gesture-handler
- react-native-reanimated
- expo-image-manipulator

## How to Run Locally
1. Clone the repo
2. Run `npm install` or `yarn`
3. Start Expo: `npx expo start`
4. Open on **iOS Simulator, Android Emulator, or real device**

## Decisions and Tradeoffs
- Used a single resizable rectangle per task requirement
- Bottom-right handle allows resizing; box is draggable
- Used `expo-image-manipulator` to crop image directly
- Focused on smooth UI and basic ergonomics

## Known Limitations
- Only one resize handle (bottom-right)
- Crop box not constrained to image bounds
- Confirm action is placeholder (task did not specify backend)
