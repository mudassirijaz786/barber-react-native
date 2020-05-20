//importing
import * as yup from "yup";
import { Formik } from "formik";
import React, { Component, Fragment } from "react";
import { AsyncStorage } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "galio-framework";
import { showMessage } from "react-native-flash-message";
import {
  Container,
  Title,
  TokenButton,
  EmailLink,
  SigninLink,
  Error,
  InputField,
  Blocked,
} from "../styling/TokenSignup";

//exporting class TokenSignupScreen
export default class TokenSignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isLoading: false,
    };
  }

  //calling backend tokenSignup
  async tokenSignup(JsonObj) {
    this.setState({ isLoading: true });
    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignUp/verify/account/token",
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JsonObj),
      }
    );

    //checking response status 200
    if (response.status === 200) {
      this.setState({ isLoading: false });

      //setting token to locally
      await AsyncStorage.setItem(
        "x-auth-token",
        response.headers.map["x-auth-token"]
      );
      showMessage({
        message: "Token validated",
        description: "Token validated successfully",
        type: "success",
      });
      this.props.navigation.navigate("Home");
    } else {
      this.setState({ isLoading: false });
      showMessage({
        message: "Token validation error",
        description: "There occured an error while validating token",
        type: "danger",
      });
    }
  }

  //handling input fields
  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["token"] = values.token;
      this.tokenSignup(obj);
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
          <Title>Signup Token</Title>
        )}
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            token: yup
              .string()
              .required()
              .matches(/^[0-9]{5}$/, "Token must be equal to 5 digit"),
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
                label="Token"
                value={values.token}
                onChangeText={handleChange("token")}
                onBlur={() => setFieldTouched("token")}
                placeholder="please enter your token"
                mode="flat"
                keyboardType={"phone-pad"}
              />
              {touched.token && errors.token && <Error>{errors.token}</Error>}
              <TokenButton
                icon="key"
                disabled={!isValid || this.state.isLoading}
                mode="outlined"
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
                onPress={handleSubmit}
                uppercase={false}
              >
                Proceed further
              </TokenButton>
              <Blocked row>
                <Text size={18}>Did not get token yet? </Text>
                <EmailLink
                  onPress={() => this.props.navigation.navigate("Registration")}
                >
                  Enter email again
                </EmailLink>
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
