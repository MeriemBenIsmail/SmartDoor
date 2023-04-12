import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title, handleNavigate, backgroundColor, textColor,screen,onPress }) => {
  const handlePress = () => {
    handleNavigate(screen);
  };
  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor || "#007AFF",
      padding: 20,
      borderRadius: 40,
      marginTop: 30,
      marginVertical: 10,
    },
    text: {
      color: textColor || "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
