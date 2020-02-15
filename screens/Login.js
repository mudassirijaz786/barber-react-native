import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Title  } from 'react-native-paper';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMsg: "",
    }
  }
  async loginCall(JsonObj) { 

  }

  async handleSubmit(values) {
    if (values){
      var obj = {};    
      console.log("EMAIL: ", values.email)
      console.log("PASSWORD: ", values.password)
      obj["email"] = values.email;
      obj["password"] = values.password; 
      // this.loginCall(obj); 
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Login</Title>
        <Formik
          initialValues={this.state}      
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email()
              .required(),
            password: yup
              .string()
              .min(6)
              .required(),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
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
                label="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry={true}
              />
              {touched.password && errors.password &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }
              <Button style={{marginTop: 30}} icon="login" disabled={!isValid} mode="contained" onPress={handleSubmit}>
                Sign in
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
