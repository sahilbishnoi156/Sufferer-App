import { View, ActivityIndicator, useColorScheme } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { Text } from "tamagui";

const index = () => {
  const { isLoggedIn, loading, error } = useAuth();
  const colorScheme = useColorScheme();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        }}
      >
        <Text>Something Went Wrong</Text>
        <Text>Please restart the application</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return <Redirect href={"/user/(main)/"} />;
};

export default index;
