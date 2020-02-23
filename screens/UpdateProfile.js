import React, {Fragment} from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { TextInput, Button, Title,ActivityIndicator, Colors  } from 'react-native-paper';

import * as yup from 'yup'
import { Formik } from 'formik'
const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export default class UpdateProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "dasdasd",
            email: "dasdasdasd@gmail.com",
            phone: "23423213123",
            errorMsg: "",
        }
      }
      async loginCall(JsonObj) { 
        const response = await fetch('https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/UserLogin', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(JsonObj)
        })
        if(response.status === 200){
          <ActivityIndicator animating={true} color={Colors.blue800} />
          this.props.navigation.navigate('Home')
           console.log("RESPONSE", response.headers.map["x-auth-token"])
          await AsyncStorage.setItem("x-auth-token", response.headers.map["x-auth-token"]).then((res)=>{
            console.log("Login token set")
          })
          .catch(err=>{
            console.log(err)
          })
    
        } else{
          this.setState({
            errorMsg: "Invalid username or password"
          })
        }
      }
    
      
      async handleSubmit(values) {
        if (values){
          var obj = {};    
          console.log("EMAIL: ", values.email)
          console.log("PASSWORD: ", values.password)
          obj["email"] = values.email;
          obj["password"] = values.password; 
          this.loginCall(obj); 
        }
      }
      
  render() {
    const { navigation } = this.props;

    return (
        <View style={styles.container}>
        <Text color="black" size={28} style={{ paddingBottom: 8, marginLeft: 100}}>Update your profile</Text>
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
              .matches(phoneRegExp, 'Phone number is not valid')
           
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
            <TextInput
                label="name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                style={{marginTop: 15}}
                mode="outlined"


              />
              {touched.name && errors.name &&
                <Text style={{ fontSize: 12, color: 'red' }}>{errors.name}</Text>
              }

              <TextInput
                label="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                style={{marginTop: 15}}
                mode="outlined"


              />
              {touched.email && errors.email &&
                <Text style={{ fontSize: 12, color: 'red' }}>{errors.email}</Text>
              }
              
              <TextInput
                label="phone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone')}
                formikKey="phone"
                style={{marginTop: 15}}
                keyboardType={'phone-pad'}
                mode="outlined"


              />
              {touched.phone && errors.phone &&
                <Text style={{ fontSize: 12, color: 'red' }}>{errors.phone}</Text>
              }

              <Text style={{color: "red"}}>{this.state.errorMsg}</Text>


              <Button style={{marginTop: 30}} icon="login" disabled={!isValid} mode="contained" onPress={handleSubmit}>
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
        marginTop: 30
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: 'relative',
        bottom: theme.SIZES.BASE,
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
    },
    input: {
        margin: 10
    }
});
