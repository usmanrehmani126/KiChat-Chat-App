import {
  ActivityIndicator,
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
import { avatars } from "../utlis/helpers";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestoreAuth, firestoreDB } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isAvatarMenu, setIsAvatarMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
  const screenWidth = Math.round(Dimensions.get("screen").width);
  const screenHeight = Math.round(Dimensions.get("screen").height);
  const itemAvatarHandler = (item) => {
    setAvatar(item?.image.asset.url);
    setIsAvatarMenu(false);
  };

  const handleRegisterMethod = async () => {
    if (getEmailValidationStatus && email !== "") {
      setIsLoading(true);
      await createUserWithEmailAndPassword(firestoreAuth, email, password).then(
        (userCred) => {
          const data = {
            _id: userCred?.user.uid,
            fullName: name,
            profilePic: avatar,
            providerData: userCred.user.providerData[0],
          };
          setDoc(doc(firestoreDB, "users", userCred?.user.uid), data).then(
            () => {
              navigation.navigate("Home");
              setIsLoading(false);
            }
          );
        }
      );
    }
  };
  return (
<ScrollView>
<View className="flex-1 items-center justify-start">
      {isLoading ? (
        <View className="flex-row items-center justify-center mt-80">
          <ActivityIndicator size="large" color="#43C651" />
        </View>
      ) : (
        <>
          <Image
            source={require("../assets/bg.png")}
            className="h-96"
            style={{ width: screenWidth }}
          />
          {isAvatarMenu && (
            <>
              {/* List of Avatars Images */}
              <View
                className="absolute z-10 inset-0"
                style={{ width: screenWidth, height: screenHeight }}
              >
                <ScrollView>
                  <BlurView
                    className="w-full h-full px-4 py-12 flex-row flex-wrap items-center justify-evenly"
                    intensity={60}
                    tint="light"
                    style={{ width: screenWidth, height: screenHeight }}
                  >
                    {avatars.map((item) => (
                      <TouchableOpacity
                        onPress={() => itemAvatarHandler(item)}
                        key={item._id}
                        className="w-20 m-3 h-20 p-1 rounded-full border-2 border-primary relative"
                      >
                        <Image
                          source={{ uri: item?.image.asset.url }}
                          className="w-full h-full"
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ))}
                  </BlurView>
                </ScrollView>
              </View>
            </>
          )}
          {/* Main View */}
          <View className="w-full h-full rounded-tl-[90px] bg-white -mt-56 flex items-center justify-start py-2 px-6 space-y-8">
            <Image
              source={require("../assets/logo.png")}
              className="h-16 w-16"
              resizeMode="contain"
            />
            <Text className="text-primaryText text-xl font-semibold py-2">
              Join with us!
            </Text>

            {/* avator section */}
            <View className="w-full flex items-center justify-center relative ">
              <TouchableOpacity
                onPress={() => setIsAvatarMenu(true)}
                className="w-20 h-20 p-1 rounded-full border-2 border-primary relative"
              >
                <Image
                  source={{ uri: avatar }}
                  className="w-full h-full "
                  resizeMode="contain"
                />
                <View className="w-6 h-6 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-center">
                  <MaterialIcons name="edit" size={18} color={"#fff"} />
                </View>
              </TouchableOpacity>
            </View>
            {/* Name Field */}
            <UserTextInput
              placeholder="Full Name"
              isPass={false}
              setStateValue={setName}
            />
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
              onPress={handleRegisterMethod}
              className="w-full px-4 rounded-xl bg-primary my-3 flex items-center justify-center"
            >
              <Text className="text-white py-2 text-xl font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
            <View className="w-full flex-row items-center justify-center space-x-2">
              <Text className="text-base text-primary">Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-base text-primaryBold font-semibold">
                  Login Here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
</ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
