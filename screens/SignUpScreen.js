import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import SignUpForm from "../forms/SignUpForm";
export default function SignInScreen({ handleNavigate }) {
  const reroute = () => {
    handleNavigate('signin')
  }
  return (
    <>
      <ImageBackground
        source={require("../assets/signup.png")}
        style={styles.background}
      >
        <ImageBackground
          source={require("../assets/signup1.png")}
          style={styles.background1}
        >
          <View style={styles.content}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={require("../assets/signuppic.png")}></Image>
            </View>

            <View style={styles.form}>
              <Text style={styles.title}>SIGN UP</Text>
              <SignUpForm handleNavigate={handleNavigate}></SignUpForm>
              <Text style={styles.note}>Already have an account ? <Text onPress={reroute} style={{color:"#A7AEF9F5",fontWeight:"700"}}>SIGN IN</Text></Text>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  background1: {
    flex: 1,
    marginTop: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  form: {
    marginTop: -20,
    zIndex: -1,
    backgroundColor: "#fff",
    padding: 20,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1E1E1EB0",
  },
});
