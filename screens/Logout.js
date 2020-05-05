import * as yup from "yup";
import { Formik } from "formik";
import { Block, Text, theme } from "galio-framework";

import React, { Component, Fragment } from "react";
import { Alert, StyleSheet, View, AsyncStorage } from "react-native";
import {
  TextInput,
  Button,
  Title,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from "react-navigation";
import Registration from "./RegistrationScreen";
import ResetPassword from "./ResetPassword";
import ForgetPassword from "./ForgetPassword";
import HomeScreen from "./Home";

export default class Logout extends Component {
  async logout() {
    const token = await AsyncStorage.getItem("x-auth-token");
    console.log("before deletion", token);
    await AsyncStorage.removeItem("x-auth-token")
      .then((res) => console.log("removed successfullly"))
      .catch((err) => console.log("not remove"));
    const token2 = await AsyncStorage.getItem("x-auth-token");
    console.log("after deletion", token2);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => this.props.navigation.navigate("SignIn")}>
          Click to logout
        </Text>
        {/* <Text onPress = {this.logout}>Click to logout</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
  },
  input: {
    margin: 10,
  },
});
