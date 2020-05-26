//importing
import * as yup from "yup";
import { Formik } from "formik";
import { Text } from "galio-framework";
import React, { Component, Fragment } from "react";
import { AsyncStorage } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import {
  Container,
  Title,
  Forget,
  SignupLink,
  InputField,
  SigninButton,
  Blocked,
  Error,
} from "../styling/Login";

//constants
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//exporting class LoginScreen
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  //backend login call
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

    //checking if status is 200
    if (response.status === 200) {
      //setting token in local storage
      await AsyncStorage.setItem(
        "x-auth-token",
        response.headers.map["x-auth-token"]
      );
      //jumping to Home
      this.props.navigation.navigate("Home");
      showMessage({
        message: "Congratulation",
        description: "You have successfully loggedin",
        type: "success",
      });
    } else {
      showMessage({
        message: "Error in getting login",
        description:
          "Username or Password might be invalid, please double check it",
        type: "danger",
      });
    }
  }

  //handling submit button
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

  //rendering
  render() {
    return (
      <Container>
        {this.state.isLoading ? (
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="blueviolet"
          />
        ) : (
          <Title>Login</Title>
        )}
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup
              .string()
              .required()
              .matches(
                passwordReg,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
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
              <InputField
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                mode="flat"
                placeholder="Please enter your email"
              />
              {touched.email && errors.email && <Error>{errors.email}</Error>}
              <InputField
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                secureTextEntry={true}
                mode="flat"
                placeholder="Please enter your password"
              />
              {touched.password && errors.password && (
                <Error>{errors.password}</Error>
              )}
              <Forget
                size={16}
                onPress={() => this.props.navigation.navigate("ForgetPassword")}
              >
                Forgot password?
              </Forget>
              <SigninButton
                icon="login"
                mode="outlined"
                uppercase={false}
                disabled={!isValid || this.state.isLoading}
                onPress={handleSubmit}
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
              >
                Sign in
              </SigninButton>
              <Blocked row>
                <Text size={18}>Don't have an account </Text>
                <SignupLink
                  onPress={() => this.props.navigation.navigate("Registration")}
                >
                  Signup
                </SignupLink>
              </Blocked>
            </Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}
