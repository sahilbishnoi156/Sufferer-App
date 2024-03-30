import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";

const _layout = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href={"/"} />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="userprofile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
