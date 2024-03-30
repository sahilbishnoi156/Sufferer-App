import {
  ColorSchemeName,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View } from "tamagui";
import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { FlashList } from "@shopify/flash-list";

const message = () => {
  const colorScheme = useColorScheme();
  const [assets, setAssets] = React.useState<any>([]);
  const [selectedImage, setSelectedImage] = React.useState<string | null>();

  React.useEffect(() => {
    const getAlbumList = async () => {
      const allAssets = await MediaLibrary.getAssetsAsync();
      setAssets(allAssets.assets);
      setSelectedImage(allAssets.assets[0].uri);
      return allAssets;
    };
    getAlbumList();
  }, []);

  const formatData = (data: any, numColumns: any) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  return (
    <View className="bg-white flex-1 dark:bg-black">
      <StatusBar backgroundColor={colorScheme !== "dark" ? "white" : "black"} />
      <MainPageHeader colorScheme={colorScheme} />
      <View className="w-full aspect-square bg-neutral-200 object-contain">
        {!!selectedImage && (
          <Image
            source={{ uri: selectedImage || "" }}
            className="h-full object-contain"
          />
        )}
      </View>
      <View className="px-4 py-2 w-full justify-between items-center flex-row">
        <Pressable className="flex-row items-center">
          <Text className="text-lg mr-1">Recents</Text>
          <Ionicons name="chevron-down-outline" size={15} />
        </Pressable>
        <Pressable className="rounded-full bg-gray-400 p-2">
          <Ionicons name="copy-outline" size={15} color={"white"} />
        </Pressable>
      </View>
      <FlashList
        data={formatData(assets.slice(0, 19), 4)}
        numColumns={4}
        estimatedItemSize={20}
        renderItem={({ item }: any) => (
          <Pressable
            onPress={() => setSelectedImage(item.uri)}
            style={{
              flex: 1,
              margin: 1,
              height: Dimensions.get("window").width / 4,
            }}
          >
            <Image
              source={{ uri: item.uri }}
              style={{
                flex: 1,
              }}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default message;

const MainPageHeader = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <View className="flex-row w-full justify-between p-4 items-center">
      <View className="flex-row items-center">
        <Ionicons
          name="close"
          size={30}
          color={colorScheme === "dark" ? "white" : "black"}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
        />
        <Text className="ml-7 text-xl font-semibold">New Post</Text>
      </View>
      <Text className="font-semibold text-blue-500">Next</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
