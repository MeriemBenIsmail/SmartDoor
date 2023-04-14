import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import SignInForm from "../forms/SignInForm";
export default function SignInScreen({ handleNavigate }) {
  const reroute = () => {
    handleNavigate('signup')
  }
  return (
    <>
      <ImageBackground
        source={require("../assets/signup.png")}
        style={styles.background}
      >
          <View style={styles.content}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={require("../assets/signuppic.png")}></Image>
            </View>

            <View style={styles.form}>
              <Text style={styles.title}>SIGN IN</Text>
              <SignInForm handleNavigate={handleNavigate}></SignInForm>
              <Text style={styles.note}>No Account ? <Text onPress={reroute} style={{color:"#A7AEF9F5",fontWeight:"700"}}>SIGN UP</Text></Text>
            </View>
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
