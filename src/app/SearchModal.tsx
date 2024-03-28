import {
  ColorSchemeName,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  useColorScheme,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, debounce } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { router } from "expo-router";
import UserItem from "../components/User/UserItem";
const PORT = "http://192.168.3.72:3000";

const search = () => {
  const colorScheme = useColorScheme();

  //! states
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <View className="bg-white flex-1 dark:bg-black">
      <StatusBar backgroundColor={colorScheme !== "dark" ? "white" : "black"} />
      <MainPageHeader
        colorScheme={colorScheme}
        setIsLoading={setIsLoading}
        setUsers={setUsers}
      />
      {isLoading ? (
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          data={[1, 2, 3, 4, 5]}
          estimatedItemSize={5}
          renderItem={({ item }: { item: any }) => <UserSkeleton />}
        />
      ) : (
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          data={users}
          estimatedItemSize={users.length || 10}
          renderItem={({ item }: { item: any }) => <UserItem user={item} />}
        />
      )}
    </View>
  );
};

export default search;

type HeaderProps = {
  colorScheme: ColorSchemeName;
  setIsLoading: (value: boolean) => void;
  setUsers: (value: any) => void;
};

const MainPageHeader = ({
  colorScheme,
  setIsLoading,
  setUsers,
}: HeaderProps) => {
  const fetchSearchedUser = async (searchInput: string) => {
    try {
      setIsLoading(true);
      const encodedInput = encodeURIComponent(searchInput);
      const response = await fetch(`${PORT}/api/user/findUser/${encodedInput}`);
      const data = await response.json();
      Array.isArray(data) ? setUsers(data) : setUsers([data]);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = debounce(fetchSearchedUser, 500);

  const handleSearch = (value: string) => {
    if (value === "") {
    } else {
      debouncedSearch(value);
    }
  };
  return (
    <View className="flex-row items-center p-3 mb-4">
      <Pressable
        onPress={() => {
          if (router.canGoBack()) router.back();
        }}
      >
        {({ pressed }) => (
          <FontAwesome6Icon
            name="arrow-left-long"
            size={18}
            color="#2b2b2b"
            style={{ opacity: pressed ? 0.7 : 1 }}
          />
        )}
      </Pressable>
      <Pressable className="flex-row items-center bg-gray-200/60 rounded-xl px-3 w-[90%] py-1.5 ml-4">
        <FontAwesome name="search" size={18} color="#2b2b2b" />
        <TextInput
          placeholder="Search"
          className="ml-4 text-lg w-full"
          onChangeText={(value) => handleSearch(value)}
        />
      </Pressable>
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
