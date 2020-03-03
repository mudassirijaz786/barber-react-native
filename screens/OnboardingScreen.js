import * as yup from "yup";
import { Formik } from "formik";
import { Block, Text, theme } from "galio-framework";

import React, { Component, Fragment } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions
} from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
const { height, width } = Dimensions.get("screen");
import Login from "../screens/Login";
import materialTheme from "../constants/Theme";
import Images from "../constants/Images";

import TimePicker from "../screens/TimePicker";
export default class OnboardingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMsg: ""
    };
  }
  async loginCall(JsonObj) {
    const response = await fetch(
      "https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/UserLogin",
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
          console.log("Login token set");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        errorMsg: "Invalid username or password"
      });
    }
  }

  async handleSubmit(values) {
    if (values) {
      var obj = {};
      console.log("EMAIL: ", values.email);
      console.log("PASSWORD: ", values.password);
      obj["email"] = values.email;
      obj["password"] = values.password;
      this.loginCall(obj);
    }
  }

  render() {
    return (
      //   <View style={styles.container}>
      //     <Title style={styles.title}>Login</Title>
      //     <Formik
      //       initialValues={this.state}
      //       onSubmit={this.handleSubmit.bind(this)}
      //       validationSchema={yup.object().shape({
      //         email: yup
      //           .string()
      //           .email()
      //           .required(),
      //         password: yup
      //           .string()
      //           .min(6)
      //           .required(),
      //       })}
      //     >
      //       {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
      //         <Fragment>
      //           <TextInput
      //             label="email"
      //             value={values.email}
      //             onChangeText={handleChange('email')}
      //             onBlur={() => setFieldTouched('email')}
      //           />
      //           {touched.email && errors.email &&
      //             <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
      //           }
      //           <TextInput
      //             label="password"
      //             value={values.password}
      //             onChangeText={handleChange('password')}
      //             onBlur={() => setFieldTouched('password')}
      //             secureTextEntry={true}
      //           />
      //           {touched.password && errors.password &&
      //             <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
      //           }

      //           <Text style={{color: "red"}}>{this.state.errorMsg}</Text>

      //           <Button style={{marginTop: 30}} icon="login" disabled={!isValid} mode="contained" onPress={handleSubmit}>
      //             Sign in
      //           </Button>
      //           {/* <Button style={{marginTop: 30}} icon="login" disabled={!isValid} mode="contained" onPress={() => this.props.navigation.navigate('Home')}>
      //             Home
      //           </Button> */}

      //           {/* <Block row space="between" style={{ paddingVertical: 3, alignItems: 'baseline' }}>
      //             <Text size={16}>Don't have an account</Text>
      //             <Text size={16} color={theme.COLORS.PRIMARY} onPress={() => this.props.navigation.navigate('Registration')}>Signup</Text>
      //           </Block> */}
      //         </Fragment>
      //       )}
      //     </Formik>
      //   </View>
      // <Login/>
      <TimePicker />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  title: {
    fontWeight: "bold",
    marginTop: 50
  },
  input: {
    margin: 10
  }
});
