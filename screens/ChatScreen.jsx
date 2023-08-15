import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { firestoreDB } from "../config/firebase.config";

const ChatScreen = ({ route }) => {
  const user = useSelector((state) => state.user.user);
  const { room } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      roomId: room._id,
      timeStamp: timeStamp,
      message: message,
      user: user,
    };
    setMessage("");
    await addDoc(
      collection(doc(firestoreDB, "chats", room._id), "messages"),
      _doc
    )
      .then(() => {})
      .catch((err) => alert(err));
  };

  useLayoutEffect(() => {
    const msgQuery = query(
      collection(firestoreDB, "chats", room?._id, "messages"),
      orderBy("timeStamp", "asc")
    );
    const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
      const upMesg = querySnap.docs.map((doc) => doc.data());
      setMessages(upMesg);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);
  return (
    <View className="flex-1">
      <View className="w-full bg-primary px-4 py-6 ">
        <View className=" flex-row items-center justify-between w-full py-10">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" color="#fbfbfb" size={36} />
          </TouchableOpacity>
          <View className="flex-row items-center justify-center space-x-3">
            <View className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
              <FontAwesome5 name="users" color="#fbfbfb" size={24} />
            </View>
            <View>
              <Text className="text-gray-50 text-base font-semibold capitalize">
                {room.chatName.length > 16
                  ? `${room.chatName.slice(0, 16)}...`
                  : room.chatName}{" "}
              </Text>
              <Text className="text-gray-100 text-[12px] capitalize font-semibold">
                Online
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-center space-x-3">
            <TouchableOpacity>
              <FontAwesome5 name="video" size={20} color={"#fbfbfb"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="phone" size={20} color={"#fbfbfb"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={20} color={"#fbfbfb"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-1 w-full bg-white px-4 py-6  rounded-t-[50px] -mt-10">
        <KeyboardAvoidingView
          className="flex-1"
          keyboardVerticalOffset={140}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <>
            <ScrollView>
              {isLoading ? (
                <View className="flex-row items-center justify-center w-full mt-36">
                  <ActivityIndicator size={"large"} color="#43C651" />
                </View>
              ) : (
                <>
                  {messages?.map((msg, i) =>
                    msg.user.providerData.email === user.providerData.email ? (
                      <View className="m-1">
                        <View
                          style={{ alignSelf: "flex-end" }}
                          className="py-2 px-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-primary w-auto relative"
                        >
                          <Text className="text-base text-white font-semibold">
                            {msg.message}
                          </Text>
                        </View>
                        <View style={{ alignSelf: "flex-end" }}>
                          {msg?.timeStamp?.seconds && (
                            <Text className="text-[12px] text-black font-semibold">
                              {new Date(
                                parseInt(msg?.timeStamp?.seconds) * 100
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </Text>
                          )}
                        </View>
                      </View>
                    ) : (
                      <View style={{ alignSelf: "flex-start" }}>
                        <View className="flex items-center justify-center space-x-2">
                          <View className="flex-row items-center justify-center space-x-2">
                            <Image
                              source={{ uri: msg?.user?.profilePic }}
                              className="w-12 h-12 rounded-full"
                            />
                            <View className="m-1 w-[270px]">
                              <View
                                style={{ alignSelf: "flex-start" }}
                                className="py-2 px-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-gray-200 w-auto relative"
                              >
                                <Text className="text-base text-black font-semibold ">
                                  {msg.message}
                                </Text>
                              </View>
                              <View style={{ alignSelf: "flex-start" }}>
                                {msg?.timeStamp?.seconds && (
                                  <Text className="text-[12px] text-black font-semibold">
                                    {new Date(
                                      parseInt(msg?.timeStamp?.seconds) * 100
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    })}
                                  </Text>
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  )}
                </>
              )}
            </ScrollView>
            <View className="w-full flex-row items-center justify-center px-8">
              <View className="bg-gray-200 rounded-2xl px-4 space-x-4 py-2 flex-row items-center justify-center">
                <TouchableOpacity>
                  <Entypo name="emoji-happy" size={20} color={"#555"} />
                </TouchableOpacity>
                <TextInput
                  value={message}
                  className="flex-1 text-base h-8 text-primaryText font-semibold"
                  placeholder="Type Here.."
                  placeholderTextColor="#999"
                  onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity>
                  <Entypo name="mic" size={20} color={"#43C651"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="pl-4" onPress={sendMessage}>
                <FontAwesome name="send" size={20} color={"#555"} />
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
