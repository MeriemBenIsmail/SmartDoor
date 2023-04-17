import React from "react";
import { View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { firebase } from './config';


const App = () => {
  const [screen, setScreen] = React.useState("home");

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
      case "signup":
        return (
          <SignUpScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("signup")}
          />
        );
        case "welcome":
        return (
          <WelcomeScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("welcome")}
          />
        );
      default:
        return (
          <HomeScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("signin")}
          />
        );
    }
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
};

export default App;
