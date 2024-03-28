import {
  Animated,
  ColorSchemeName,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { useCallback, useRef } from "react";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { Text, View } from "tamagui";
import { Link } from "expo-router";
import PostItem from "../../../components/PostItem/PostItem";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { usePost } from "../../../providers/PostProvider";
import CommentSheet from "../../../components/BottomSheet/CommentSheet";
import PostInfoSheet from "../../../components/BottomSheet/PostInfoSheet";
import usePostsList from "../../../api/posts";
import { FlashList } from "@shopify/flash-list";

const index = () => {
  const colorScheme = useColorScheme();
  const { allPosts, setPostData } = usePost();

  //! Header Animation Code
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 80);
  const headerTranslateY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
  });

  //! Getting posts
  usePostsList();

  //! Sheet ref
  const commentSheetRef = useRef<BottomSheetModal>(null);
  const costInfoSheetRef = useRef<BottomSheetModal>(null);

  //! Bottom sheet functions
  const handleOpenComments = useCallback(async (data: any) => {
    setPostData(data);
    if (commentSheetRef.current) {
      commentSheetRef?.current?.present();
    }
  }, []);
  const handleOpenPostInfo = (data: any) => {
    setPostData(data);
    if (costInfoSheetRef.current) {
      costInfoSheetRef?.current?.present();
    }
  };

  return (
    <View className="bg-white flex-1 dark:bg-black">
      <StatusBar backgroundColor={colorScheme !== "dark" ? "white" : "black"} />
      <Animated.View
        style={{
          transform: [{ translateY: headerTranslateY }],
        }}
        className="absolute top-0 left-0 right-0 z-[1] "
      >
        <MainPageHeader colorScheme={colorScheme} />
      </Animated.View>
      <FlashList
        onScroll={(event) =>
          scrollY.setValue(event.nativeEvent.contentOffset.y)
        }
        contentContainerStyle={{ paddingTop: 65 }}
        data={allPosts}
        renderItem={({ item }: { item: any }) => {
          return (
            <PostItem
              postItem={item}
              handleOpenComments={handleOpenComments}
              handleOpenPostInfo={handleOpenPostInfo}
            />
          );
        }}
        estimatedItemSize={allPosts.length || 5}
      />
      <CommentSheet ref={commentSheetRef} />
      <PostInfoSheet ref={costInfoSheetRef} />
    </View>
  );
};

export default index;

const MainPageHeader = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <View className="flex-row justify-between p-4 items-center bg-white dark:bg-black">
      <View className="flex-row items-center">
        <FontAwesome6Icon
          name="hippo"
          size={25}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="ml-2 text-2xl">Sufferer</Text>
      </View>
      <View>
        <Link href={"/user/messages"} asChild>
          <FontAwesome6Icon
            name="facebook-messenger"
            size={22}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
