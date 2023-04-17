import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Button from "../UI/Button";
import { Camera } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

export default function HomeScreen({ handleNavigate }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.front);
  let cameraRef = null;
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    async function requestCameraPermission() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    }
    requestCameraPermission();
  }, []);

  const handleClickFaceID = () => {
    setShowCamera(true);
  };

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const handleCameraCapture = async () => {
    if (cameraRef) {
      const capturedPhoto = await cameraRef.takePictureAsync();
      console.log(capturedPhoto.uri);
      const facemeshModel = await facemesh.load(
        facemesh.SupportedPackages.mediapipeFacemesh
      );
      const imageTensor = tf.browser.fromPixels(capturedPhoto);
      const predictions = await facemeshModel.estimateFaces(imageTensor);
      if (predictions.length > 0) {
        const face = predictions[0].scaledMesh;
        const nose = face[4];
        const leftEye = face[362];
        const rightEye = face[263];
        const mouth = face[14];
        console.log(face);
      }
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/wave.png")}
        style={styles.background}
      >
        <View style={styles.content}>
          {showCamera && cameraPermission ? (
            <View style={{ flex: 1 }}>
              <Camera
                ref={(ref) => {
                  cameraRef = ref;
                }}
                style={{ width: width, height: height }}
                type={type}
              >
                <View style={styles.cameraButtonContainer}>
                  <TouchableOpacity onPress={handleCameraCapture}>
                    <Text style={styles.cameraButtonText}>FaceID</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCameraClose}>
                    <Text style={styles.cameraButtonText}>close</Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
          ) : (
            <View>
              <View style={styles.div}>
                <Text style={styles.title}>Face ID</Text>
                <TouchableOpacity onPress={handleClickFaceID}>
                  <Image source={require("../assets/faceID.png")}></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.div}>
                <Text style={styles.title}>Voice Recognition</Text>
                <Image source={require("../assets/voice.png")}></Image>
              </View>
              <View style={styles.div}>
                <Button
                  backgroundColor="#A7AEF9F2"
                  title="RETURN"
                  handleNavigate={handleNavigate}
                  screen="home"
                />
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  div: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 13,
  },
  cameraButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cameraButtonText: {
    color: "#fff",
    fontSize: 23,
    fontWeight: 600,
  },
});
