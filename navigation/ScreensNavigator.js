import React from "react";
import { createStackNavigator } from "react-navigation";

import myMap from "../screens/myMap";
import LoginScreen from "../screens/LoginScreen";

export default createStackNavigator({
  Login: LoginScreen,
  myMap: myMap
});
