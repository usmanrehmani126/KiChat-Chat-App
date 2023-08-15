import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { firestoreAuth, firestoreDB } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { SET_USER } from "../context/actions/userActions";
import { useDispatch } from "react-redux";

const SplashScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    checkUserLoggedIn();
  }, []);
  const checkUserLoggedIn = () => {
    firestoreAuth.onAuthStateChanged((userCred) => {
      if (userCred?.uid) {
        getDoc(doc(firestoreDB, "users", userCred?.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            dispatch(SET_USER(docSnap.data()));
            setTimeout(() => {
              navigation.navigate("Home");
            }, 3000);
          }
        });
      } else {
        navigation.replace("Login");
      }
    });
  };
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Image
        source={require("../assets/contact.png")}
        className="w-full h-[500px]"
        resizeMode="contain"
      />
      <View style={{ paddingLeft: 8, paddingRight: 8 }} className="-mt-12">
        <Text className="text-5xl font-bold text-black tracking-wider">
          Express your self with Moji{" "}
          <Text className="text-6xl text-primary">Experiances</Text>
        </Text>
       
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
