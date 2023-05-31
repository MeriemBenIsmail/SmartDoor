import React from "react";
import { View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ValidScreen from "./screens/ValidScreen";
import AdminScreen from "./screens/AdminScreen";
import UsersListScreen from "./screens/UsersListScreen";
import HomePageScreen from "./screens/HomePageScreen";
import UploadScreen from "./screens/UploadScreen";
import { firebase } from './config';


const App = () => {
  const [screen, setScreen] = React.useState("homepage");

  const handleNavigate = (nextScreen) => {
    setScreen(nextScreen);
  };
  const loginUser = async (email ,password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      alert(error.message)
    }
  }
  const registerUser = async (email ,password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (userCredential) => {
          // Signed in 
          var user = userCredential.user;
        }
      )
    } catch (error) {
      alert(error.message)
    }
  }
  const renderScreen = () => {
    switch (screen) {
      case "home":
        return (
          <HomeScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("signin")}
          />
        );
      case "signin":
        return (
          <SignInScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("home")}
          />
        );
      
        case "welcome":
        return (
          <WelcomeScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("welcome")}
          />
        );
        case "valid":
        return (
          <ValidScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("valid")}
          />
        );
        case "admin":
        return (
          <AdminScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("admin")}
          />
        );
        case "list":
        return (
          <UsersListScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("list")}
          />
        );
        case "homepage":
        return (
          <HomePageScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("signin")}
          />
        );
        case "upload":
        return (
          <UploadScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("upload")}
          />
        );
      default:
        return (
          <HomePageScreen
          handleNavigate={handleNavigate}
          onNavigate={() => handleNavigate("signin")}
        />
        );
    }
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
};

export default App;
