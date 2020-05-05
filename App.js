//importing modeules
import React from "react";
import { Platform, StatusBar, Image, NetInfo, Text } from "react-native";
import { Block, GalioProvider } from "galio-framework";
import AppContainer from "./navigation/Screens";
import { materialTheme } from "./constants/";
import FlashMessage from "react-native-flash-message";
import { InternetStatus } from "./styling/App";

//exporting App
export default class App extends React.Component {
  state = {
    internetStatus: "",
  };

  //handeling _handleConnectivityChange
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );

    NetInfo.isConnected.fetch().done((isConnected) => {
      if (isConnected == false) {
        this.setState({
          internetStatus: `You are offline, Please check your internet connection 😔️`,
        });
      } else {
        this.setState({
          internetStatus: "",
        });
      }
    });
  }

  //updating status of internet connection
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }

  //checking internet connection
  _handleConnectivityChange = (isConnected) => {
    if (isConnected == false) {
      this.setState({
        internetStatus: `You are offline, Please check your internet connection 😔️`,
      });
    } else {
      this.setState({
        internetStatus: "",
      });
    }
  };

  //rendering
  render() {
    return (
      <GalioProvider theme={materialTheme}>
        <Block flex>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppContainer />
          <InternetStatus>{this.state.internetStatus}</InternetStatus>
          <FlashMessage position="top" />
        </Block>
      </GalioProvider>
    );
  }
}
