import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Button from "../UI/Button";


export default function AdminScreen({ handleNavigate }) {
  const reroute = () => {
    handleNavigate('home')
  }
  return (
    <>
      <ImageBackground
        source={require("../assets/wave.png")}
        style={styles.background}
      >
        <ImageBackground
          source={require("../assets/wave.png")}
          style={{marginTop:-300}}
        >
            <View style={styles.content}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>You are logged as an admin</Text>
                    <Button
                        title={"UNLOCK NOW"}
                        backgroundColor="#A7AEF9F5"
                        color="#fff"
                        screen="welcome"
                        handleNavigate={handleNavigate}
                    ></Button>
                     <Button
                        title={"USERS LIST"}
                        backgroundColor="#A7AEF9F5"
                        color="#fff"
                        screen="list"
                        handleNavigate={handleNavigate}
                    ></Button>
                </View>
                <View style={styles.left}>
                  <Text onPress={reroute} style={{color:"#FF2C84",fontWeight:"700"}}> QUIT</Text>
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
      marginTop: -300,
       
    },
    content: {
      marginTop: 400,

        alignItems: "center",
    },
    wrapper: {
        marginTop: 100,
        alignItems: "center",
    },
    title: {
        color: "#fff",
        textAlign: "center",
        marginTop: 20,
        padding: 30,
        fontSize: 30,
        fontWeight: "bold",
        width: 340,
    },
    left: {
      position: "absolute",
      top: 700,
      left: 0,
      padding: 20,
    },
});