import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Button from "../UI/Button";
import { Camera } from "expo-camera";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen({ handleNavigate }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.front);
  let cameraRef = null;
  const { width, height } = Dimensions.get("window");
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    async function requestCameraPermission() {
      const { status } = await Camera.requestPermissionsAsync();
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
      const photo = await cameraRef.takePictureAsync();
  
      // Create a new FormData object
      const formData = new FormData();
      
      // Append the file and filename to the FormData object
      formData.append('file', {
        uri: photo.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
      formData.append('filename', 'nochnoch');
      console.log("sent request")
      // Make the POST request to the backend endpoint
      fetch('https://06ff-197-31-159-85.ngrok-free.app/photo/recognize', { 
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => response.text())
        .then(result => {
          console.log(result); // Handle the response from the backend
        })
        .catch(error => {
          console.error(error); // Handle any errors that occur during the request
        });
    }
  };

  const handleStartRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
  
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
      //console.log(recording);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

    
  const handleStopRecording = async () => {
    console.log("*******************************")
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      
  
      // Read the audio file as a byte array using FileSystem
      const fileUri = FileSystem.documentDirectory + 'recording.wav';
      await FileSystem.copyAsync({ from: uri, to: fileUri });
      console.log(fileUri)
      const fileArray = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // Create a blob object from the byte array
      const blob = new Blob([fileArray], { type: 'audio/wav' });
  
      const formData = new FormData();
    // Append the blob object to the FormData object
    const fileData = `data:audio/wav;base64,${fileArray}`;
    //formData.append('audio', fileData);
    formData.append('audio', {
      uri: fileUri,
      name: fileData,
      type: 'audio/wav',
    });
    formData.append('filename', 'meriem');
      fetch('https://6e6a-197-31-159-85.ngrok-free.app/audio/recognize', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.text())
      .then(result => {
        console.log(result); // Handle the response from the backend
      })
      .catch(error => {
        console.error(error); // Handle any errors that occur during the request
      });
  }catch (error) {
    console.error('Failed to stop recording', error);
  }
}

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
                  <TouchableOpacity
                    onPress={handleCameraCapture}
                  >
                    <Text style={styles.cameraButtonText}>FaceID</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCameraClose}
                  >
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
              <TouchableOpacity onPress={handleStartRecording}>
                <Image source={require("../assets/voice.png")}></Image>
              </TouchableOpacity>
              {recording && (
              <TouchableOpacity onPress={handleStopRecording}>
                <Text>Stop Recording</Text>
               </TouchableOpacity>
               )}
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
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20
  },
  cameraButtonText: {
    color:"#fff",
    fontSize:23,
    fontWeight:600
  }
});
