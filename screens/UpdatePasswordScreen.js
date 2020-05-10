//importing
import * as yup from "yup";
import { Formik } from "formik";
import React, { Component, Fragment } from "react";
import { AsyncStorage } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import { Icon } from "native-base";
import {
  Container,
  InputField,
  Title,
  UpdatePasswordButton,
  Error,
} from "../styling/UpdatePassword";

//exporting UpdatePasswordScreen
export default class UpdatePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: "",
      password: "",
      confirmpassword: "",
      errorMsg: "",
      isLoading: false,
    };
  }

  //header update password
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Update password",
      headerLeft: (
        <Icon
          onPress={() => navigation.goBack()}
          name="back"
          type="AntDesign"
          style={{ marginLeft: 10 }}
        />
      ),
    };
  };

  //password reset
  async passwordResetAPICall(JsonObj) {
    //getting token from local storage
    const token = await AsyncStorage.getItem("x-auth-token");
    this.setState({ isLoading: true });
    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignup/change/password",
      {
        method: "put",
        headers: {
          Accept: "application/json, text/plain, */*",
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JsonObj),
      }
    );

    // checking if status is 200
    if (response.status === 200) {
      this.setState({ isLoading: false });
      showMessage({
        message: "Password updated successfully",
        type: "success",
      });
      this.props.navigation.navigate("Profile");
    } else {
      this.setState({ isLoading: false });
      showMessage({
        message: "Password is not updated",
        type: "danger",
      });
    }
  }
  //handling input fields
  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["oldpassword"] = values.oldpassword;
      obj["password"] = values.password;
      obj["confirmpassword"] = values.confirmpassword;
      obj["x-auth-token"] = await AsyncStorage.getItem("x-auth-token");
      this.passwordResetAPICall(obj);
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
            color="#0000ff"
          />
        ) : (
          <Title>Reset Password</Title>
        )}
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            oldpassword: yup.string().required(),
            password: yup.string().min(3).required(),
            confirmpassword: yup
              .string()
              .required()
              .test("passwords-match", "Passwords must match", function (
                value
              ) {
                return this.parent.password === value;
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
                label="old password"
                value={values.oldpassword}
                onChangeText={handleChange("oldpassword")}
                onBlur={() => setFieldTouched("oldpassword")}
                secureTextEntry={true}
                mode="flat"
                placeholder="please enter your old password"
              />
              {touched.oldpassword && errors.oldpassword && (
                <Error>{errors.oldpassword}</Error>
              )}
              <InputField
                label="password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                placeholder="please enter your new password"
                mode="flat"
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Error>{errors.password}</Error>
              )}
              <InputField
                label="confirmPassword"
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
              <UpdatePasswordButton
                icon="content-save-edit-outline"
                disabled={!isValid || this.state.isLoading}
                uppercase={false}
                loading={this.state.isLoading}
                mode="outlined"
                contentStyle={{ height: 50 }}
                onPress={handleSubmit}
              >
                Reset Password
              </UpdatePasswordButton>
            </Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}
