import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { memo, useCallback, useMemo, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useQueryClient } from "@tanstack/react-query";

const SettingSheet = () => {
  const sheetRef = useRef<BottomSheetModal>(null);
  //* variables
  const snapPoints = useMemo(() => ["47%", "47%"], []);
  const color = useColorScheme() === "dark" ? "white" : "black";
  const backgroundColor = useColorScheme() === "dark" ? "dark" : "white";

  //! Backdrop Component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={"close"}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );
  return (
    <>
      <Ionicons
        name="menu"
        size={25}
        color={color}
        onPress={() => sheetRef?.current?.present()}
      />
      <BottomSheetModal
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView
          style={{ backgroundColor: backgroundColor, height: "100%" }}
        >
          <Options />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default memo(SettingSheet);

const Options = () => {
  const rowStyle = `flex-row py-2 gap-5 items-center`;
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const hanldeLogout = async () => {
    console.log("loggedOut");
    setIsLoggingOut(true);
    try {
      const response = await fetch(
        "http://192.168.3.72:3000/api/auth/signOut",
        { method: "DELETE" }
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      await queryClient.invalidateQueries({ queryKey: ["authentication"] });
    } catch (error) {
      console.log(error);
    }
    setIsLoggingOut(false);
  };
  return (
    <View pointerEvents={isLoggingOut ? "none" : "auto"}>
      <View className="p-4">
        <Text className="font-bold text-neutral-400">Your activity</Text>
        <View className={rowStyle}>
          <Ionicons name="heart-outline" size={25} />
          <Text className="text-lg">Liked</Text>
        </View>
        <View className={rowStyle}>
          <Ionicons name="bookmark-outline" size={25} />
          <Text className="text-lg">Saved</Text>
        </View>
      </View>
      <View className="p-4 border-y-[8px] border-y-neutral-200">
        <Text className="font-bold text-neutral-400">User privacy</Text>
        <View className={rowStyle}>
          <Ionicons name="settings-outline" size={25} />
          <Text className="text-lg">Settings</Text>
        </View>
        <View className={rowStyle}>
          <Ionicons name="bookmark-outline" size={25} />
          <Text className="text-lg">Saved</Text>
        </View>
      </View>
      <View className="flex-row p-4 items-center">
        <Pressable onPress={hanldeLogout} className="flex-row">
          <Text className="text-red-600 text-lg mr-2">
            {isLoggingOut ? "Logging out" : "Logout"}
          </Text>
          {!!isLoggingOut && <ActivityIndicator color={"red"} />}
        </Pressable>
      </View>
    </View>
  );
};
