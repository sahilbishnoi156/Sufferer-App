import {
  Animated,
  ColorSchemeName,
  FlatList,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React from "react";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { ScrollView, Text, View } from "tamagui";
import { Link } from "expo-router";
import PostItem from "../../../components/PostItem/PostItem";
import { DummyPosts } from "../../../constants/Posts";
const PORT = "http://192.168.3.72:3000";

const index = () => {
  const colorScheme = useColorScheme();
  const [posts, setPosts] = React.useState(DummyPosts.reverse());

  //! Header Animation Code
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 80);
  const headerTranslateY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
  });

  // //! Getting posts
  // const fetchInitialPosts = async () => {
  //   try {
  //     const postsResponse = await fetch(`${PORT}/api/posts/allposts`);
  //     const postsData = await postsResponse.json();
  //     setPosts(postsData.posts);
  //     console.log(postsData.posts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchInitialPosts();
  //   console.log("post fetched");
  // }, []);

  return (
    <View className="bg-white flex-1 dark:bg-black">
      <StatusBar backgroundColor={colorScheme !== "dark" ? "white" : "black"} />
      <Animated.View
        style={{
          transform: [{ translateY: headerTranslateY }],
          borderBottomWidth: 0.5,
        }}
        className="absolute top-0 left-0 right-0 z-[1] border-neutral-300 "
      >
        <MainPageHeader colorScheme={colorScheme} />
      </Animated.View>
      {/* <ScrollView
        onScroll={(event) =>
          scrollY.setValue(event.nativeEvent.contentOffset.y)
        }
        style={{ gap: 10, paddingTop: 65, paddingBottom: 10 }}
      >
        {posts.map((post) => (
          <PostItem postItem={post} key={post._id} />
        ))}
      </ScrollView> */}

      <FlatList
        onScroll={(event) =>
          scrollY.setValue(event.nativeEvent.contentOffset.y)
        }
        contentContainerStyle={{ gap: 10, paddingTop: 65, paddingBottom: 10 }}
        data={posts}
        renderItem={({ item }: { item: any }) => {
          return <PostItem postItem={item} />;
        }}
      />
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
