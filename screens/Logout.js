import * as yup from "yup";
import { Formik } from "formik";
import { Block, Text, theme } from "galio-framework";

import React, { Component, Fragment } from "react";
import { Alert, StyleSheet, View, AsyncStorage } from "react-native";

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
