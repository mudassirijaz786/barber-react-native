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
  EmailLink,
  SigninLink,
  SignupLink,
} from "../styling/TokenForgetPassword";

//some constant
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//exporting TokenForgetPasswordScreen
export default class TokenForgetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      errorMsg: "",
      newpassword: "",
      confirmpassword: "",
      isLoading: false,
    };
  }

  //calling backend reset password
  async resetPasswordCall(JsonObj) {
    this.setState({ isLoading: true });
    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignUp/verify_code/and/update_password",
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
      this.setState({ isLoading: false });
      showMessage({
        message: "Password reset successfully",
        type: "success",
      });

      //moving to Login screen
      this.props.navigation.navigate("Login");
    } else {
      this.setState({ isLoading: false });
      showMessage({
        message: "There occured an error",
        type: "danger",
      });
    }
  }

  //handling input fields
  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["token"] = values.token;
      obj["newpassword"] = values.newpassword;
      obj["confirmpassword"] = values.confirmpassword;
      this.resetPasswordCall(obj);
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
          <Title>Reset Password</Title>
        )}
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            token: yup
              .string()
              .required()
              .matches(/^[0-9]{5}$/, "Token must be equal to 5 digit"),
            newpassword: yup
              .string()
              .required()
              .matches(
                passwordReg,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
            confirmpassword: yup
              .string()
              .required()
              .matches(
                passwordReg,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              )
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
              <InputField
                label="New Password"
                value={values.newpassword}
                onChangeText={handleChange("newpassword")}
                onBlur={() => setFieldTouched("newpassword")}
                placeholder="please enter your new password"
                mode="flat"
                secureTextEntry={true}
              />
              {touched.newpassword && errors.newpassword && (
                <Error>{errors.newpassword}</Error>
              )}
              <InputField
                label="Confirm New Password"
                value={values.confirmpassword}
                onChangeText={handleChange("confirmpassword")}
                onBlur={() => setFieldTouched("confirmpassword")}
                placeholder="please confirm your new password"
                mode="flat"
                secureTextEntry={true}
              />
              {touched.confirmpassword && errors.confirmpassword && (
                <Error>{errors.confirmpassword}</Error>
              )}
              <ForgetPasswordButton
                icon="key"
                disabled={!isValid || this.state.isLoading}
                mode="outlined"
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
                onPress={handleSubmit}
                uppercase={false}
              >
                Proceed further
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
              <Blocked row>
                <Text size={18}>Did not get token yet? </Text>
                <EmailLink
                  onPress={() =>
                    this.props.navigation.navigate("ForgetPassword")
                  }
                >
                  Enter email again
                </EmailLink>
              </Blocked>
            </Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}
