// import { StyleSheet, Text, View } from "react-native";
// import React, { useCallback, useRef } from "react";
// import { FlatList } from "react-native-gesture-handler";
// import { Dimensions } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import { usePost } from "../../../../../providers/PostProvider";
// import { useAuth } from "../../../../../providers/AuthProvider";
// import PostItem from "../../../../../components/PostItem/PostItem";
// import CommentSheet from "../../../../../components/BottomSheet/CommentSheet";
// import PostInfoSheet from "../../../../../components/BottomSheet/PostInfoSheet";
// // Gap stuff
// const { width } = Dimensions.get("window");
// const gap = 2;
// const itemPerRow = 3;
// const totalGapSize = (itemPerRow - 1) * gap;
// const windowWidth = width;
// const childWidth = (windowWidth - totalGapSize) / itemPerRow;

// const index = () => {
//   const { setPostData } = usePost();

//   const commentSheetRef = useRef<BottomSheetModal>(null);
//   const costInfoSheetRef = useRef<BottomSheetModal>(null);

//   //! Bottom sheet functions
//   const handleOpenComments = useCallback(async (data: any) => {
//     setPostData(data);
//     if (commentSheetRef.current) {
//       commentSheetRef?.current?.present();
//     }
//   }, []);
//   const handleOpenPostInfo = (data: any) => {
//     setPostData(data);
//     if (costInfoSheetRef.current) {
//       costInfoSheetRef?.current?.present();
//     }
//   };
//   return (
//     <View className="bg-white dark:bg-black flex-1">
//       <FlashList
//         data={posts}
//         renderItem={({ item }: { item: any }) => {
//           return (
//             <PostItem
//               postItem={item}
//               handleOpenComments={handleOpenComments}
//               handleOpenPostInfo={handleOpenPostInfo}
//             />
//           );
//         }}
//         estimatedItemSize={200}
//       />
//       <CommentSheet ref={commentSheetRef} />
//       <PostInfoSheet ref={costInfoSheetRef} />
//     </View>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   itemsWrap: {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginVertical: -(gap / 2),
//     marginHorizontal: -(gap / 2),
//   },
//   singleItem: {
//     margin: gap / 2,
//     minWidth: childWidth,
//     maxWidth: childWidth,
//     aspectRatio: 1,
//     backgroundColor: "blue",
//   },
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})