import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Title  } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input'
import CountryPicker from 'react-native-country-picker-modal';

export default class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      cca2: 'US',
      password: "",
      errorMsg: "",
    }

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }

  onPressFlag(){
    this.myCountryPicker.open()
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  componentDidMount(){
    this.setState({
      pickerData: this.phone.getPickerData(),
    })
  }

  async loginCall(JsonObj) { 

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
      obj["phone"] = values.phone; 
      obj["password"] = values.password; 
      // this.loginCall(obj); 
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
              .min(3)
              .max(7),
            // phone: yup
            //   .number()
            //   .positive()
            //   .required(),
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
              
              {/* <TextInput
                label="phone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone')}
                formikKey="phone"
              />
              {touched.phone && errors.phone &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.phone}</Text>
              } */}
             
             {/* <PhoneInput   label="phone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                formikKey="phone"
                onBlur={() => setFieldTouched('phone')}/> */}
              <PhoneInput
                ref={(ref) => {
                  this.phone = ref;
                }}
                onPressFlag={this.onPressFlag}
              />

              <CountryPicker
                ref={(ref) => {
                  this.countryPicker = ref;
                }}
                onChange={value => this.selectCountry(value)}
                translation="eng"
                cca2={this.state.cca2}
              >
                <View />
              </CountryPicker>

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
