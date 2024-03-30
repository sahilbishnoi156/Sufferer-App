import { Avatar, Button, Paragraph, View } from "tamagui";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  useColorScheme,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useAuth } from "../../../providers/AuthProvider";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { getUser } from "../../../api/user";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

export default function OrderListNavigator() {
  const { id: usernameString } = useLocalSearchParams();
  const username =
    typeof usernameString === "string" ? usernameString : usernameString[0];

  const { isLoading, data, error } = getUser(username);
  if (isLoading || !data) {
    return <ActivityIndicator />;
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <ProfileHeader username={data?.user?.username} />
      <Profile user={data?.user} />
    </View>
  );
}

const ProfileHeader = ({ username }: any) => {
  const colorScheme = useColorScheme();
  return (
    <View className="flex-row justify-between p-4 pt-6 items-center bg-white dark:bg-black">
      <View className="flex-row items-end gap-5">
        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
          className="px-2"
        >
          <FontAwesome6Icon
            name="arrow-left-long"
            size={22}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </Pressable>
        <Text className="text-xl font-semibold">{username}</Text>
      </View>
      <View>
        <Link href={"/user/home/messages"} asChild>
          <Ionicons
            name="ellipsis-vertical"
            size={17}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </Link>
      </View>
    </View>
  );
};

const Profile = ({ user }: any) => {
  const colorScheme = useColorScheme();
  const { profile: currentUser } = useAuth();

  const isFollowing = user?.followers?.some(
    (user: any) => user._id === currentUser?._id
  );
  return (
    <View className="px-6 pb-4 bg-white dark:bg-black">
      <View className="flex-row items-center justify-between w-full mb-1">
        <Avatar circular size="$7">
          <Avatar.Image accessibilityLabel="Cam" src={user?.image} />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <View className="items-center">
          <Text className="text-lg font-semibold">
            {user?.post?.length || 0}
          </Text>
          <Text className="">posts</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-semibold">
            {user?.followers?.length}
          </Text>
          <Text className="">followers</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-semibold">
            {user?.followings?.length}
          </Text>
          <Text className="">followings</Text>
        </View>
      </View>
      <View>
        <Text className="font-bold text-[16px]">{user?.username}</Text>
        {!!user?.about && (
          <Paragraph className="leading-4 mt-1 text-neutral-700 ">
            {user?.about}
          </Paragraph>
        )}
      </View>
      <View className="mt-3" style={{ flexDirection: "row", gap: 10 }}>
        {isFollowing ? (
          <Button size={"$2.5"} className="w-[48%]">
            Following
          </Button>
        ) : (
          <Button size={"$2.5"} className="w-[48%] bg-blue-500 text-white">
            Follow
          </Button>
        )}
        <Button size={"$2.5"} className="w-[48%]">
          Message
        </Button>
      </View>
    </View>
  );
};
