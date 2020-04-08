import * as yup from "yup";
import { Formik } from "formik";
import { Block, Text, theme } from "galio-framework";
import React, { Component, Fragment, Keyboard } from "react";
import { Alert, StyleSheet, View, AsyncStorage } from "react-native";
import {
  TextInput,
  Button,
  Title,
  ActivityIndicator
} from "react-native-paper";
import { showMessage, hideMessage } from "react-native-flash-message";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "mudassir",
      email: "ijazmudassir786@gmail.com",
      phone: "123123123123",
      password: "123123123",
      errorMsg: "",
      keyboardOffset: 0,
      isLoading: false
    };
  }
  async SignupApiCall(JsonObj) {
    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignUp",
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(JsonObj)
      }
    );
    if (response.status === 200) {
      this.props.navigation.navigate("Home");
      console.log("RESPONSE", response.headers.map["x-auth-token"]);
      await AsyncStorage.setItem(
        "x-auth-token",
        response.headers.map["x-auth-token"]
      )
        .then(res => {
          console.log("Sign up token set");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      showMessage({
        message: "Email or password already exists in system",
        type: "danger"
      });
    }
  }
  async handleSubmit(values) {
    if (values) {
      var obj = {};
      console.log("NAME: ", values.name);
      console.log("EMAIL: ", values.email);
      console.log("PHONE: ", values.phone);
      console.log("PASSWORD: ", values.password);
      obj["name"] = values.name;
      obj["email"] = values.email;
      obj["phnnbr"] = values.phone;
      obj["password"] = values.password;
      this.setState({ isLoading: true });
      await this.SignupApiCall(obj);
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
            Registration
          </Text>
        )}

        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email()
              .required(),
            name: yup
              .string()
              .required()
              .min(3),
            phone: yup
              .string()
              .required()
              .matches(phoneRegExp, "Phone number is not valid"),
            password: yup
              .string()
              .min(8)
              .max(25)
              .required()
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit
          }) => (
            <Fragment>
              <TextInput
                label="name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
                //background color ?

                style={{ marginTop: 15, backgroundColor: "transparent" }}
                placeholder="please enter your name"
                mode="flat"
              />
              {touched.name && errors.name && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.name}
                </Text>
              )}
              <TextInput
                label="email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                //background color ?
                placeholder="please enter your email"
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                mode="flat"
              />
              {touched.email && errors.email && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.email}
                </Text>
              )}
              <TextInput
                label="phone"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={() => setFieldTouched("phone")}
                formikKey="phone"
                //background color ?
                placeholder="please enter your phone"
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                keyboardType={"phone-pad"}
                mode="flat"
              />
              {touched.phone && errors.phone && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.phone}
                </Text>
              )}
              <TextInput
                label="password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                secureTextEntry={true}
                //background color ?
                placeholder="please enter your password"
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                mode="flat"
              />
              {touched.password && errors.password && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.password}
                </Text>
              )}
              <Button
                style={styles.button}
                icon="account-box"
                disabled={!isValid || this.state.isLoading}
                mode="outlined"
                onPress={handleSubmit}
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
                uppercase={false}
              >
                Sign up
              </Button>
              <Block
                row
                style={{
                  paddingVertical: 3,
                  alignItems: "baseline",
                  marginTop: 20,
                  marginLeft: 100
                }}
              >
                <Text size={16}>Have an account</Text>
                <Text
                  size={16}
                  color={theme.COLORS.PRIMARY}
                  onPress={() => this.props.navigation.navigate("Onboarding")}
                >
                  {" "}
                  Login
                </Text>
              </Block>
            </Fragment>
          )}
        </Formik>
        {/* <PhoneInput ref={formikKey}/> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    margin: 10
  },
  button: {
    marginTop: 30,
    borderRadius: 40
  }
});
