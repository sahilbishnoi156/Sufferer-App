import {
  Animated,
  ColorSchemeName,
  FlatList,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import React from "react";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome";
import { Text, View } from "tamagui";

const message = () => {
  const colorScheme = useColorScheme();

  //! Header Animation Code
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 80);
  const headerTranslateY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
  });

  return (
    <View className="bg-white flex-1 dark:bg-black">
      <StatusBar backgroundColor={colorScheme !== "dark" ? "white" : "black"} />
      <Animated.View
        style={{
          transform: [{ translateY: headerTranslateY }],
        }}
        className="absolute top-0 left-0 right-0 z-[1] bg-white "
      >
        <MainPageHeader colorScheme={colorScheme} />
      </Animated.View>
      <FlatList
        onScroll={(event) =>
          scrollY.setValue(event.nativeEvent.contentOffset.y)
        }
        className="pt-[66px]"
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={(item) => (
          <View className="h-96 bg-white">
            <Text>sf</Text>
          </View>
        )}
      />
    </View>
  );
};

export default message;

const MainPageHeader = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <View className="flex-row justify-between p-4 items-center">
      <View className="flex-row items-center  bg-gray-200/60 rounded-xl px-3 w-full py-1.5">
        <FontAwesome6Icon name="search" size={18} color="#2b2b2b" />
        <TextInput placeholder="Search" className="ml-4 text-lg" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
