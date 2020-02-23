import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react';
import { Alert, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { TextInput, Button, Title  } from 'react-native-paper';
import axios from "react-native-axios"
export default class ResetPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      oldpassword: "",
      password: "",
      confirmpassword: "",
      errorMsg: "",
    }
  }
  async passwordResetAPICall(JsonObj) { 
    const token = await AsyncStorage.getItem("x-auth-token")
    console.log("BEFORE REQUEST THE TOKEN = ", token)
    const response = await fetch('https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/UserSignup/change/password', {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JsonObj)
    })
    console.log(response.headers["Authorization"])
    if(response.status === 200){
        console.log("updated successfully")
        this.props.navigation.navigate('Home')

    } else{
      this.setState({
        errorMsg: "does not update password"
      })
    }
                // const headers = () => {
                //   const h = new Headers()
                //   h.append("Content-Type"), 'application/json'
                //   const session = {
                //     token: token
                //   }
                //   if(session.token){
                //     h.append("x-auth-token", session.token)
                //   }
                //   return h
                // }

                // const response = await fetch('https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/change/password', {
                //   method: 'post', 
                //   body: JSON.stringify(JsonObj),
                //   headers: headers})
                //   console.log("response", response)
                // // console.log("token", token)

                // if(response.status === 200){
                //   console.log("Password changed")
                // } else{
                //   this.setState({
                //     errorMsg: "Password did not reset"
                //   })
                // }
    // const headers = () => {
    //   const h = new Headers()
    //   h.append("Content-Type"), 'application/json'
    //   const session = {
    //     token: await AsyncStorage.getItem("x-auth-token")
    //   }
    //   if(session.token){
    //     h.append("x-auth-token", session.token)
    //   }
    //   return h
    // }

    // const request = (method, url, body) => {
    //   const url =  "https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/change/password"
    //   const options = {method, headers: headers()}
    //   if(body){
    //     options.body = JSON.stringify(body)
    //   }
    //   return fetch(new Request(url, options))
    // }

    // const api = {
    //   post(path, data = {}){
    //     return request("POST", path, data)
    //   }
    // }
    // await axios.post(
    //   'https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/change/password',
    //   JsonObj,{
    //     headers:{
    //       'x-auth-token': token,
    //       'Accept':'application/json',
    //       'Content-type':'application/json'
    //    } }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log("not found", error);
    //   });

  }
  async handleSubmit(values) {
    if (values){
      var obj = {};    
      console.log("OLD PASSWORD", values.oldpassword)
      console.log("PASSWORD: ", values.password)
      console.log("CONFIRM PASSWORD: ", values.confirmpassword)
      obj["oldpassword"] = values.oldpassword; 
      obj["password"] = values.password;
      obj["confirmpassword"] = values.confirmpassword; 
      obj["x-auth-token"] = await AsyncStorage.getItem("x-auth-token")
      console.log("token", await AsyncStorage.getItem("x-auth-token"))
      this.passwordResetAPICall(obj); 
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Button style={{marginBottom: 40}} icon="login" mode="outlined" onPress={() => this.props.navigation.navigate('Home')}>
          back to home
        </Button>    
        <Title color="black" size={28} style={{ paddingBottom: 8, marginLeft: 130}}>Reset Password</Title>
        <Formik
          initialValues={this.state}      
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            oldpassword: yup
              .string()
              .required(),
            password: yup
              .string()
              .min(3)
              .required(),
            confirmpassword: yup
              .string()
              .required()
              .test('passwords-match', 'Passwords must match', function(value) {
                return this.parent.password === value;
              })
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
              <TextInput
                label="old password"
                value={values.oldpassword}
                onChangeText={handleChange('oldpassword')}
                onBlur={() => setFieldTouched('oldpassword')}
                secureTextEntry={true}
                style={{marginTop: 15}}
              />
              {touched.oldpassword && errors.oldpassword &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.oldpassword}</Text>
              }
              <TextInput
                label="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                style={{marginTop: 15}}
                secureTextEntry={true}
              />
              {touched.password && errors.password &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }
              <TextInput
                label="confirmPassword"
                value={values.confirmpassword}
                onChangeText={handleChange('confirmpassword')}
                onBlur={() => setFieldTouched('confirmpassword')}
                style={{marginTop: 15}}
                secureTextEntry={true}
              />
              {touched.confirmpassword && errors.confirmpassword &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmpassword}</Text>
              }
                <Text style={{color: "red"}}>{this.state.errorMsg}</Text>
              <Button style={{marginTop: 30}} icon="cached" disabled={!isValid} mode="contained" onPress={handleSubmit}>
                Reset Password
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
    marginRight: 10
  },
  input: {
    margin: 10
  }
});
