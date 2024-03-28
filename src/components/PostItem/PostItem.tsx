import {
  Alert,
  Pressable,
  Share,
  StyleSheet,
  TextBase,
  TextInput,
  useColorScheme,
} from "react-native";
import React, { memo } from "react";
import { Avatar, Image, Input, Text, TextArea, View, XStack } from "tamagui";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import Feather from "react-native-vector-icons/Feather";
import moment from "moment";

type PostItemProps = {
  postItem: any;
  handleOpenComments: any;
  handleOpenPostInfo: any;
};
const PostItem = ({
  postItem,
  handleOpenComments,
  handleOpenPostInfo,
}: PostItemProps) => {
  const uploadedTime = moment
    .duration(moment().diff(moment(new Date(postItem?.createdAt))))
    .humanize();
  const iconColor = useColorScheme() === "dark" ? "white" : "black";

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://sufferer.vercel.app/post/${postItem._id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View className="border-y-[.5px] border-y-neutral-300">
      <View
        className="flex-row justify-between items-center pl-4 py-3 border-b-neutral-300"
        style={{
          borderBottomWidth: postItem?.image ? 0 : 0.5,
        }}
      >
        <View className="flex-row items-center">
          <Avatar circular size="$2.5">
            <Avatar.Image
              accessibilityLabel="Cam"
              src={postItem?.creator?.image}
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <View>
            <Text className="ml-2">{postItem?.creator?.username}</Text>
            <Text className="ml-2 text-[10px] text-neutral-500">
              uploaded · {uploadedTime} ago
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => handleOpenPostInfo(postItem)}
          className="px-6 py-2"
        >
          <FontAwesome6Icon
            name="ellipsis-vertical"
            size={16}
            color={iconColor}
          />
        </Pressable>
      </View>
      <View className="">
        {postItem?.image ? (
          <Image
            source={{
              uri: postItem?.image || "https://picsum.photos/200/300",
            }}
            className="w-full aspect-square"
          />
        ) : (
          <Image
            source={{
              uri: postItem?.image || "https://picsum.photos/200/300",
            }}
            className="w-full aspect-square"
          />
        )}

        <Text className="px-4 pt-1 pb-2">{postItem?.caption}</Text>
      </View>
      <View className="px-4">
        <XStack space>
          <FontAwesome6Icon name="heart" size={25} color={iconColor} />
          <FontAwesome
            name="comment-o"
            size={25}
            color={iconColor}
            onPress={() => handleOpenComments(postItem)}
          />
          <Pressable onPress={onShare}>
            <Feather name="send" size={25} color={iconColor} />
          </Pressable>
        </XStack>
        <View className="flex-row justify-between items-center">
          <Text className="mt-1">{postItem?.likes?.length} likes</Text>
          <View className="flex-row items-center">
            <Text>{postItem?.shares}</Text>
            <Feather name="share-2" size={15} />
          </View>
        </View>
        <Text className="text-neutral-500">
          See all {postItem?.comments?.length} comments
        </Text>
      </View>
      <View className="px-4 flex-row items-center justify-between">
        <TextInput
          placeholder="Add a comment"
          placeholderTextColor={"#919191"}
          className="text-md py-2 max-w-[90%] w-[90%] text-white"
        />
        <FontAwesome6Icon name="circle-arrow-up" color={"#0096FF"} size={18} />
      </View>
    </View>
  );
};

export default memo(PostItem);

const styles = StyleSheet.create({});
