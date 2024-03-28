import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Avatar } from "tamagui";

const UserItem = ({ user }: { user: any }) => {
  return (
    <View className="flex-row items-center my-2">
      <Avatar
        circular
        size="$5"
        borderColor={"#e6e6e6"}
        borderWidth="$0.25"
      >
        <Avatar.Image accessibilityLabel="Cam" src={user?.image} />
        <Avatar.Fallback backgroundColor="#d1d1d1" />
      </Avatar>
      <View>
        <Text className="ml-4 font-[500] text-[16px]">{user?.username}</Text>
        <Text className="ml-4 text-neutral-500 text-xs">
          {user?.given_name} {user?.family_name}
        </Text>
      </View>
    </View>
  );
};

export default memo(UserItem);

const styles = StyleSheet.create({});
