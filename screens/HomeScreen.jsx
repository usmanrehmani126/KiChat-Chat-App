import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const HomeScreen = () => {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);
  useLayoutEffect(() => {
    const chatQuery = query(
      collection(firestoreDB, "chats"),
      orderBy("_id", "desc")
    );
    const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      <SafeAreaView className="">
        {/* Top Sction */}
        <View className="flex-row items-center justify-between  py-2 mt-8 px-6">
          <Image
            source={require("../assets/logo.png")}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <TouchableOpacity
            className="w-12 h-12 rounded-full border border-primary flex items-center justify-center"
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Image
              source={{ uri: user?.profilePic }}
              className="w-full h-full"
            />
          </TouchableOpacity>
        </View>
        <ScrollView className="w-full px-3 pt-3">
          <View className="flex-row items-center justify-between w-full px-2">
            <Text className="text-primaryText text-base font-extrabold ">
              Messages
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddToChatScreen")}
            >
              <Ionicons name="chatbox" size={26} color="#555" />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <View className="flex-row items-center justify-center w-full mt-52">
              <ActivityIndicator size={"large"} color="#43C651" />
            </View>
          ) : (
            <>
              {chats && chats.length > 0 ? (
                <>
                  {chats?.map((room) => (
                    <MessageCards room={room} key={room._id} />
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const MessageCards = ({ room }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatScreen", { room: room })}
      className="w-full flex-row items-center justify-start py-2 mb-4"
    >
      <View className="w-14 h-14 rounded-full border-2 p-1 border-primary flex items-center justify-center">
        <FontAwesome5 name="users" size={22} color="#555" />
      </View>
      <View className="flex-1 flex items-start justify-center ml-3">
        <Text className="text-[#333]  font-semibold capitalize text-base">
          {room?.chatName}
        </Text>
        <Text className="text-primaryText text-sm">
          Hey Guys how are your ....
        </Text>
      </View>
      <Text className="text-primary px-2 text-base font-semibold">
        27 min ago
      </Text>
    </TouchableOpacity>
  );
};
