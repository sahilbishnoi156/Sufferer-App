import { useSegments, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  const segments = useSegments();
  return (
    <TopTabs
      screenOptions={{
        swipeEnabled: segments[2] === undefined ? true : false,
        tabBarContentContainerStyle: {
          backgroundColor: "blue",
          display: "none",
        },
      }}
    >
      <TopTabs.Screen name="(main)" options={{ title: "Home" }} />
      <TopTabs.Screen name="messages" options={{ title: "messages" }} />
    </TopTabs>
  );
}
