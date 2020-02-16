import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react';
import { Alert, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { TextInput, Button, Title  } from 'react-native-paper';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export default class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "mudassir",
      email: "mudassir@gmail.com",
      phone: "12345678901234567890",
      password: "12345678",
      errorMsg: "",
    }
  }

   async SignupApiCall(JsonObj) {

    const response = await fetch('https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/UserSignUp', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JsonObj)
    })
    if(response.status === 200){
       console.log("RESPONSE", response.headers.map["x-auth-token"])
      await AsyncStorage.setItem("x-auth-token", response.headers.map["x-auth-token"]).then((res)=>{
        console.log("Sign up token set")
      })
      .catch(err=>{
        console.log(err)
      })
    } else{
      this.setState({
        errorMsg: "Email or password already present"
      })
    }
  }
  async handleSubmit(values) {
    if (values){
      var obj = {};    
      console.log("NAME: ", values.name)
      console.log("EMAIL: ", values.email)
      console.log("PHONE: ", values.phone)
      console.log("PASSWORD: ", values.password)
      obj["name"] = values.name;
      obj["email"] = values.email;
      obj["phnnbr"] = values.phone; 
      obj["password"] = values.password; 
      this.SignupApiCall(obj); 
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Registration</Title>
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
              .matches(phoneRegExp, 'Phone number is not valid'),
            password: yup
              .string()
              .min(8)
              .max(25)
              .required(),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
              <TextInput
                label="name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              {touched.name && errors.name &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
              }

              <TextInput
                label="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
              }
              
              <TextInput
                label="phone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone')}
                formikKey="phone"
              />
              {touched.phone && errors.phone &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.phone}</Text>
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

              <Text style={{color: "red"}}>{this.state.errorMsg}</Text>

              <Button style={{marginTop: 30}} icon="account-box" disabled={!isValid} mode="contained" onPress={handleSubmit}>
                Sign up
              </Button>
            
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
