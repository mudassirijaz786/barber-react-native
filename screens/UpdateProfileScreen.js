//importing
import React, { Fragment } from "react";
import { AsyncStorage } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import * as yup from "yup";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import { Icon } from "native-base";
import {
  Container,
  InputField,
  Title,
  UpdateProfileButton,
  Error,
} from "../styling/UpdateProfile";

//some constants
const phoneReg = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

//exporting class UpdateProfileScreen
export default class UpdateProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phnnbr: "",
      errorMsg: "",
      isLoading: false,
    };
  }

  //header update profile
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Update profile",
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

  //updating profile
  async updateProfileCall(JsonObj) {
    //getting token from local storage
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

    //checking if status is 200
    if (response.status === 200) {
      this.setState({ isLoading: false });
      showMessage({
        message: "Profile updated successfully",
        type: "success",
      });
      this.props.navigation.navigate("Profile");
    } else {
      this.setState({ isLoading: false });
      showMessage({
        message: "Profile could not be updated",
        type: "danger",
      });
    }
  }

  //handling input fields
  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["name"] = values.name;
      obj["email"] = values.email;
      obj["phnnbr"] = values.phone;
      this.updateProfileCall(obj);
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
          <Title>Update your profile</Title>
        )}
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            name: yup.string().required().min(3),
            phone: yup
              .string()
              .required()
              .matches(phoneReg, "Phone number is not valid"),
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
                label="Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                placeholder="please enter your name"
                mode="flat"
              />
              {touched.name && errors.name && <Error>{errors.name}</Error>}
              <InputField
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="please enter your email"
                mode="flat"
              />
              {touched.email && errors.email && <Error>{errors.email}</Error>}
              <InputField
                label="Phone"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={() => setFieldTouched("phone")}
                formikKey="phone"
                placeholder="please enter your phone"
                keyboardType={"phone-pad"}
                mode="flat"
              />
              {touched.phone && errors.phone && <Error>{errors.phone}</Error>}

              <UpdateProfileButton
                icon="account-edit"
                disabled={!isValid || this.state.isLoading}
                mode="outlined"
                onPress={handleSubmit}
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
                uppercase={false}
              >
                Update Profile
              </UpdateProfileButton>
            </Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}
