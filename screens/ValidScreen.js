import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../UI/Button";

export default function ValidScreen({ handleNavigate }) {
return (
<>
<View style={styles.content}>
<Image source={require("../assets/set.png") } style={styles.image}></Image>
 <Text style={styles.title} >You are now allowed to unlock the door !</Text>
<Button
title={"GET STARTED"}
backgroundColor="#FF2C84"
color="#fff"
screen="welcome"
handleNavigate={handleNavigate}
></Button>
</View>

</>
);
}

const styles = StyleSheet.create({
content: {
flex: 1,
justifyContent: "center",
alignItems: "center",
},
image: {
marginTop: -100,
width: 250,
height: 250,
},
title: {
textAlign:"center",
marginTop: 20,
padding: 30,
fontSize: 30,
fontWeight: "bold",
width: 340,
},
});

