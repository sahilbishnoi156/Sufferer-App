import React, { ComponentType, useCallback, useMemo, useRef } from "react";
import { View, Text, Pressable, BackHandler } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetFooter,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Avatar, Input } from "tamagui";
import {
  NativeViewGestureHandlerProps,
  TextInput,
} from "react-native-gesture-handler";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

const CommentBottomSheet = ({
  creatorImage,
  color,
}: {
  creatorImage: string;
  color: string;
}) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const commentInputRef = useRef<any>(null);

  // variables
  const snapPoints = useMemo(() => ["70%", "70%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(async () => {
    bottomSheetModalRef.current?.present();
    await new Promise((resolve) => setTimeout(resolve, 50));
    commentInputRef.current?.focus();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={"close"}
        appearsOnIndex={1}
      />
    ),
    []
  );
  // renders
  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={5}>
        <View className="flex-row  px-4 items-center border-t-[.8px] border-neutral-300 pt-1">
          <Avatar circular size="$4">
            <Avatar.Image accessibilityLabel="Cam" src={creatorImage} />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <TextInput
            placeholder="Add a comment"
            className=" ml-2 w-[79%] py-2"
            ref={commentInputRef}
          />
          <FontAwesome6Icon
            name="circle-arrow-up"
            color={"#0096FF"}
            size={18}
          />
        </View>
      </BottomSheetFooter>
    ),
    []
  );
  return (
    <>
      <Pressable onPress={handlePresentModalPress}>
        <FontAwesome name="comment-o" size={25} color={color} />
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        onChange={handleSheetChanges}
      >
        <BottomSheetView>
          <View className="border-b-[.5px] border-neutral-500 w-full items-center pb-2 mt-4">
            <Text>Comments</Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
export default CommentBottomSheet;
