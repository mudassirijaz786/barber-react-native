import * as yup from "yup";
import { Formik } from "formik";
import { Block, Text, theme } from "galio-framework";
import React, { Component, Fragment } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { showMessage } from "react-native-flash-message";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ijazmudassir786@gmail.com",
      password: "123123",
      isLoading: false,
    };
  }

  async loginCall(JsonObj) {
    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserLogin",
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JsonObj),
      }
    );
    if (response.status === 200) {
      this.props.navigation.navigate("Home");
      console.log("RESPONSE", response.headers.map["x-auth-token"]);
      await AsyncStorage.setItem(
        "x-auth-token",
        response.headers.map["x-auth-token"]
      )
        .then((res) => {
          console.log("Login token set", res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      showMessage({
        message: "Invalid username or password",
        type: "danger",
      });
    }
  }

  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["email"] = values.email;
      obj["password"] = values.password;
      this.setState({ isLoading: true });
      await this.loginCall(obj);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="#0000ff"
          />
        ) : (
          <Text
            color="black"
            size={28}
            style={{ paddingBottom: 8, marginLeft: 120 }}
          >
            Login
          </Text>
        )}

        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(3).required(),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Fragment>
              <TextInput
                label="email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                //background color ?
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                mode="flat"
                placeholder="please enter your email"
              />
              {touched.email && errors.email && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.email}
                </Text>
              )}
              <TextInput
                label="password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                secureTextEntry={true}
                //background color ?
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                mode="flat"
                placeholder="please enter your password"
              />
              {touched.password && errors.password && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.password}
                </Text>
              )}

              <Text
                color={theme.COLORS.PRIMARY}
                style={{ marginTop: 20, textAlign: "right" }}
                size={16}
                onPress={() => this.props.navigation.navigate("ForgetPassword")}
              >
                Forgot password?
              </Text>
              <Button
                style={styles.button}
                icon="login"
                mode="outlined"
                uppercase={false}
                disabled={!isValid || this.state.isLoading}
                onPress={handleSubmit}
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
              >
                Sign in
              </Button>

              <Block
                row
                style={{
                  paddingVertical: 3,
                  alignItems: "baseline",
                  marginTop: 15,
                  marginLeft: 100,
                }}
              >
                <Text size={16}>Don't have an account </Text>
                <Text
                  size={20}
                  color={theme.COLORS.PRIMARY}
                  onPress={() => this.props.navigation.navigate("Registration")}
                >
                  Signup
                </Text>
              </Block>
            </Fragment>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    margin: 10,
  },
  button: {
    marginTop: 30,
    borderRadius: 40,
  },
});
