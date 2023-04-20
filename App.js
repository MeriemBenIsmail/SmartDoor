import React from "react";
import { View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { authentication, db } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { collection, getDoc } from "firebase/firestore";


const App = () => {
  const [screen, setScreen] = React.useState("home");

  const handleNavigate = (nextScreen) => {
    setScreen(nextScreen);
  };
  const registerUser = async (email ,password, fullname) => {
    try {
      createUserWithEmailAndPassword(authentication, email, password).then((res) => {
        setDoc(doc(db, "Users", authentication.currentUser.uid), {
          fullname,
          email,
          });
      })
    }catch (error) {
      alert(error.message)
    }
  }
  const loginUser = async (email ,password) => {
    try {
      signInWithEmailAndPassword(authentication, email, password).then(async (res) => {
        const uid = authentication.currentUser.uid;
        const docRef = await doc(db, "Users", uid);
        const docSnap = await getDoc(docRef);
        // log user additional info for the moment 
        console.log(docSnap.data())
      })
    } catch (error) {
      alert(error.message)
    }
  }
  const getCurrentUserInfo = () => {
    const userID = authentication.currentUser.uid;
    const docRef = doc(db, "Users", userID);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        //log user additional info for the moment
        console.log(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });
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
            signIn={loginUser}
          />
        );
      case "signup":
        return (
          <SignUpScreen
            handleNavigate={handleNavigate}
            onNavigate={() => handleNavigate("signup")}
            signUp={registerUser}
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
