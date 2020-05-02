import React, { Fragment } from "react";
import { StyleSheet, Dimensions, View, AsyncStorage } from "react-native";
import { Text, theme } from "galio-framework";
import {
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import * as yup from "yup";
import { Formik } from "formik";
const { width } = Dimensions.get("screen");
import { showMessage } from "react-native-flash-message";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "dasdasd",
      email: "ijazmudassir786@gmail.com",
      phnnbr: "23423213123",
      errorMsg: "",
      isLoading: false,
    };
  }
  async loginCall(JsonObj) {
    const value = await AsyncStorage.getItem("x-auth-token");
    this.setState({ isLoading: true });

    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignUp/",
      {
        method: "put",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "x-auth-token": value,
        },
        body: JSON.stringify(JsonObj),
      }
    );
    if (response.status === 200) {
      this.setState({ isLoading: false });

      showMessage({
        message: "Profile updated successfully",
        type: "success",
      });
    } else {
      this.setState({ isLoading: false });

      showMessage({
        message: "Profile could not be updated",
        type: "danger",
      });
    }
  }

  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["name"] = values.name;
      obj["email"] = values.email;
      obj["phnnbr"] = values.phone;

      this.loginCall(obj);
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
            style={{ paddingBottom: 8, marginLeft: 100 }}
          >
            Update your profile
          </Text>
        )}

        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            name: yup.string().required().min(3),
            phone: yup.string().required().min(8),
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
                Update Profile
              </Button>
            </Fragment>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  input: {
    margin: 10,
  },
  button: {
    marginTop: 30,
    borderRadius: 40,
  },
});
