import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const AddToChatScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [addChat, setAddChat] = useState("");
  const createNewUser = async () => {
    let id = `${Date.now()}`;
    const _doc = {
      _id: id,
      user: user,
      chatName: addChat,
    };
    if (addChat !== "") {
      setDoc(doc(firestoreDB, "chats", id), _doc)
        .then(() => {
          setAddChat("");
          navigation.navigate("Home");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <View className="flex-1">
      <View className="flex-[0.2] bg-primary w-full px-4 py-12">
        <View className=" flex-row items-center justify-between w-full px-3 py-10">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" color="#fbfbfb" size={36} />
          </TouchableOpacity>
          <View className="flex-row items-center justify-center space-x-3">
            <Image
              source={{ uri: user?.profilePic }}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View className="flex-1 w-full bg-white px-4 py-6  rounded-t-[50px] -mt-10">
        <View className="w-full px-4 py-6">
          <View className="w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-primaryText">
            <Ionicons name="chatbubbles" color={"#777"} size={22} />
            <TextInput
              value={addChat}
              onChangeText={(text) => setAddChat(text)}
              placeholder="Create a Chat"
              placeholderTextColor="#999"
              className="ml-3 flex-1 text-base text-primaryText h-12 w-full"
            />
            <TouchableOpacity onPress={createNewUser}>
              <FontAwesome name="send" color={"#777"} size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddToChatScreen;

const styles = StyleSheet.create({});
