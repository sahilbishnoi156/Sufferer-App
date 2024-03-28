import {
  BackHandler,
  ColorSchemeName,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  useColorScheme,
} from "react-native";
import React from "react";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { Text, View } from "tamagui";
import { Link, router } from "expo-router";

const message = () => {
  const colorScheme = useColorScheme();

  return (
    <View className="bg-white flex-1 dark:bg-black">
      <StatusBar backgroundColor={colorScheme !== "dark" ? "white" : "black"} />
      <MainPageHeader colorScheme={colorScheme} />
      <Text>Message</Text>
    </View>
  );
};

export default message;

const MainPageHeader = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <View className="flex-row w-full justify-between p-4 items-center">
      <View className="flex-row items-center">
        <FontAwesome6Icon
          name="arrow-left-long"
          size={20}
          color={colorScheme === "dark" ? "white" : "black"}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
        />
        <Text className="ml-7 text-xl">s.ahilbishnoi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
