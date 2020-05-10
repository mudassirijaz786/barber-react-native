//importing
import * as yup from "yup";
import { Formik } from "formik";
import React, { Component, Fragment } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "galio-framework";
import { showMessage } from "react-native-flash-message";
import {
  Container,
  InputField,
  Title,
  ForgetPasswordButton,
  Blocked,
  Error,
  SigninLink,
  SignupLink,
} from "../styling/ForgetPassword";

//exporting ForgetPasswordScreen
export default class ForgetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorMsg: "",
      isLoading: false,
    };
  }

  //backend forget Token Call
  async forgetTokenCall(JsonObj) {
    this.setState({ isLoading: true });
    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignup/forgot/password",
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JsonObj),
      }
    );

    //check if status is 200
    if (response.status === 200) {
      this.setState({ isLoading: false });
      showMessage({
        message: "Token sent successfully to your email",
        type: "success",
      });

      //moving to TokenForgetPassword
      this.props.navigation.navigate("TokenForgetPassword");
    } else {
      this.setState({ isLoading: false });
      showMessage({
        message: "There occured an error",
        type: "danger",
      });
    }
  }

  //handeling input field
  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["email"] = values.email;
      this.forgetTokenCall(obj);
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
          <Title>Forget password</Title>
        )}
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
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
                placeholder="please enter your email"
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                mode="flat"
              />
              {touched.email && errors.email && <Error>{errors.email}</Error>}
              <ForgetPasswordButton
                icon="cached"
                disabled={!isValid || this.state.isLoading}
                mode="outlined"
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
                onPress={handleSubmit}
                uppercase={false}
              >
                Get token
              </ForgetPasswordButton>
              <Blocked row>
                <Text size={18}>Don't have an account? </Text>
                <SignupLink
                  onPress={() => this.props.navigation.navigate("Registration")}
                >
                  Signup
                </SignupLink>
              </Blocked>
              <Blocked row>
                <Text size={18}>Have an account? </Text>
                <SigninLink
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  Login
                </SigninLink>
              </Blocked>
            </Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}
