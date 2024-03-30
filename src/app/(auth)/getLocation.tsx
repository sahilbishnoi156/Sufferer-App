import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import * as Location from 'expo-location';
import { Redirect } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "tamagui";
const PORT = "http://192.168.3.72:3000";

interface LocationInterface {
    latitude: number;
    longitude: number;
  }

const GetLocation = () => {
  const queryClient = useQueryClient();
  const { pendingUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [userLocation, setUserLocation] = React.useState<Location.LocationObject | undefined>();
//   //! Authentication if user is on correct location
//   if (!pendingUser?.emailVerified && !pendingUser?.username) {
//     return <Redirect href={"/(auth)/sign-up"} />;
//   }

  //! Handle Submit to complete signup
  const handleOnSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${PORT}/api/auth/signUp`, {
        method: "POST",
        body: JSON.stringify({
          first_name: pendingUser.firstName,
          last_name: pendingUser.lastName,
          username: pendingUser.username,
          email: pendingUser.email,
          password: pendingUser.password,
          location: userLocation,
          image:
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        }),
      });
      const data = await response.json();
      if (data.userCreated) {
        await queryClient.invalidateQueries({ queryKey: ["authentication"] });
      } else {
        console.log("email Already exists");
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setUserLocation(location);
    })();
  }, []);

  function success(position: any) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <View>
      <Text>getLocation</Text>
      <Button
        onPress={() => {
          //! Get location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
          } else {
            console.log("Geolocation not supported");
          }
        }}
      >
        GetLocation
      </Button>
    </View>
  );
};

export default GetLocation;

const styles = StyleSheet.create({});
