//importing
import React from "react";
import { Container, Title, ProfileButton } from "../styling/Profile";
import { Icon } from "native-base";

//exporting class ProfileScreen
export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <Container>
        <Title>Your Profile</Title>
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
