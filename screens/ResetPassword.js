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
      oldPassword: "12345678",
      password: "123123123",
      confirmPassword: "123123123",
      errorMsg: "",
    }


  }



  async passwordResetAPICall(JsonObj) { 
    const token = await AsyncStorage.getItem("x-auth-token")
    console.log("BEFORE REQUEST THE TOKEN = ", token)



    // const response = await fetch('https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/change/password', {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Authorization': token,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(JsonObj)
    // })
    // console.log("response", response.headers)
    // console.log("token", token)


      const response = await fetch('https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/change/password', {
        method: 'post', 
        body: JSON.stringify(JsonObj),
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        }})
      console.log("response", response)
      // console.log("token", token)

      if(response.status === 200){
        console.log("Password changed")
      } else{
        this.setState({
          errorMsg: "Password did not reset"
        })
      }


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
      console.log("OLD PASSWORD", values.oldPassword)
      console.log("PASSWORD: ", values.password)
      console.log("CONFIRM PASSWORD: ", values.confirmPassword)
      obj["oldpassword"] = values.oldPassword; 
      obj["newpassword"] = values.password;
      obj["confirmpassword"] = values.confirmPassword; 
      obj["x-auth-token"] = await AsyncStorage.getItem("x-auth-token")


      this.passwordResetAPICall(obj); 
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Reset Password</Title>
        <Formik
          initialValues={this.state}      
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            oldPassword: yup
              .string()
              .required(),
            password: yup
              .string()
              .min(8)
              .required(),
            confirmPassword: yup
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
                value={values.oldPassword}
                onChangeText={handleChange('oldPassword')}
                onBlur={() => setFieldTouched('oldPassword')}
                secureTextEntry={true}

              />
              {touched.password && errors.password &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }

              <TextInput
                label="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry={true}

              />
              {touched.password && errors.password &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }

              <TextInput
                label="confirmPassword"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
                secureTextEntry={true}

              />
              {touched.confirmPassword && errors.confirmPassword &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmPassword}</Text>
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
    marginTop: 50
  }, 
  title: {
    fontWeight: 'bold',
    marginTop: 50
  },
  input: {
    margin: 10
  }
});
