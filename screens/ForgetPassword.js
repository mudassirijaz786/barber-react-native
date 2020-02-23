import * as yup from 'yup'
import { Formik } from 'formik'
import React, { Component, Fragment } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Title  } from 'react-native-paper';
export default class ForgetPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      errorMsg: "",
    }
  }
  async loginCall(JsonObj) {  
    const response = await fetch('https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/UserSignup/forgot/password', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JsonObj)
    })
    if(response.status === 200){
        console.log("email sent successfully")
    } else{
      this.setState({
        errorMsg: "email does not send successfully"
      })
    }
  }
  async handleSubmit(values) {
    if (values){
      var obj = {};    
      console.log("EMAIL: ", values.email)
      obj["email"] = values.email;
      // this.loginCall(obj); 
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Title color="black" size={28} style={{ paddingBottom: 8, marginLeft: 130}}>Forget Password</Title>
        <Formik
          initialValues={this.state}      
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email()
              .required()
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
              <Button style={{marginTop: 30}} icon="cached" disabled={!isValid} mode="contained" onPress={handleSubmit}>
                Forget Password
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
    marginTop: 200,
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    margin: 10
  }
});
