import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link, Stack } from "expo-router";
import { Button } from "tamagui";

//* FORM validation
const formSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  full_name: Yup.string()
    .required("Name is required")
    .min(5, "Should be at least 5 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Should be at least 8 characters"),
});

const CreateProductScreen = () => {
  //! Local states
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  //! handling signUn
  const handleOnSubmit = async (data: any) => {
    setIsSubmitting(true);

      setIsSubmitting(false); 
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign Up" }} />
      <Formik
        initialValues={{
          full_name: "",
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
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Jhon Doe"
              style={[
                styles.input,
                {
                  borderColor:
                    touched.full_name && errors.full_name
                      ? "#ff9999"
                      : "#d1d1d1",
                  borderWidth: 1,
                },
              ]}
              value={values.full_name}
              onChangeText={handleChange("full_name")}
            />
            {touched.full_name && errors.full_name && (
              <Text style={styles.errorText}>{errors.full_name}</Text>
            )}
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="joe@example.com"
              style={[
                styles.input,
                {
                  borderColor:
                    touched.email && errors.email ? "#ff9999" : "#d1d1d1",
                  borderWidth: 1,
                },
              ]}
              value={values.email}
              onChangeText={handleChange("email")}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="********"
              style={[
                styles.input,
                {
                  borderColor:
                    touched.password && errors.password ? "#ff9999" : "#d1d1d1",
                  borderWidth: 1,
                },
              ]}
              secureTextEntry={true}
              value={values.password.toString()}
              onChangeText={handleChange("password")}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button
              onPress={() => handleSubmit()}
              disabled={!isValid}
              size="lg"
            >
              Sign Up
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
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 100,
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
    backgroundColor: "white",
    padding: 10,
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
