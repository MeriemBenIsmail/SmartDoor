import React, { useState, useEffect} from 'react';
import { View, Text, FlatList,StyleSheet,ImageBackground } from 'react-native';
import Button from "../UI/Button";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/firestore';

export default function UsersListScreen({ handleNavigate }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('Users').onSnapshot(querySnapshot => {
      const users = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      });
      setUsers(users);

    });

    return unsubscribe;
  }, []);
  
  return (
    <>
    <ImageBackground
      source={require("../assets/wave.png")}
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.title}> Users List :</Text>
      <FlatList style={styles.list}
        data={users}
        renderItem={({ item }) => 
        <View style={styles.itemContainer}>
        <Text style={styles.text}>{item.fullname}</Text>
      </View>}
        keyExtractor={(item) => item.id}
      />
    </View>
    <View style={styles.centre}>
    <Button
      title={"RETURN"}
      backgroundColor="#A7AEF9F5"
      color="#fff"
      screen="admin"
      handleNavigate={handleNavigate} >  
    </Button>
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
  container: {
    flex: 1,
    marginTop: 50,
  },
  list: {
    
    marginTop: 20,
    padding:50,
    
    
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "normal",
    color: "black",

  },
  itemContainer: {
    width: 300,
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    padding: 10,
    marginBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E1E1EB0",
    marginTop: 70,
    marginLeft: 50,
  },
  centre: {
    marginBottom: 50,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});