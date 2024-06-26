import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Avatar, Button, Paragraph } from "tamagui";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { usePost } from "../../providers/PostProvider";

//! COmponent Types
interface Props {}
type Ref = BottomSheetModal;

const PostInfoSheet = forwardRef<Ref, Props>((props, ref) => {
  const { postData} = usePost();

  //* variables
  const snapPoints = useMemo(() => ["47%", "47%"], []);
  const color = useColorScheme() === "dark" ? "white" : "black";
  const backgroundColor = useColorScheme() === "dark" ? "dark" : "white";

  //! Footer Component
  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props}>
        <OptionButtons />
      </BottomSheetFooter>
    ),
    []
  );

  //! Backdrop Component
  // renders
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
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      footerComponent={renderFooter}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView
        style={{ backgroundColor: backgroundColor, height: "100%" }}
      >
        <CreaterSection creator={postData?.creator} />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default PostInfoSheet;

const styles = StyleSheet.create({});

const OptionButtons = () => {
  return (
    <View className="flex-row px-6 py-4 pt-2 bg-white dark:bg-black">
      <View className="mr-7 items-center">
        <Button
          icon={<Icon name="bookmark-o" size={25} />}
          circular
          size={"$6"}
          pressStyle={{ scale: 0.9 }}
        />
        <Text className="text-xs mt-2 text-black dark:text-white ">Save</Text>
      </View>
      <View className="mr-7 items-center">
        <Button
          icon={<Feather name="copy" size={25} />}
          circular
          size={"$6"}
          pressStyle={{ scale: 0.9 }}
        />
        <Text className="text-xs mt-2 text-black dark:text-white">
          Copy link
        </Text>
      </View>
      <View className="mr-7 items-center">
        <Button
          icon={<FontAwesome6Icon name="signs-post" size={25} />}
          circular
          size={"$6"}
          pressStyle={{ scale: 0.9 }}
        />
        <Text className="text-xs mt-2 text-black dark:text-white">
          Go to post
        </Text>
      </View>
      <View className="mr-7 items-center">
        <Button
          icon={<Feather name="flag" size={25} color={"#ff5959"} />}
          circular
          size={"$6"}
          pressStyle={{ scale: 0.9, borderColor: "#ff5959", borderWidth: 0.2 }}
        />
        <Text className="text-xs mt-2 text-[#ff5959]">Report post</Text>
      </View>
    </View>
  );
};

const CreaterSection = ({ creator }: any) => {
  return (
    <View className="mt-5 border-y-[.5px] border-neutral-300  dark:border-neutral-50/20 p-5">
      <Text className="text-xs text-neutral-500">Published by</Text>
      <View className="flex-row justify-between items-center">
        <View className="w-2/3">
          <Text className="text-xl font-semibold text-black dark:text-white">
            @{creator?.username}
          </Text>
          <Paragraph className="text-xs text-neutral-500">
            {creator?.about.slice(0, 65)} ...
          </Paragraph>
        </View>
        <Avatar circular size="$8">
          <Avatar.Image accessibilityLabel="Cam" src={creator?.image} />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
      </View>
      <View className="flex-row items-center gap-3">
        <Text className="text-md text-neutral-500">
          <Text className="text-black font-semibold">
            {creator?.followers.length}
          </Text>{" "}
          followers
        </Text>
        <Text className="text-md text-neutral-500">
          <Text className="text-black font-semibold">
            {creator?.followings.length}
          </Text>{" "}
          followers
        </Text>
      </View>
      <View className="flex-row items-center">
        <Button size={"$2.5"} className="px-3 mt-3">
          unfollow
        </Button>
        <Button size={"$2.5"} className="px-3 mt-3 ml-4 bg-blue-400 text-white">
          message
        </Button>
      </View>
    </View>
  );
};
