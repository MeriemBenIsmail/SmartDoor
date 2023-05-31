import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Button from "../UI/Button";

export default function HomePageScreen({ handleNavigate }) {
  return (
    <>
      <ImageBackground
        source={require("../assets/wave.png")}
        style={styles.background}
      >
        <View style={styles.content}>
          <View style={styles.wrapper}>
            <Text style={styles.title}>Welcome to Smart Door</Text>
            <Image source={require("../assets/home.png")}></Image>
            <View style={{marginTop:90}}>
            <Button
              title={"SIGN IN"}
              backgroundColor="#FF2C84"
              color="#fff"
              screen="signin"
              handleNavigate={handleNavigate}
            ></Button>
            </View>
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
  content: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: { padding: 50, paddingTop: 100 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 19,
    marginTop: 50
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  header: {
    textAlign: "center",
    fontSize: 15,
  },
});
