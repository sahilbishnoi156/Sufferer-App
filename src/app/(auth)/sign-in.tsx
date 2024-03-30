import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link, Stack, router } from "expo-router";
import { Button, Input } from "tamagui";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useQueryClient } from "@tanstack/react-query";
const PORT = "http://192.168.3.72:3000";

//* FORM validation
const formSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Should be at least 8 characters"),
});

const CreateProductScreen = () => {
  //! Local states
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState({
    email: false,
    password: false,
  });

  const queryClient = useQueryClient();
  //! handling signin
  const handleOnSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${PORT}/api/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = await response.json();
      if (!data.userFound) {
        setIsInvalid((prev: any) => ({
          ...prev,
          email: true,
        }));
      } else {
        if (!data.isMatch) {
          setIsInvalid((prev: any) => ({
            ...prev,
            password: true,
          }));
        } else {
          await queryClient.invalidateQueries({ queryKey: ["authentication"] });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign In", headerShown: false }} />
      <View className="items-center justify-center">
        <Text className="text-5xl">Sufferer</Text>
      </View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          handleOnSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleReset,
          handleSubmit,
          /* and other goodies */
        }) => (
          <>
            <Text style={styles.label}>Email</Text>
            <Input
              size={"$4"}
              placeholder={`joe@example.com`}
              style={{
                borderColor:
                  (touched.email && errors.email) || isInvalid?.email
                    ? "#ff9999"
                    : "#e3e3e3",
              }}
              value={values.email}
              onChangeText={handleChange("email")}
              editable={!isSubmitting}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            {isInvalid?.email && (
              <Text style={styles.errorText}>Email not found</Text>
            )}
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.input,
                {
                  borderColor:
                    (touched.email && errors.email) || isInvalid?.password
                      ? "#ff9999"
                      : "#e3e3e3",
                },
              ]}
            >
              <TextInput
                placeholder="********"
                style={{
                  width: "90%",
                }}
                editable={!isSubmitting}
                secureTextEntry={!showPassword}
                value={values.password.toString()}
                onChangeText={handleChange("password")}
              />
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                className="p-1"
              >
                {({ pressed }) => (
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            {isInvalid?.password && (
              <Text style={styles.errorText}>Invalid Password</Text>
            )}
            <Button
              onPress={() => handleSubmit()}
              disabled={!isValid || isSubmitting}
              size="$4"
              className="mt-10 bg-blue-400 text-white"
              icon={isSubmitting ? <ActivityIndicator /> : null}
            >
              Sign In
            </Button>
            <Link href={"/(auth)/sign-up"} asChild>
              <Text style={styles.lowerButton}>Don't have an account?</Text>
            </Link>
            <Link href={"/(auth)/getLocation"} asChild>
              <Text style={styles.lowerButton}>Don't have an account?</Text>
            </Link>
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateProductScreen;

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
    padding: 7,
    paddingHorizontal: 15,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "gray",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 5,
  },
  errorText: {
    color: "#fa6666",
  },
});
