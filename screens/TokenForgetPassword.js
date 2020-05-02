import * as yup from "yup";
import { Formik } from "formik";
import React, { Component, Fragment } from "react";
import { StyleSheet, View } from "react-native";
import {
  TextInput,
  Button,
  Title,
  ActivityIndicator,
} from "react-native-paper";
import { Block, theme, Text } from "galio-framework";
import { showMessage } from "react-native-flash-message";

export default class TokenForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "69775",
      errorMsg: "",
      newpassword: "123123",
      confirmpassword: "123123",
      isLoading: false,
    };
  }
  async loginCall(JsonObj) {
    // const token = await AsyncStorage.getItem("x-auth-token");
    this.setState({ isLoading: true });

    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignUp/verify_code/and/update_password",
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // "x-auth-token": token,
        },
        body: JSON.stringify(JsonObj),
      }
    );
    if (response.status === 200) {
      this.setState({ isLoading: false });

      showMessage({
        message: "Password reset successfully",
        type: "success",
      });
      this.props.navigation.navigate("Login");
    } else {
      this.setState({ isLoading: false });

      showMessage({
        message: "There occured an error",
        type: "danger",
      });
    }
  }
  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["token"] = values.token;
      obj["newpassword"] = values.newpassword;
      obj["confirmpassword"] = values.confirmpassword;
      // this.setState({ isLoading: true });

      this.loginCall(obj);
      // this.setState({ isLoading: false });
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
          <Title
            color="black"
            size={28}
            style={{ paddingBottom: 8, marginLeft: 120 }}
          >
            Token screen
          </Title>
        )}
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            token: yup.string().required(),
            newpassword: yup.string().min(3).required(),
            confirmpassword: yup
              .string()
              .required()
              .test("passwords-match", "Passwords must match", function (
                value
              ) {
                return this.parent.newpassword === value;
              }),
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
                label="token"
                value={values.token}
                onChangeText={handleChange("token")}
                onBlur={() => setFieldTouched("token")}
                placeholder="please enter your token"
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                mode="flat"
                keyboardType={"phone-pad"}
              />
              {touched.token && errors.token && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.token}
                </Text>
              )}
              <TextInput
                label="newpassword"
                value={values.newpassword}
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                onChangeText={handleChange("newpassword")}
                onBlur={() => setFieldTouched("newpassword")}
                placeholder="please enter your new password"
                mode="flat"
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.password}
                </Text>
              )}
              <TextInput
                label="confirmPassword"
                value={values.confirmpassword}
                onChangeText={handleChange("confirmpassword")}
                onBlur={() => setFieldTouched("confirmpassword")}
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                placeholder="please confirm your new password"
                mode="flat"
                secureTextEntry={true}
              />
              {touched.confirmpassword && errors.confirmpassword && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.confirmpassword}
                </Text>
              )}
              <Button
                style={{ marginTop: 30, borderRadius: 40 }}
                icon="cached"
                disabled={!isValid || this.state.isLoading}
                mode="outlined"
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
                onPress={handleSubmit}
                uppercase={false}
              >
                Proceed further
              </Button>

              <Block
                row
                style={{
                  paddingVertical: 3,
                  alignItems: "baseline",
                  marginTop: 20,
                  marginLeft: 100,
                }}
              >
                <Text size={16}>Don't have an account? </Text>
                <Text
                  size={16}
                  color={theme.COLORS.PRIMARY}
                  onPress={() => this.props.navigation.navigate("Registration")}
                >
                  Signup
                </Text>
              </Block>
              <Block
                row
                style={{
                  paddingVertical: 3,
                  alignItems: "baseline",
                  marginTop: 2,
                  marginLeft: 100,
                }}
              >
                <Text size={16}>Have an account? </Text>
                <Text
                  size={16}
                  color={theme.COLORS.PRIMARY}
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  Login
                </Text>
              </Block>

              <Block
                row
                style={{
                  paddingVertical: 3,
                  alignItems: "baseline",
                  marginTop: 2,
                  marginLeft: 100,
                }}
              >
                <Text size={16}>Back to forget password screen? </Text>
                <Text
                  size={16}
                  color={theme.COLORS.PRIMARY}
                  onPress={() =>
                    this.props.navigation.navigate("ForgetPassword")
                  }
                >
                  back
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
});
