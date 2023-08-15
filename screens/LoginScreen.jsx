import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import UserTextInput from "../components/UserTextInput";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firestoreAuth, firestoreDB } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const screenWidth = Math.round(Dimensions.get("window").width);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const handleLoginFunction = async () => {
    setIsLoading(true);
    if (getEmailValidationStatus && email !== "") {
      await signInWithEmailAndPassword(firestoreAuth, email, password)
        .then((userCred) => {
          if (userCred) {
            getDoc(doc(firestoreDB, "users", userCred?.user.uid)).then(
              (docSnap) => {
                if (docSnap.exists()) {
                  dispatch(SET_USER(docSnap.data()));
                }
              }
            );
          }
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.message.includes("wrong-password")) {
            setAlert(true);
            setAlertMessage("Passwords do not match");
          } else if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMessage("User not found");
          } else {
            setAlert(true);
            setAlertMessage("Invalid Email Address");
          }
          setInterval(() => {
            setAlert(false);
          }, 3000);
        });
    }
  };
  return (
   <ScrollView>
     <View className="flex-1 items-center justify-start">
      {/* Main View */}

      {isLoading ? (
        <View className="flex-row items-center justify-center mt-40">
          <ActivityIndicator size={"large"} color="#43C651" />
        </View>
      ) : (
        <>
          <Image
            source={require("../assets/bg.png")}
            className="h-96"
            style={{ width: screenWidth }}
          />

          <>
          <View className="w-full h-full rounded-tl-[90px] bg-white -mt-44 flex items-center justify-start py-8 px-6 space-y-6">
            <Image
              source={require("../assets/logo.png")}
              className="h-16 w-16"
              resizeMode="contain"
            />
            <Text className="text-primaryText text-xl font-semibold py-2">
              Welcome Back!
            </Text>
            {alert && (
              <Text className="text-base text-red-600">{alertMessage}</Text>
            )}

            {/* Email Field */}
            <UserTextInput
              placeholder="Email"
              isPass={false}
              setStateValue={setEmail}
              setGetEmailValidationStatus={setGetEmailValidationStatus}
            />
            {/* Password Field */}
            <UserTextInput
              placeholder="Password"
              isPass={true}
              setStateValue={setPassword}
            />
            {/* Login Button*/}

            <TouchableOpacity
              className="w-full px-4 rounded-xl bg-primary my-3 flex items-center justify-center"
              onPress={handleLoginFunction}
            >
              <Text className="text-white py-2 text-xl font-semibold">
                Sign In
              </Text>
            </TouchableOpacity>
            <View className="w-full flex-row items-center justify-center space-x-2">
              <Text className="text-base text-primary">
                Don't have an Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className="text-base text-primaryBold font-semibold">
                  Create Here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </>
        </>
      )}
    </View>
   </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
