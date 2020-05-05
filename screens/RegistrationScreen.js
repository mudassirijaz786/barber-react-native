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
  LoginLink,
  InputField,
  SignupButton,
  Blocked,
  Error,
} from "../styling/Registration";

//checking phone number expression
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

//exporting class RegistrationScreen
export default class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "mudassir",
      email: "ijazmudassir786@gmail.com",
      phone: "123123123123",
      password: "123123123",
      isLoading: false,
    };
  }

  //signup backend api call
  async SignupApiCall(JsonObj) {
    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignUp",
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
      showMessage({
        message: "Token sent to email successfully",
        type: "success",
      });
      this.setState({ isLoading: false });

      //moving to token screen for signup
      this.props.navigation.navigate("TokenSignup");
    } else {
      this.setState({ isLoading: false });
      showMessage({
        message: "Email or password already exists in system",
        type: "danger",
      });
    }
  }

  //handling input fields
  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["name"] = values.name;
      obj["email"] = values.email;
      obj["phnnbr"] = values.phone;
      obj["password"] = values.password;
      this.setState({ isLoading: true });
      await this.SignupApiCall(obj);
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
          <Title>Registration</Title>
        )}
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            name: yup.string().required().min(3),
            phone: yup
              .string()
              .required()
              .matches(phoneRegExp, "Phone number is not valid"),
            password: yup.string().min(8).max(25).required(),
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
                label="Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
                placeholder="please enter your name"
                mode="flat"
              />
              {touched.name && errors.name && <Error>{errors.name}</Error>}
              <InputField
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="please enter your email"
                mode="flat"
              />
              {touched.email && errors.email && <Error>{errors.email}</Error>}
              <InputField
                label="Phone"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={() => setFieldTouched("phone")}
                formikKey="phone"
                placeholder="please enter your phone"
                keyboardType={"phone-pad"}
                mode="flat"
              />
              {touched.phone && errors.phone && <Error>{errors.phone}</Error>}
              <InputField
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                secureTextEntry={true}
                placeholder="please enter your password"
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                mode="flat"
              />
              {touched.password && errors.password && (
                <Error>{errors.password}</Error>
              )}
              <SignupButton
                icon="account-box"
                disabled={!isValid || this.state.isLoading}
                mode="outlined"
                onPress={handleSubmit}
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
                uppercase={false}
              >
                Sign up
              </SignupButton>
              <Blocked row>
                <Text size={18}>Have an account? </Text>
                <LoginLink
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  Login
                </LoginLink>
              </Blocked>
            </Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}
