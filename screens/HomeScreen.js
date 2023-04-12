import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Button from "../UI/Button";

export default function HomeScreen({ handleNavigate }) {
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
            <Button
              title={"UNLOCK NOW"}
              backgroundColor="#FF2C84"
              color="#fff"
            ></Button>
          </View>

          <View style={styles.options}>
            <View style={styles.left}>
              <Text style={styles.header}>Don't have access yet ?</Text>
              <Button
                title={"SIGN UP"}
                screen="signup"
                backgroundColor="#A7AEF9F5"
                handleNavigate={handleNavigate}
                color="#fff"
              ></Button>
            </View>
            <View style={styles.right}>
              <Text style={styles.header}>Are you an admin ?</Text>
              <Button
                screen="signin"
                title={"SIGN IN"}
                backgroundColor="#A7AEF9F5"
                handleNavigate={handleNavigate}
                color="#fff"
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
    marginBottom: 13,
  },
  subtitle: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  left: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 1,
    height: 100,

    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 15,
  },
});
