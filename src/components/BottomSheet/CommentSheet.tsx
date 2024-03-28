import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { forwardRef, useCallback, useImperativeHandle, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { usePost } from "../../providers/PostProvider";
import { Avatar } from "tamagui";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { useAuth } from "../../providers/AuthProvider";

interface Props {
}
type Ref = BottomSheetModal;
const CommentSheet = forwardRef<Ref, Props>((props, ref) => {
  const { postData } = usePost();
  const { profile } = useAuth();

  const snapPoints = useMemo(() => ["70%", "95%"], []);
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
  //! Footer Component
  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={5}>
        <View className="flex-row  px-4 items-center border-t-[.8px] border-neutral-300 pt-1">
          <Avatar circular size="$4">
            <Avatar.Image
              accessibilityLabel="Cam"
              src={profile?.user?.image}
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <TextInput
            placeholder="Add a comment"
            className=" ml-2 w-[79%] py-2"
            focusable
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
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      footerComponent={renderFooter}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
        <View className="border-b-[.5px] border-neutral-500 w-full items-center pb-2 mt-4">
          <Text>Comments</Text>
          <Text>{postData?.caption}</Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CommentSheet;

const styles = StyleSheet.create({});
