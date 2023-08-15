import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useState, useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { firestoreAuth } from "../config/firebase.config";
import { SET_USER_NULL } from "../context/actions/userActions";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const logout = async () => {
    await firestoreAuth
      .signOut()
      .then(() => {
        dispatch(SET_USER_NULL());
        navigation.replace("Login");
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <SafeAreaView className="flex-1 items-center justify-start ">
        <View className="w-full flex-row items-center justify-between px-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={30} color={"#555"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color={"#555"} />
          </TouchableOpacity>
        </View>
        <View className="items-center justify-center ">
          <View className="relative border-2 border-primary p-1 rounded-full">
            <Image
              source={{ uri: user?.profilePic }}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </View>
          <Text className="text-xl font-semibold text-primaryBold pt-3">
            {user?.fullName}..
          </Text>
          <Text className="text-xl font-semibold text-primaryText pt-3">
            {user?.providerData.email}..
          </Text>
        </View>
        <View className="w-full flex-row  items-center justify-evenly py-6">
          <View className="items-center justify-center">
            <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
              <MaterialIcons
                name="messenger-outline"
                color={"#555"}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View className="items-center justify-center">
            <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
              <Ionicons name="ios-videocam-outline" color={"#555"} size={24} />
            </TouchableOpacity>
          </View>
          <View className="items-center justify-center">
            <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
              <Ionicons name="call-outline" color={"#555"} size={24} />
            </TouchableOpacity>
          </View>
          <View className="items-center justify-center">
            <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
              <Entypo name="dots-three-horizontal" color={"#555"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity className="w-[350px] rounded-md px-6 py-4 mb-4 flex-row items-center justify-between bg-gray-200">
          <View className="flex-row items-center">
            <MaterialIcons name="security" color={"#555"} size={24} />
            <Text className="text-base font-semibold text-primaryText px-3">
              Privacy
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={30} color={"#555"} />
        </TouchableOpacity>
        <TouchableOpacity className="w-[350px] rounded-md px-6 py-4 flex-row items-center justify-between bg-gray-200 mb-4 ">
          <View className="flex-row items-center">
            <MaterialIcons name="music-note" color={"#555"} size={24} />
            <Text className="text-base font-semibold text-primaryText px-3">
              Media's & Downloads
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={30} color={"#555"} />
        </TouchableOpacity>
        <TouchableOpacity className="w-[350px] rounded-md px-6 py-4 flex-row items-center justify-between bg-gray-200 mb-4 ">
          <View className="flex-row items-center">
            <MaterialIcons name="message" color={"#555"} size={24} />
            <Text className="text-base font-semibold text-primaryText px-3">
              Groups
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={30} color={"#555"} />
        </TouchableOpacity>
        <TouchableOpacity className="w-[350px] rounded-md px-6 py-4 flex-row items-center justify-between bg-gray-200 mb-4 ">
          <View className="flex-row items-center">
            <MaterialIcons name="person" color={"#555"} size={24} />
            <Text className="text-base font-semibold text-primaryText px-3">
              Account
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={30} color={"#555"} />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full px6 py-4 flex-row items-center justify-center"
          onPress={logout}
        >
          <Text className="text-lg font-semibold text-primaryBold px-3">
            Logout
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;

