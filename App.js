import React from "react";
import { View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

const App = () => {
  const [screen, setScreen] = React.useState("home");

  const handleNavigate = (nextScreen) => {
    setScreen(nextScreen);
  };

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
