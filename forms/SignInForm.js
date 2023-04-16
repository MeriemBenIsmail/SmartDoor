import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import Button from "../UI/Button";

const SignInForm = ({handleNavigate}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
    console.log(`Name: ${name}\nEmail: ${email}\n`);
  };
   

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fullname</Text>
          <TextInput style={styles.input} onChangeText={setName} value={name} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input]}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View style={styles.btns}>
          <Button backgroundColor="#FF2C84" title="Return" handleNavigate={handleNavigate} screen="home"/>
          <Button backgroundColor="#FF2C84" title="Next" onPress={handleSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 40,

    paddingHorizontal: 10,
  },
  messageInput: {
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
  },
  btns :{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap:40,
  }
});

export default SignInForm;
