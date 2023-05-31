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



export default function UploadScreen({ handleNavigate }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhotoUri, setCapturedPhotoUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  let cameraRef = null;
  const { width, height } = Dimensions.get("window");
  const [recording, setRecording] = useState(null);
  const [stoprecord, setStoprecord] = useState(false);


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
  const handleRetakePicture = () => {
    setCapturedPhotoUri(null);
  };
  
  const handleCameraCapture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setI(1);
      setCapturedPhotoUri(uri);
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
  const handleUploadPicture = () => {
    console.log(capturedPhotoUri);
    
    const data = new FormData();
    data.append('file', {
      uri: capturedPhotoUri,
      type: 'image/jpeg',
      name: 'photo.jpg'
    });
  };
  const handleRestartRecording = () => {
    setStoprecord(false);
    setRecording(null);
  };

  const handleStopRecording = async () => {
    try {
      console.log(recording);

      await recording.stopAndUnloadAsync();
      const uri = recording._uri;
      setRecording(null);
      console.log('Recording stopped');
      console.log(uri);
      setStoprecord(true);
   
  } catch (error) {
    console.error('Failed to stop recording', error);
  }
  };
  const handleUploadRecording = () => {
    handleNavigate("valid");
   
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
                {!capturedPhotoUri ? (
                    <TouchableOpacity onPress={handleCameraCapture}>
                      <Text style={styles.cameraButtonText}>take pic</Text>
                    </TouchableOpacity>
                  ) : (

                    <><TouchableOpacity onPress={handleRetakePicture}>
                        <Text style={styles.cameraButtonText}>retake pic</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleUploadPicture}>
                          <Text style={styles.cameraButtonText}>Upload</Text>
                      </TouchableOpacity></>
                    
                  )}
                  
                  <TouchableOpacity
                    onPress={handleCameraClose}
                  >
                    <Text style={styles.cameraButtonText}>close</Text>
                  </TouchableOpacity>
                </View>
                {capturedPhotoUri && (
                <Image
                   source={{ uri: capturedPhotoUri }}
                   style={{ width: width, height: height }}
                 />
                  )}

              </Camera>
             
            </View>
          ) : (
            <View>
              <View style={styles.div}>
                <Text style={styles.title}>Upload photo</Text>
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
                <TouchableOpacity onPress={handleStopRecording} style={styles.bouton}>
                  <Text>Stop Recording</Text>
                 </TouchableOpacity>
                 )}
                 { stoprecord && (
                  <>
                  <View style={styles.voice}>
                  <TouchableOpacity onPress={handleUploadRecording} style={styles.bouton}>
                   <Text>Upload</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleRestartRecording} style={styles.bouton}>
                   <Text>RETRY</Text>
                  </TouchableOpacity>
                  </View>
                  </>
                   
                  )

                 }
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
  voice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
  },
  bouton: {
    backgroundColor: "#A7AEF9F2",
    padding: 20,
    borderRadius: 40,
    marginTop: 30,
    marginVertical: 10,
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