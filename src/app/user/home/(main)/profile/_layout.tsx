import { Link, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Avatar, Button, Paragraph, View } from "tamagui";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useColorScheme, Text } from "react-native";
import { useAuth } from "../../../../../providers/AuthProvider";
import SettingSheet from "../../../../../components/BottomSheet/CurrentProfileSheet";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  const { profile: user } = useAuth();
  return (
    <View className="flex-1">
      <ProfileHeader username={user.username} />
      <Profile user={user} />
      <TopTabs
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: "black", height: 1.2 },
          tabBarStyle: { shadowColor: "transparent" },
        }}
      >
        <TopTabs.Screen
          name="index"
          options={{
            title: "My posts",
            tabBarLabel: ({ color }: any) => {
              return <Ionicons name="image-outline" size={25} color={color} />;
            },
          }}
        />
        <TopTabs.Screen
          name="archive"
          options={{
            title: "Saved Posts",
            tabBarLabel: ({ color }: any) => {
              return (
                <Ionicons name="bookmark-outline" size={25} color={color} />
              );
            },
          }}
        />
      </TopTabs>
    </View>
  );
}

const ProfileHeader = ({ username }: any) => {
  const colorScheme = useColorScheme();
  return (
    <View className="flex-row justify-between p-4 items-center bg-white dark:bg-black border-b-[1px] border-b-neutral-300">
      <Text className="ml-2 text-xl">@ {username}</Text>
      <View>
        <SettingSheet/>
      </View>
    </View>
  );
};

const Profile = ({ user }: any) => {
  const colorScheme = useColorScheme();
  return (
    <View className="p-4 bg-white dark:bg-black">
      <View className="flex-row items-center justify-between w-full px-2 mb-2">
        <Avatar circular size="$7">
          <Avatar.Image accessibilityLabel="Cam" src={user?.image} />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <View style={{ flexDirection: "row", gap: 25 }}>
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
      </View>
      <View>
        <Text className="font-bold text-[16px]">{user?.username}</Text>
        <Paragraph className="leading-4 mt-1 text-neutral-700">
          {user?.about}
        </Paragraph>
      </View>
      <View className="mt-5" style={{ flexDirection: "row", gap: 10 }}>
        <Button size={"$3"}>Edit profile</Button>
        <Button size={"$3"}>Settings</Button>
      </View>
    </View>
  );
};
