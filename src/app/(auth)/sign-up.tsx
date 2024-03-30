import {
  ActivityIndicator,
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
import { Button } from "tamagui";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../providers/AuthProvider";
const PORT = "http://192.168.3.72:3000";

//* FORM validation
const formSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  firstName: Yup.string()
    .required("Name is required")
    .min(3, "Should be at least 3 characters"),
  lastName: Yup.string(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Should be at least 8 characters"),
});

const CreateProductScreen = () => {
  const { setPendingUser } = useAuth();
  //! Local states
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailExists, setEmailExists] = React.useState(false);

  //! handling signUn
  const handleOnSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "http://192.168.3.72:3000/api/mobileApp/user/checkEmailExists",
        {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
          }),
        }
      );
      const data = await response.json();
      if (data.emailExists) {
        setEmailExists(true);
      } else {
        setPendingUser({ ...values, emailVerified: true });
        router.replace("/(auth)/username");
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign Up", headerShown: false }} />
      <View className="items-center justify-center">
        <Text className="text-4xl font-bold text-orange-500">
          Welcome Back!
        </Text>
        <Text className="text-3xl mb-3">Sufferer</Text>
      </View>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={async (values) => {
          await handleOnSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleSubmit,
          /* and other goodies */
        }) => (
          <>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="Jhon"
              style={[
                styles.input,
                {
                  borderColor:
                    touched.firstName && errors.firstName
                      ? "#ff9999"
                      : "#d1d1d1",
                  borderWidth: 1,
                },
              ]}
              value={values.firstName}
              editable={!isSubmitting}
              onChangeText={handleChange("firstName")}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Doe (optional)"
              style={[
                styles.input,
                {
                  borderColor:
                    touched.lastName && errors.lastName ? "#ff9999" : "#d1d1d1",
                  borderWidth: 1,
                },
              ]}
              value={values.lastName}
              editable={!isSubmitting}
              onChangeText={handleChange("lastName")}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="joe@example.com"
              style={[
                styles.input,
                {
                  borderColor:
                    (touched.email && errors.email) || emailExists
                      ? "#ff9999"
                      : "#d1d1d1",
                  borderWidth: 1,
                },
              ]}
              value={values.email}
              editable={!isSubmitting}
              onChangeText={handleChange("email")}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            {emailExists && (
              <Text style={styles.errorText}>Email Already Exists</Text>
            )}
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.input,
                {
                  borderColor:
                    touched.email && errors.email ? "#ff9999" : "#e3e3e3",
                },
              ]}
            >
              <TextInput
                placeholder="********"
                style={{
                  width: "90%",
                }}
                secureTextEntry={!showPassword}
                editable={!isSubmitting}
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
            <Button
              onPress={() => handleSubmit()}
              disabled={!isValid || isSubmitting}
              size="$4"
              className={`mt-10 text-white ${
                !isValid ? "bg-neutral-400" : "bg-blue-400"
              }`}
              icon={isSubmitting ? <ActivityIndicator /> : null}
            >
              {isSubmitting ? "Finding email" : "Next"}
            </Button>
            <Link href={"/(auth)/sign-in"} asChild>
              <Text style={styles.lowerButton}>Already have an account?</Text>
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
