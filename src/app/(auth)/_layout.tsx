import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";

export default function AuthLayout() {
  // const { isLoggedIn } = useAuth();

  // if (!isLoggedIn) {
  //   return <Redirect href={"/"} />;
  // }
  // return <Redirect href={'/(auth)/signUp/Email'}/>

  return <Stack/>;
}
