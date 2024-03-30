import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useMemo } from "react";
import { Button, Input, Paragraph, debounce } from "tamagui";
import { Redirect, Stack, router } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";
const PORT = "http://192.168.3.72:3000";

const Username = () => {
  const [usernameExists, setUsernameExists] = React.useState<boolean | null>(
    null
  );
  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [isChecking, setIsChecking] = React.useState(false);
  const timerRef = React.useRef<any>(null);
  const { pendingUser, setPendingUser } = useAuth();

  if (!pendingUser?.emailVerified) {
    return <Redirect href={"/(auth)/sign-up"} />;
  }

  //* Checking if username exists
  const checkUsernameExists = async (username: string) => {
    setIsChecking(true);
    try {
      const response = await fetch(
        `${PORT}/api/user/available/username/${username}`
      );
      const data = await response.json();
      console.log(data, username);
      if (data.userAvailable) {
        setUsernameExists(true); // Username exist
      } else {
        setUsernameExists(false); // Username does not exists
      }
    } catch (error) {
      console.log(error);
    }
    setIsChecking(false);
  };

  // *Handling username change
  const handleUserNameChange = (value: string) => {
    const newUsername = value.toLowerCase();
    setUsernameError("");
    if (newUsername.length > 15) {
      setUsernameError("Username should be maximum 15 characters long");
      return "";
    }

    if (/[^a-z0-9._]|[.]{2,}|[_]{2,}/gm.test(newUsername)) {
      setUsernameError("Invalid Character");
      return "";
    } else {
      setUsername(newUsername);
    }
    clearTimeout(timerRef.current);
    if (newUsername !== "" && newUsername.length > 5) {
      // Set a new timer to delay API call
      timerRef.current = setTimeout(() => {
        checkUsernameExists(newUsername);
      }, 500); // Adjust the delay time as needed
    } else {
      setUsernameExists(null);
      setUsernameError("Should be at least 5 characters");
    }
  };

  const disabled = useMemo(
    () => (usernameExists === null ? true : usernameExists),
    [usernameExists]
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "Choose Username", headerShadowVisible: false }}
      />
      <View className="w-full items-center justify-center mb-10">
        <Text className="text-5xl font-semibold text-orange-400">
          Hey {pendingUser?.firstName || "User"}
        </Text>
        <Paragraph>Feel free to choose a username below:</Paragraph>
      </View>
      <Text style={styles.label}>Username</Text>
      <View
        style={[
          styles.input,
          {
            borderColor: usernameExists ? "#ff9999" : "#e3e3e3",
          },
        ]}
      >
        <TextInput
          placeholder={`john_doe_123`}
          value={username}
          className="py-3 w-[90%]"
          onChangeText={handleUserNameChange}
        />
        {!!isChecking && <ActivityIndicator color={"black"} />}
      </View>
      <View className="mt-3">
        {usernameExists === null ? (
          usernameError ? (
            <Text className="text-neutral-500">&#8226; {usernameError}</Text>
          ) : (
            <UsernameInformation />
          )
        ) : !usernameExists ? (
          <Text className="text-green-500 font-medium">
            &#8226; Username available
          </Text>
        ) : (
          <Text className="text-red-500 font-medium">
            &#8226; Username not available
          </Text>
        )}
      </View>
      <View className="mt-10">
        <Button
          size={"$4"}
          className={`text-white ${
            disabled ? "bg-neutral-400" : "bg-blue-400"
          }`}
          disabled={disabled}
          onPress={() => {
            setPendingUser({ ...pendingUser, username })
            router.replace('/(auth)/getLocation')
          }}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default Username;

const UsernameInformation = () => {
  return (
    <View>
      <Text className="text-neutral-500">
        &#8226; Your username should contain only:
      </Text>
      <View className="ml-1">
        <Text className="text-neutral-500"> - Lowercase letters (a-z)</Text>
        <Text className="text-neutral-500"> - Numbers (0-9)</Text>
        <Text className="text-neutral-500">
          {" "}
          - Underscores (_) for separation
        </Text>
        <Text className="text-neutral-500"> - Periods (.) if needed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "white",
    justifyContent: "center",
  },
  selectButton: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  lowerButton: {
    color: "#465ff0",
    alignSelf: "center",
    marginTop: 10,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 15,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "black",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 5,
  },
  errorText: {
    color: "#fa6666",
  },
});
