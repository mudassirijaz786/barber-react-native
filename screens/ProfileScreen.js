//importing
import React from "react";
import {
  Container,
  Title,
  ProfileButton,
  Name,
  Phone,
  Information,
  Email,
} from "../styling/Profile";
import { Icon } from "native-base";
import { AsyncStorage, ActivityIndicator } from "react-native";
import Axios from "axios";
import { url } from "./config.json";

//exporting class ProfileScreen
export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, customer: [] };
  }

  //header profile
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerLeft: (
        <Icon
          onPress={() => navigation.openDrawer()}
          name="menu"
          type="MaterialIcons"
          style={{ marginLeft: 10 }}
        />
      ),
    };
  };

  //getting customer information
  componentDidMount() {
    this.gettingCustomer();
  }
  //getting data from backend
  gettingCustomer = async () => {
    //getting token from local storage
    const value = await AsyncStorage.getItem("x-auth-token");
    this.setState({ isLoading: true });

    //getting salons from backend
    await Axios({
      url: url + "/UserSignUp",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": value,
      },
    })
      .then((response) => {
        //setting salons to state
        this.setState({
          customer: response.data,
        });
      })
      .catch((error) => {});
    this.setState({ isLoading: false });
  };

  //rendering
  render() {
    return (
      <Container>
        <Title>Your Profile</Title>
        {this.state.isLoading ? (
          <ActivityIndicator
            animating={this.state.isLoading}
            size={50}
            color="blueviolet"
          />
        ) : (
          this.state.customer.map((customer) => {
            return (
              <Information key={customer.UserEmail}>
                <Name>{customer.UserName}</Name>
                <Email>{customer.UserEmail}</Email>
                <Phone>{customer.phoneNumber}</Phone>
              </Information>
            );
          })
        )}
        <ProfileButton
          contentStyle={{ height: 50 }}
          mode="outlined"
          uppercase={false}
          onPress={() => this.props.navigation.navigate("UpdateProfile")}
        >
          Update profile
        </ProfileButton>

        <ProfileButton
          contentStyle={{ height: 50 }}
          mode="outlined"
          uppercase={false}
          onPress={() => this.props.navigation.navigate("ResetPassword")}
        >
          Update password
        </ProfileButton>
      </Container>
    );
  }
}
