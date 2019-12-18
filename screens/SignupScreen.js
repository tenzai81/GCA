import React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { NavigationActions } from "react-navigation";
import logo from "../assets/images/GCAPurple.png";

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }

  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }
    // connect with DB
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(this.state.email, this.state.password)
//       .then(() => this.props.navigation.navigate("myMap"))
//       .catch(error => this.setState({ errorMessage: error.message }));
//   };

  onBackToLoginPress = () => {
    var navActions = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(navActions);
  };

  render() {
    return (
      // <View style={{ paddingTop: 50, alignItems: "center" }}>
      //   <Text>Signup</Text>

      //   <TextInput
      //     style={{ width: 200, height: 40, borderWidth: 1 }}
      //     value={this.state.email}
      //     onChangeText={text => {
      //       this.setState({ email: text });
      //     }}
      //     placeholder="Email"
      //     keyboardType="email-address"
      //     autoCapitalize="none"
      //     autoCorrect={false}
      //   />

      //   <View style={{ paddingTop: 10 }} />

      //   <TextInput
      //     style={{ width: 200, height: 40, borderWidth: 1 }}
      //     value={this.state.password}
      //     onChangeText={text => {
      //       this.setState({ password: text });
      //     }}
      //     placeholder="Password"
      //     secureTextEntry={true}
      //     autoCapitalize="none"
      //     autoCorrect={false}
      //   />

      //   <View style={{ paddingTop: 10 }} />

      //   <TextInput
      //     style={{ width: 200, height: 40, borderWidth: 1 }}
      //     value={this.state.passwordConfirm}
      //     onChangeText={text => {
      //       this.setState({ passwordConfirm: text });
      //     }}
      //     placeholder="Password (confirm)"
      //     secureTextEntry={true}
      //     autoCapitalize="none"
      //     autoCorrect={false}
      //   />

      //   <Button title="Signup" onPress={this.onSignupPress} />

      //   <Button title="Back to Login" onPress={this.onBackToLoginPress} />
      // </View>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={logo} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          placeholderTextColor="#000"
        />

        <TextInput
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onSignupPress}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "#DADFE0",
    marginBottom: 10,
    padding: 10,
    color: "#000"
  },
  logo: {
    marginLeft: 5,
    width: 500,
    height: 300
  },
  buttonContainer: {
    backgroundColor: "#763097",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  loginButton: {
    backgroundColor: "#2980b6",
    color: "#fff"
  }
});
