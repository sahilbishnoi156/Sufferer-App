import { useSegments, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  const segments = useSegments();
  return (
    <TopTabs
      initialRouteName="(main)"
      backBehavior="history"
      screenOptions={{
        swipeEnabled: segments[3] === undefined ? true : false,
        tabBarContentContainerStyle: {
          display: "none",
        },
      }}
    >
      <TopTabs.Screen
        name="story"
        options={{ title: "Story", presentation: "modal" }}
      />
      <TopTabs.Screen name="(main)" options={{ title: "Home" }} />
      <TopTabs.Screen
        name="messages"
        options={{
          title: "messages",
          presentation: "modal",
        }}
      />
    </TopTabs>
  );
}
