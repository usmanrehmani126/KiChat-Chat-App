import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const UserTextInput = ({
  placeholder,
  setStateValue,
  isPass,
  setGetEmailValidationStatus,
}) => {
  const [value, setValue] = useState("");
  const [showPassIcon, setShowPassIcon] = useState(true);
  const [icons, setIcons] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(false);

  useLayoutEffect(() => {
    switch (placeholder) {
      case "Full Name":
        return setIcons("person");
      case "Email":
        return setIcons("email");
      case "Password":
        return setIcons("lock");
    }
  }, []);

  const handleChangeText = (text) => {
    setValue(text);
    setStateValue(value);
    if (placeholder === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = emailRegex.test(value);
      setIsValidEmail(status);
      setGetEmailValidationStatus(status);
    }
  };
  return (
    <>
      <View
        className={`border rounded-2xl px-4 py-3 flex-row items-center justify-between space-x-4 my-2 ${
          !isValidEmail && placeholder === "Email" && value.length > 0
            ? "border-red-600"
            : "border-gray-200"
        }`}
      >
        <MaterialIcons name={icons} size={24} color={"#6c6d83"} />
        <TextInput
          className="flex-1 text-base text-primaryText font-semibold"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={isPass && showPassIcon}
          autoCapitalize="none"
        />
        {isPass && (
          <TouchableOpacity onPress={() => setShowPassIcon(!showPassIcon)}>
            <Entypo
              name={`${showPassIcon ? "eye" : "eye-with-line"}`}
              color={"#6c6d83"}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default UserTextInput;

const styles = StyleSheet.create({});
