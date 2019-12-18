import React from "react";
import { createStackNavigator } from "react-navigation";

import myMap from "../screens/myMap";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

export default createStackNavigator({
  Login: LoginScreen,
  SignupScreen: SignupScreen,
  myMap: myMap
});
