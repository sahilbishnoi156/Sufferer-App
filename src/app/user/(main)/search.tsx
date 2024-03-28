import {
  Animated,
  ColorSchemeName,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import React, { useCallback } from "react";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome";
import { Avatar, Text, View } from "tamagui";
import { useUser } from "../../../providers/PostProvider";
import { FlashList } from "@shopify/flash-list";
import UserItem from "../../../components/User/UserItem";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { QueryClient } from "@tanstack/react-query";
import { RefreshControl } from "react-native-gesture-handler";
import { Link } from "expo-router";
const PORT = "http://192.168.3.72:3000";

const search = () => {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  //! Header Animation Code
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 80);
  const headerTranslateY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
  });

  //! states
  const { setSuggestedUsers, suggestedUsers } = useUser();
  const [users, setUsers] = React.useState([1, 2, 3, 4, 5, 6]);
  const [isLoading, setIsLoading] = React.useState(false);

  //! get suggested Users
  const getSuggestedUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${PORT}/api/user/suggestedUsers`);
      const data = await response.json();
      Array.isArray(data) ? setSuggestedUsers(data) : setSuggestedUsers([data]);
      setUsers(data);
    } catch (error) {
      console.log("failed to get Users", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getSuggestedUsers();
  }, []);

  //! List Header Componnent
  const renderHeader = useCallback((title: string) => {
    return (
      <View className="">
        <Text className="font-semibold text-lg">{title}</Text>
      </View>
    );
  }, []);

  //! Refresh
  const onRefresh = React.useCallback(async () => {
    setIsLoading(true);
    await getSuggestedUsers();
    setIsLoading(false);
  }, []);

  return (
    <View className="bg-white flex-1 dark:bg-black">
      <StatusBar backgroundColor={colorScheme !== "dark" ? "white" : "black"} />
      <Animated.View
        style={{
          transform: [{ translateY: headerTranslateY }],
        }}
        className="absolute top-0 left-0 right-0 z-[1] bg-white border-b-[.5px] border-neutral-300"
      >
        <MainPageHeader colorScheme={colorScheme} />
      </Animated.View>
      {isLoading ? (
        <FlashList
          onScroll={(event) =>
            scrollY.setValue(event.nativeEvent.contentOffset.y)
          }
          refreshing={isLoading}
          contentContainerStyle={{
            paddingVertical: 70,
            paddingTop: 80,
            paddingHorizontal: 20,
          }}
          data={[1, 2, 3, 4, 5]}
          estimatedItemSize={5}
          renderItem={({ item }: { item: any }) => <UserSkeleton />}
        />
      ) : (
        <FlashList
          onScroll={(event) =>
            scrollY.setValue(event.nativeEvent.contentOffset.y)
          }
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          refreshing={isLoading}
          contentContainerStyle={{
            paddingVertical: 70,
            paddingTop: 80,
            paddingHorizontal: 20,
          }}
          data={users}
          ListHeaderComponent={() => renderHeader("People you may know")}
          estimatedItemSize={5}
          renderItem={({ item }: { item: any }) => <UserItem user={item} />}
        />
      )}
    </View>
  );
};

export default search;

const MainPageHeader = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <View className="p-3">
      <Link href={"/SearchModal"} asChild>
        <Pressable className="flex-row items-center bg-gray-200/60 rounded-xl px-3 w-full py-1.5">
          <FontAwesome6Icon name="search" size={18} color="#2b2b2b" />
          <TextInput
            placeholder="Search"
            className="ml-4 text-lg"
            editable={false}
          />
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({});

const UserSkeleton = () => {
  return (
    <ContentLoader
      speed={1}
      width={476}
      height={75}
      viewBox="0 0 476 75"
      backgroundColor="#d1d1d1"
      foregroundColor="#919191"
    >
      <Rect x="68" y="17" rx="3" ry="3" width="88" height="9" />
      <Rect x="68" y="31" rx="3" ry="3" width="200" height="9" />
      <Circle cx="30" cy="30" r="28" />
    </ContentLoader>
  );
};
